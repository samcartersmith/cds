#!/usr/bin/env node
import chalk from 'chalk';
import fg from 'fast-glob';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import * as ts from 'typescript';

type CliArgs = {
  rootDir: string;
  patterns: string[];
  ignore: string[];
  quiet: boolean;
  tsconfig?: string;
  component?: string;
};

type ImportMeta = {
  source: string;
  isV7: boolean;
  isTracked: boolean;
  filePath?: string;
};

type ComponentBinding = ImportMeta & {
  importedName?: string;
  isModalWrapper?: boolean;
};

type NamespaceBinding = ImportMeta;

type ImportContext = {
  components: Map<string, ComponentBinding>;
  namespaces: Map<string, NamespaceBinding>;
  modalIdentifiers: Set<string>;
  styledIdentifiers: Set<string>;
  localComponents: Map<string, LocalComponentBinding>;
  rootComponentName: string;
  allowNamespaceRootMatch: boolean;
};

type Issue = {
  filePath: string;
  componentName: string;
  importSource: string;
  modalName: string;
  loc?: { line?: number; column?: number };
};

type ModalElement = ts.JsxElement | ts.JsxSelfClosingElement;

type ComponentUsage = {
  filePath: string;
  componentName: string;
  importSource: string;
  loc?: { line?: number; column?: number };
  via: string[];
};

type LocalComponentBinding = {
  node?: ts.FunctionLikeDeclaration | ts.ArrowFunction | ts.FunctionExpression;
  alias?: string;
};

const DEFAULT_IGNORE_PATTERNS = [
  '**/node_modules/**',
  '**/.next/**',
  '**/.turbo/**',
  '**/.git/**',
  '**/.nx/**',
  '**/dist/**',
  '**/build/**',
];

const DEFAULT_PATTERN = '**/*.{ts,tsx,js,jsx}';
const SUPPORTED_PACKAGES = ['@cbhq/cds-web', '@cbhq/cds-mobile'];
const FILE_RESOLUTION_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js', '.mjs', '.cjs'];
const COMPONENT_WRAPPER_NAMES = new Set(['memo', 'forwardRef']);
const STYLED_MODULE_NAMES = ['styled-components', '@emotion/styled'];
const DEFAULT_ROOT_COMPONENT_NAME = 'Modal';

const sourceFileCache = new Map<string, ts.SourceFile>();
const usageCache = new Map<string, ComponentUsage[]>();
const modalIssueCache = new Map<string, Issue[]>();
const modalIssueInProgress = new Set<string>();
const modalWrapperCache = new Map<string, boolean>();
const modalWrapperInProgress = new Set<string>();

function getRootConfig(args: { component?: string }): {
  rootComponentName: string;
  allowNamespaceRootMatch: boolean;
} {
  const rootComponentName = (args.component ?? DEFAULT_ROOT_COMPONENT_NAME).trim();
  return {
    rootComponentName,
    allowNamespaceRootMatch: !args.component,
  };
}

function modalCacheKey(filePath: string, rootComponentName: string): string {
  return `${rootComponentName}::${filePath}`;
}

type PathMapping = {
  pattern: string;
  matcher: RegExp | null;
  wildcardCount: number;
  targets: string[];
};

type ModuleResolutionState = {
  baseUrl?: string;
  pathMappings: PathMapping[];
  compilerOptions?: ts.CompilerOptions;
};

const moduleResolutionState: ModuleResolutionState = {
  baseUrl: undefined,
  pathMappings: [],
  compilerOptions: undefined,
};

const moduleResolutionHost: ts.ModuleResolutionHost = {
  fileExists: ts.sys.fileExists,
  readFile: ts.sys.readFile,
  realpath: ts.sys.realpath ? (path) => ts.sys.realpath!(path) : undefined,
  directoryExists: ts.sys.directoryExists,
  getDirectories: ts.sys.getDirectories,
};

function isSupportedSourceFile(filePath: string | undefined): boolean {
  if (!filePath) return false;
  return FILE_RESOLUTION_EXTENSIONS.some((ext) => filePath.endsWith(ext));
}

function isKnownComponentWrapper(expression: ts.Expression): boolean {
  if (ts.isIdentifier(expression)) {
    return COMPONENT_WRAPPER_NAMES.has(expression.text);
  }
  if (ts.isPropertyAccessExpression(expression)) {
    return COMPONENT_WRAPPER_NAMES.has(expression.name.text);
  }
  return false;
}

function parseArgs(argv: string[]): CliArgs | null {
  const args: CliArgs = {
    rootDir: process.cwd(),
    patterns: [],
    ignore: [...DEFAULT_IGNORE_PATTERNS],
    quiet: false,
    tsconfig: undefined,
    component: undefined,
  };

  for (let i = 2; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token) continue;
    if (token === '--help' || token === '-h') {
      printHelp();
      return null;
    }
    if (token === '--quiet') {
      args.quiet = true;
      continue;
    }
    if (token.startsWith('--component=')) {
      const value = token.split('=')[1];
      if (value) {
        args.component = value;
      }
      continue;
    }
    if (token === '--component') {
      const next = argv[i + 1];
      if (next) {
        args.component = next;
        i += 1;
      }
      continue;
    }
    if (token.startsWith('--dir=')) {
      args.rootDir = path.resolve(token.split('=')[1] || '.');
      continue;
    }
    if (token === '--dir' || token === '--root') {
      const next = argv[i + 1];
      if (next) {
        args.rootDir = path.resolve(next);
        i += 1;
      }
      continue;
    }
    if (token.startsWith('--ignore=')) {
      const raw = token.split('=')[1] || '';
      args.ignore = raw
        .split(',')
        .map((part) => part.trim())
        .filter(Boolean);
      continue;
    }
    if (token === '--ignore') {
      const next = argv[i + 1];
      if (next) {
        args.ignore = next
          .split(',')
          .map((part) => part.trim())
          .filter(Boolean);
        i += 1;
      }
      continue;
    }
    if (token.startsWith('--tsconfig=')) {
      const value = token.split('=')[1];
      if (value) {
        args.tsconfig = value;
      }
      continue;
    }
    if (token === '--tsconfig') {
      const next = argv[i + 1];
      if (next) {
        args.tsconfig = next;
        i += 1;
      }
      continue;
    }
    args.patterns.push(token);
  }

  if (!args.patterns.length) {
    args.patterns = [DEFAULT_PATTERN];
  } else {
    args.patterns = args.patterns.map((pattern) => normalizePattern(pattern, args.rootDir));
  }

  return args;
}

function printHelp() {
  const lines = [
    '',
    chalk.bold('cds-migrator-modal-descendant-check'),
    '',
    'Scans JSX/TSX files and reports CDS v7 components nested inside Modal trees.',
    '',
    `Usage: ${chalk.cyan('cds-migrator-modal-descendant-check')} [options] [globs|dirs]`,
    '',
    'Options:',
    '  --dir=<path>       Root directory to scan (defaults to current working dir)',
    '  --ignore=a,b,c     Comma-separated glob patterns to ignore',
    '  --tsconfig <path>  Optional path to a tsconfig file for path alias resolution',
    '  --component <Name> Root component name to scan under (defaults to Modal)',
    '  --quiet            Suppress progress output; only print results',
    '  -h, --help         Show this help message',
    '',
    'Examples:',
    `  ${chalk.cyan('cds-migrator-modal-descendant-check src/features/flows')}`,
    `  ${chalk.cyan('cds-migrator-modal-descendant-check "apps/**/*.tsx"')}`,
    `  ${chalk.cyan('cds-migrator-modal-descendant-check --component CustomModalComponent src')}`,
    '',
  ];
  console.log(lines.join('\n'));
}

function normalizePattern(pattern: string, rootDir: string) {
  const hasGlob =
    pattern.includes('*') ||
    pattern.includes('?') ||
    pattern.includes('{') ||
    pattern.includes('[');
  if (hasGlob) return pattern;

  const abs = path.resolve(rootDir, pattern);
  if (fs.existsSync(abs)) {
    const stat = fs.statSync(abs);
    if (stat.isDirectory()) {
      const rel = path.relative(rootDir, abs) || '.';
      return path.join(rel, DEFAULT_PATTERN);
    }
    if (stat.isFile()) {
      return path.relative(rootDir, abs) || path.basename(abs);
    }
  }
  return pattern;
}

function tryResolveFile(candidate: string): string | null {
  try {
    const stat = fs.statSync(candidate);
    if (stat.isFile()) {
      return candidate;
    }
  } catch {
    // ignore
  }
  return null;
}

function tryResolveWithExtensions(basePath: string): string | null {
  const candidates = [basePath];
  FILE_RESOLUTION_EXTENSIONS.forEach((ext) => {
    if (!basePath.endsWith(ext)) {
      candidates.push(`${basePath}${ext}`);
    }
  });

  for (const candidate of candidates) {
    const resolved = tryResolveFile(candidate);
    if (resolved) return resolved;
  }

  try {
    const dirStat = fs.statSync(basePath);
    if (dirStat.isDirectory()) {
      for (const ext of FILE_RESOLUTION_EXTENSIONS) {
        const indexCandidate = path.join(basePath, `index${ext}`);
        const resolved = tryResolveFile(indexCandidate);
        if (resolved) return resolved;
      }
    }
  } catch {
    // ignore
  }
  return null;
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function createPathMapping(pattern: string, targets: string[]): PathMapping {
  const wildcardCount = (pattern.match(/\*/g) ?? []).length;
  const matcher =
    wildcardCount > 0
      ? new RegExp(
          `^${pattern
            .split('*')
            .map((segment) => escapeRegex(segment))
            .join('(.*)')}$`,
        )
      : null;
  return {
    pattern,
    matcher,
    wildcardCount,
    targets,
  };
}

function initModuleResolution(rootDir: string, tsconfigPath?: string) {
  moduleResolutionState.baseUrl = undefined;
  moduleResolutionState.pathMappings = [];
  moduleResolutionState.compilerOptions = undefined;

  const configPath = findTsconfig(rootDir, tsconfigPath);
  if (!configPath) return;

  try {
    const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
    if (configFile.error) {
      const message = ts.flattenDiagnosticMessageText(configFile.error.messageText, '\n');
      console.warn(chalk.yellow(`Unable to read tsconfig ${configPath}: ${message}`));
      return;
    }
    const parsed = ts.parseJsonConfigFileContent(
      configFile.config,
      ts.sys,
      path.dirname(configPath),
      {},
      configPath,
    );
    moduleResolutionState.compilerOptions = parsed.options;
    if (parsed.options.baseUrl) {
      moduleResolutionState.baseUrl = parsed.options.baseUrl;
    }
    const rawPaths =
      parsed.options.paths ?? configFile.config?.compilerOptions?.paths ?? Object.create(null);
    const configDir = path.dirname(configPath);
    const pathBase = moduleResolutionState.baseUrl ?? configDir;
    Object.entries(rawPaths).forEach(([pattern, mappings]) => {
      if (!Array.isArray(mappings)) return;
      const absTargets = mappings.map((target) => path.resolve(pathBase, target));
      moduleResolutionState.pathMappings.push(createPathMapping(pattern, absTargets));
    });
  } catch (error) {
    console.warn(
      chalk.yellow(
        `Failed to initialize module resolution from tsconfig: ${(error as Error).message}`,
      ),
    );
  }
}

function findTsconfig(rootDir: string, explicitPath?: string): string | null {
  if (explicitPath) {
    const candidate = path.isAbsolute(explicitPath)
      ? explicitPath
      : path.resolve(rootDir, explicitPath);
    if (fs.existsSync(candidate)) {
      return candidate;
    }
    console.warn(chalk.yellow(`Specified tsconfig not found: ${candidate}`));
    return null;
  }

  const searchNames = ['tsconfig.json', 'tsconfig.base.json'];
  for (const name of searchNames) {
    const found = ts.findConfigFile(rootDir, fs.existsSync, name);
    if (found) {
      return found;
    }
  }
  return null;
}

function resolveWithPathMappings(specifier: string): string | null {
  for (const mapping of moduleResolutionState.pathMappings) {
    if (mapping.matcher) {
      const match = mapping.matcher.exec(specifier);
      if (!match) continue;
      const wildcardValues = match.slice(1, 1 + mapping.wildcardCount);
      for (const targetTemplate of mapping.targets) {
        let candidate = targetTemplate;
        wildcardValues.forEach((value) => {
          candidate = candidate.replace('*', value);
        });
        const resolved = tryResolveWithExtensions(candidate);
        if (resolved) return resolved;
      }
    } else if (specifier === mapping.pattern) {
      for (const target of mapping.targets) {
        const resolved = tryResolveWithExtensions(target);
        if (resolved) return resolved;
      }
    }
  }
  return null;
}

function resolveWithTypeScript(specifier: string, containingFile: string): string | null {
  const compilerOptions = moduleResolutionState.compilerOptions;
  if (!compilerOptions) return null;
  const resolution = ts.resolveModuleName(
    specifier,
    containingFile,
    compilerOptions,
    moduleResolutionHost,
  );
  const resolvedFile = resolution.resolvedModule?.resolvedFileName;
  if (resolvedFile && isSupportedSourceFile(resolvedFile)) {
    return resolvedFile;
  }
  return null;
}

function resolveImportPath(specifier: string, containingFile: string): string | null {
  if (!specifier) return null;
  if (specifier.startsWith('.') || specifier.startsWith('/')) {
    const basePath = specifier.startsWith('/')
      ? path.resolve(specifier)
      : path.resolve(path.dirname(containingFile), specifier);
    return tryResolveWithExtensions(basePath);
  }

  const tsResolved = resolveWithTypeScript(specifier, containingFile);
  if (tsResolved) return tsResolved;

  const viaMappings = resolveWithPathMappings(specifier);
  if (viaMappings) return viaMappings;

  if (moduleResolutionState.baseUrl) {
    const candidate = path.resolve(moduleResolutionState.baseUrl, specifier);
    const resolved = tryResolveWithExtensions(candidate);
    if (resolved) return resolved;
  }

  return null;
}

function getSourceFile(filePath: string): ts.SourceFile | null {
  if (!filePath) return null;
  const cached = sourceFileCache.get(filePath);
  if (cached) return cached;
  let text: string;
  try {
    text = fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.warn(chalk.yellow(`Unable to read ${filePath}: ${(error as Error).message}`));
    return null;
  }
  const sourceFile = ts.createSourceFile(
    filePath,
    text,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  sourceFileCache.set(filePath, sourceFile);
  return sourceFile;
}

function isTrackedPackage(source: string): boolean {
  return SUPPORTED_PACKAGES.some((pkg) => source === pkg || source.startsWith(`${pkg}/`));
}

function isV7Source(source: string): boolean {
  return source.includes('/v7');
}

function collectFiles(rootDir: string, patterns: string[], ignore: string[]) {
  return fg(patterns, {
    absolute: true,
    cwd: rootDir,
    ignore,
    onlyFiles: true,
  });
}

function buildImportContext(
  sourceFile: ts.SourceFile,
  options?: {
    skipWrapperDetection?: boolean;
    rootComponentName?: string;
    allowNamespaceRootMatch?: boolean;
  },
): ImportContext {
  const components = new Map<string, ComponentBinding>();
  const namespaces = new Map<string, NamespaceBinding>();
  const modalIdentifiers = new Set<string>();
  const styledIdentifiers = new Set<string>();
  const rootComponentName = options?.rootComponentName ?? DEFAULT_ROOT_COMPONENT_NAME;
  const allowNamespaceRootMatch = options?.allowNamespaceRootMatch ?? true;

  sourceFile.statements.forEach((statement) => {
    if (!ts.isImportDeclaration(statement)) return;
    if (!ts.isStringLiteral(statement.moduleSpecifier)) return;
    const moduleName = statement.moduleSpecifier.text;
    const clause = statement.importClause;
    if (!clause || clause.isTypeOnly) return;

    if (STYLED_MODULE_NAMES.includes(moduleName)) {
      if (clause.name) {
        styledIdentifiers.add(clause.name.text);
      }
      if (clause.namedBindings) {
        if (ts.isNamespaceImport(clause.namedBindings)) {
          styledIdentifiers.add(clause.namedBindings.name.text);
        } else if (ts.isNamedImports(clause.namedBindings)) {
          clause.namedBindings.elements.forEach((element) => {
            if (element.isTypeOnly) return;
            styledIdentifiers.add(element.name.text);
          });
        }
      }
    }

    const resolvedPath = resolveImportPath(moduleName, sourceFile.fileName);
    const isTracked = isTrackedPackage(moduleName);
    const meta: ComponentBinding = {
      source: moduleName,
      isV7: isTracked && isV7Source(moduleName),
      filePath: resolvedPath ?? undefined,
      isTracked,
    };

    if (clause.name) {
      const localName = clause.name.text;
      components.set(localName, { ...meta });
      // When `--component <Name>` is provided, we want to treat *local wrapper components*
      // (e.g., `RetailRedesignModal`) as Modal roots too. Previously, we only considered
      // CDS-tracked imports as roots, which caused false negatives for custom wrappers.
      // `allowNamespaceRootMatch` is `false` only when `--component` is set.
      if ((meta.isTracked || !allowNamespaceRootMatch) && localName === rootComponentName) {
        modalIdentifiers.add(localName);
      }
    }

    if (clause.namedBindings) {
      if (ts.isNamespaceImport(clause.namedBindings) && meta.isTracked) {
        namespaces.set(clause.namedBindings.name.text, meta);
      } else if (ts.isNamedImports(clause.namedBindings)) {
        clause.namedBindings.elements.forEach((element) => {
          if (element.isTypeOnly) return;
          const importedName = (element.propertyName ?? element.name).text;
          const localName = element.name.text;
          components.set(localName, { ...meta, importedName });
          // When `--component <Name>` is provided we intentionally treat non-CDS imports as eligible
          // roots as long as the *local binding name* matches the requested root name. This covers
          // common wrapper patterns like:
          //   import { CustomModalComponent as RetailRedesignModal } from './RetailRedesignModal'
          // where the source module is not a tracked CDS package (`meta.isTracked === false`), but
          // we still want to scan descendants under <RetailRedesignModal />.
          if (!meta.isTracked) {
            if (!allowNamespaceRootMatch && localName === rootComponentName) {
              modalIdentifiers.add(localName);
            }
            return;
          }
          if (allowNamespaceRootMatch) {
            if (importedName === rootComponentName) modalIdentifiers.add(localName);
            return;
          }
          if (localName === rootComponentName) modalIdentifiers.add(localName);
        });
      }
    }
  });

  const lazyBindings = collectLazyComponentBindings(sourceFile);
  lazyBindings.forEach((binding, localName) => {
    if (!components.has(localName)) {
      components.set(localName, binding);
    }
  });

  const localComponents = collectLocalComponentDefinitions(sourceFile);

  const context: ImportContext = {
    components,
    namespaces,
    modalIdentifiers,
    styledIdentifiers,
    localComponents,
    rootComponentName,
    allowNamespaceRootMatch,
  };

  if (!options?.skipWrapperDetection) {
    markModalWrapperImports(context);
  }

  return context;
}

function isLazyCallee(expression: ts.Expression): boolean {
  if (ts.isIdentifier(expression)) {
    return expression.text === 'lazy';
  }
  if (ts.isPropertyAccessExpression(expression)) {
    return expression.name.text === 'lazy';
  }
  return false;
}

function extractImportSpecifier(node: ts.Node): string | null {
  if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) {
    const arg = node.arguments[0];
    if (arg && ts.isStringLiteralLike(arg)) {
      return arg.text;
    }
    return null;
  }
  let result: string | null = null;
  ts.forEachChild(node, (child) => {
    if (result) return;
    result = extractImportSpecifier(child);
  });
  return result;
}

function collectLazyComponentBindings(sourceFile: ts.SourceFile): Map<string, ComponentBinding> {
  const bindings = new Map<string, ComponentBinding>();
  const visit = (node: ts.Node) => {
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.initializer &&
      ts.isCallExpression(node.initializer) &&
      isLazyCallee(node.initializer.expression)
    ) {
      const specifier = extractImportSpecifier(node.initializer);
      if (specifier) {
        const resolvedPath = resolveImportPath(specifier, sourceFile.fileName);
        const isTracked = isTrackedPackage(specifier);
        const meta: ComponentBinding = {
          source: specifier,
          isV7: isTracked && isV7Source(specifier),
          isTracked,
          filePath: resolvedPath ?? undefined,
        };
        bindings.set(node.name.text, meta);
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  return bindings;
}

function resolveLocalComponentInitializer(
  initializer: ts.Expression,
): LocalComponentBinding | null {
  if (ts.isArrowFunction(initializer) || ts.isFunctionExpression(initializer)) {
    return { node: initializer };
  }
  if (ts.isIdentifier(initializer)) {
    return { alias: initializer.text };
  }
  if (ts.isCallExpression(initializer) && isKnownComponentWrapper(initializer.expression)) {
    const wrapped = initializer.arguments[0];
    if (!wrapped) return null;
    if (ts.isArrowFunction(wrapped) || ts.isFunctionExpression(wrapped)) {
      return { node: wrapped };
    }
    if (ts.isIdentifier(wrapped)) {
      return { alias: wrapped.text };
    }
  }
  return null;
}

function collectLocalComponentDefinitions(
  sourceFile: ts.SourceFile,
): Map<string, LocalComponentBinding> {
  const map = new Map<string, LocalComponentBinding>();

  sourceFile.statements.forEach((statement) => {
    if (ts.isFunctionDeclaration(statement) && statement.name) {
      map.set(statement.name.text, { node: statement });
      return;
    }
    if (!ts.isVariableStatement(statement)) return;
    statement.declarationList.declarations.forEach((declaration) => {
      if (!ts.isIdentifier(declaration.name) || !declaration.initializer) return;
      const binding = resolveLocalComponentInitializer(declaration.initializer);
      if (binding) {
        map.set(declaration.name.text, binding);
      }
    });
  });

  return map;
}

function markModalWrapperImports(context: ImportContext) {
  context.components.forEach((binding, localName) => {
    if (context.modalIdentifiers.has(localName)) return;
    if (!binding.filePath) return;
    if (
      isFileModalWrapper(
        binding.filePath,
        context.rootComponentName,
        context.allowNamespaceRootMatch,
      )
    ) {
      binding.isModalWrapper = true;
      context.modalIdentifiers.add(localName);
    }
  });
}

function isFileModalWrapper(
  filePath: string,
  rootComponentName: string,
  allowNamespaceRootMatch: boolean,
): boolean {
  const cacheKey = modalCacheKey(filePath, rootComponentName);
  if (modalWrapperCache.has(cacheKey)) {
    return modalWrapperCache.get(cacheKey)!;
  }
  if (modalWrapperInProgress.has(cacheKey)) {
    return false;
  }
  modalWrapperInProgress.add(cacheKey);
  const sourceFile = getSourceFile(filePath);
  if (!sourceFile) {
    modalWrapperInProgress.delete(cacheKey);
    modalWrapperCache.set(cacheKey, false);
    return false;
  }
  const context = buildImportContext(sourceFile, {
    skipWrapperDetection: true,
    rootComponentName,
    allowNamespaceRootMatch,
  });
  const modalElements = collectModalElements(sourceFile, context);
  const hasStyledWrapper = containsStyledModalWrapper(sourceFile, context);
  const result = modalElements.length > 0 || hasStyledWrapper;
  modalWrapperCache.set(cacheKey, result);
  modalWrapperInProgress.delete(cacheKey);
  return result;
}

function containsStyledModalWrapper(sourceFile: ts.SourceFile, ctx: ImportContext): boolean {
  if (!ctx.styledIdentifiers.size || !ctx.modalIdentifiers.size) return false;
  let found = false;
  const visit = (node: ts.Node) => {
    if (found) return;
    if (ts.isTaggedTemplateExpression(node) && isStyledCallExpression(node.tag, ctx)) {
      found = true;
      return;
    }
    if (ts.isCallExpression(node) && isStyledCallExpression(node, ctx)) {
      found = true;
      return;
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  return found;
}

function isStyledCallExpression(expr: ts.Expression, ctx: ImportContext): boolean {
  if (!ts.isCallExpression(expr)) return false;
  if (!isStyledReference(expr.expression, ctx.styledIdentifiers)) return false;
  const target = expr.arguments[0];
  if (target && ts.isIdentifier(target) && ctx.modalIdentifiers.has(target.text)) {
    return true;
  }
  return false;
}

function isStyledReference(expression: ts.Expression, styledNames: Set<string>): boolean {
  if (ts.isIdentifier(expression)) {
    return styledNames.has(expression.text);
  }
  if (ts.isPropertyAccessExpression(expression)) {
    return isStyledReference(expression.expression, styledNames);
  }
  return false;
}

function isModalTagName(tagName: ts.JsxTagNameExpression, ctx: ImportContext): boolean {
  if (ts.isIdentifier(tagName)) {
    return ctx.modalIdentifiers.has(tagName.text);
  }
  if (ts.isPropertyAccessExpression(tagName)) {
    if (!ctx.allowNamespaceRootMatch) return false;
    const root = getPropertyAccessRootIdentifier(tagName.expression);
    if (!root || tagName.name.text !== ctx.rootComponentName) return false;
    return ctx.namespaces.has(root);
  }
  return false;
}

function getPropertyAccessRootIdentifier(expr: ts.Expression): string | null {
  if (ts.isIdentifier(expr)) return expr.text;
  if (ts.isPropertyAccessExpression(expr)) return getPropertyAccessRootIdentifier(expr.expression);
  return null;
}

function formatTagName(tagName: ts.JsxTagNameExpression): string {
  if (ts.isIdentifier(tagName)) return tagName.text;
  if (tagName.kind === ts.SyntaxKind.ThisKeyword) return 'this';
  if (ts.isPropertyAccessExpression(tagName)) {
    const parts: string[] = [];
    let current: ts.Expression = tagName;
    while (ts.isPropertyAccessExpression(current)) {
      parts.unshift(current.name.text);
      current = current.expression;
    }
    if (ts.isIdentifier(current)) {
      parts.unshift(current.text);
    } else if (current.kind === ts.SyntaxKind.ThisKeyword) {
      parts.unshift('this');
    }
    return parts.join('.');
  }
  return 'Unknown';
}

function collectModalElements(sourceFile: ts.SourceFile, ctx: ImportContext): ModalElement[] {
  const modalNodes: ModalElement[] = [];

  const visitNode = (node: ts.Node) => {
    if (ts.isJsxElement(node)) {
      if (isModalTagName(node.openingElement.tagName, ctx)) {
        modalNodes.push(node);
      }
      node.children.forEach(visitJsxChild);
      return;
    }
    if (ts.isJsxSelfClosingElement(node)) {
      if (isModalTagName(node.tagName, ctx)) {
        modalNodes.push(node);
      }
      return;
    }
    if (ts.isJsxFragment(node)) {
      node.children.forEach(visitJsxChild);
      return;
    }
    ts.forEachChild(node, visitNode);
  };

  const visitJsxChild = (child: ts.JsxChild) => {
    if (ts.isJsxElement(child) || ts.isJsxSelfClosingElement(child)) {
      visitNode(child);
    } else if (ts.isJsxFragment(child)) {
      child.children.forEach(visitJsxChild);
    } else if (ts.isJsxExpression(child) && child.expression) {
      visitExpression(child.expression);
    }
  };

  const visitExpression = (expr: ts.Expression) => {
    if (ts.isJsxElement(expr) || ts.isJsxSelfClosingElement(expr)) {
      visitNode(expr);
      return;
    }
    if (ts.isParenthesizedExpression(expr) && expr.expression) {
      visitExpression(expr.expression);
      return;
    }
    if (ts.isConditionalExpression(expr)) {
      visitExpression(expr.whenTrue);
      visitExpression(expr.whenFalse);
      return;
    }
    if (
      ts.isBinaryExpression(expr) &&
      (expr.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken ||
        expr.operatorToken.kind === ts.SyntaxKind.BarBarToken)
    ) {
      visitExpression(expr.right);
      return;
    }
    if (ts.isArrayLiteralExpression(expr)) {
      expr.elements.forEach((element) => {
        if (ts.isSpreadElement(element)) {
          visitExpression(element.expression);
        } else if (ts.isExpression(element)) {
          visitExpression(element);
        }
      });
    }
  };

  visitNode(sourceFile);
  return modalNodes;
}

function collectDescendantElements(element: ModalElement): ModalElement[] {
  const collected: ModalElement[] = [];

  const visitChildren = (children: readonly ts.JsxChild[]) => {
    children.forEach((child) => {
      if (ts.isJsxElement(child)) {
        collected.push(child);
        visitChildren(child.children);
      } else if (ts.isJsxSelfClosingElement(child)) {
        collected.push(child);
      } else if (ts.isJsxFragment(child)) {
        visitChildren(child.children);
      } else if (ts.isJsxExpression(child) && child.expression) {
        visitExpression(child.expression);
      }
    });
  };

  const visitExpression = (expr: ts.Expression) => {
    if (ts.isJsxElement(expr) || ts.isJsxSelfClosingElement(expr)) {
      collected.push(expr);
      if (ts.isJsxElement(expr)) {
        visitChildren(expr.children);
      }
      return;
    }
    if (ts.isParenthesizedExpression(expr) && expr.expression) {
      visitExpression(expr.expression);
      return;
    }
    if (ts.isConditionalExpression(expr)) {
      visitExpression(expr.whenTrue);
      visitExpression(expr.whenFalse);
      return;
    }
    if (
      ts.isBinaryExpression(expr) &&
      (expr.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken ||
        expr.operatorToken.kind === ts.SyntaxKind.BarBarToken)
    ) {
      visitExpression(expr.right);
      return;
    }
    if (ts.isArrayLiteralExpression(expr)) {
      expr.elements.forEach((element) => {
        if (ts.isSpreadElement(element)) {
          visitExpression(element.expression);
        } else if (ts.isExpression(element)) {
          visitExpression(element);
        }
      });
    }
  };

  if (ts.isJsxElement(element)) {
    visitChildren(element.children);
  }

  return collected;
}

function collectJsxNodes(root: ts.Node): ModalElement[] {
  const collected: ModalElement[] = [];

  const visitNode = (node: ts.Node) => {
    if (ts.isJsxElement(node)) {
      collected.push(node);
      node.children.forEach(visitJsxChild);
      return;
    }
    if (ts.isJsxSelfClosingElement(node)) {
      collected.push(node);
      return;
    }
    if (ts.isJsxFragment(node)) {
      node.children.forEach(visitJsxChild);
      return;
    }
    ts.forEachChild(node, visitNode);
  };

  const visitJsxChild = (child: ts.JsxChild) => {
    if (ts.isJsxElement(child) || ts.isJsxSelfClosingElement(child)) {
      visitNode(child);
    } else if (ts.isJsxFragment(child)) {
      child.children.forEach(visitJsxChild);
    } else if (ts.isJsxExpression(child) && child.expression) {
      visitExpression(child.expression);
    }
  };

  const visitExpression = (expr: ts.Expression) => {
    if (ts.isJsxElement(expr) || ts.isJsxSelfClosingElement(expr)) {
      visitNode(expr);
      return;
    }
    if (ts.isParenthesizedExpression(expr) && expr.expression) {
      visitExpression(expr.expression);
      return;
    }
    if (ts.isConditionalExpression(expr)) {
      visitExpression(expr.whenTrue);
      visitExpression(expr.whenFalse);
      return;
    }
    if (
      ts.isBinaryExpression(expr) &&
      (expr.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken ||
        expr.operatorToken.kind === ts.SyntaxKind.BarBarToken)
    ) {
      visitExpression(expr.right);
      return;
    }
    if (ts.isArrayLiteralExpression(expr)) {
      expr.elements.forEach((element) => {
        if (ts.isSpreadElement(element)) {
          visitExpression(element.expression);
        } else if (ts.isExpression(element)) {
          visitExpression(element);
        }
      });
    }
  };

  visitNode(root);
  return collected;
}

function collectAllJsxElements(sourceFile: ts.SourceFile): ModalElement[] {
  return collectJsxNodes(sourceFile);
}

function getFunctionBodyNode(
  node: ts.FunctionLikeDeclaration | ts.ArrowFunction | ts.FunctionExpression,
): ts.Node | null {
  if (ts.isArrowFunction(node)) {
    if (ts.isBlock(node.body)) {
      return node.body;
    }
    return node.body;
  }
  return node.body ?? null;
}

function resolveLocalComponentNode(
  name: string,
  ctx: ImportContext,
  visited: Set<string> = new Set(),
): ts.FunctionLikeDeclaration | ts.ArrowFunction | ts.FunctionExpression | null {
  const binding = ctx.localComponents.get(name);
  if (!binding) return null;
  if (binding.node) return binding.node;
  if (binding.alias && !visited.has(binding.alias)) {
    visited.add(binding.alias);
    const resolved = resolveLocalComponentNode(binding.alias, ctx, visited);
    visited.delete(binding.alias);
    return resolved;
  }
  return null;
}

function resolveComponentMeta(
  tagName: ts.JsxTagNameExpression,
  ctx: ImportContext,
): { displayName: string; source: string; isV7: boolean; filePath?: string } | null {
  if (ts.isIdentifier(tagName)) {
    const binding = ctx.components.get(tagName.text);
    if (!binding) return null;
    return {
      displayName: tagName.text,
      source: binding.source,
      isV7: binding.isV7,
      filePath: binding.filePath,
    };
  }
  if (ts.isPropertyAccessExpression(tagName)) {
    const root = getPropertyAccessRootIdentifier(tagName.expression);
    if (!root) return null;
    const binding = ctx.namespaces.get(root);
    if (!binding) return null;
    return {
      displayName: formatTagName(tagName),
      source: binding.source,
      isV7: binding.isV7,
    };
  }
  return null;
}

function formatModalName(modal: ModalElement): string {
  const tagName = ts.isJsxElement(modal) ? modal.openingElement.tagName : modal.tagName;
  return formatTagName(tagName);
}

function collectTrackedComponentUsages(
  filePath: string,
  visited: Set<string> = new Set(),
): ComponentUsage[] {
  if (!filePath) return [];
  if (usageCache.has(filePath)) {
    return usageCache.get(filePath)!;
  }
  if (visited.has(filePath)) {
    return [];
  }
  visited.add(filePath);
  const sourceFile = getSourceFile(filePath);
  if (!sourceFile) {
    visited.delete(filePath);
    usageCache.set(filePath, []);
    return [];
  }
  const context = buildImportContext(sourceFile);
  const nodes = collectAllJsxElements(sourceFile);
  const usages: ComponentUsage[] = [];

  nodes.forEach((node) => {
    const tagName = ts.isJsxElement(node) ? node.openingElement.tagName : node.tagName;
    const meta = resolveComponentMeta(tagName, context);
    if (!meta) return;
    if (meta.isV7) {
      const { line, character } = sourceFile.getLineAndCharacterOfPosition(node.getStart());
      usages.push({
        filePath,
        componentName: meta.displayName,
        importSource: meta.source,
        loc: { line: line + 1, column: character + 1 },
        via: [],
      });
      return;
    }
    if (meta.filePath && meta.filePath !== filePath) {
      const nested = collectTrackedComponentUsages(meta.filePath, visited).map((usage) => ({
        ...usage,
        via: [meta.displayName, ...usage.via],
      }));
      if (nested.length) {
        usages.push(...nested);
      }
    }
  });

  visited.delete(filePath);
  usageCache.set(filePath, usages);
  return usages;
}

function collectLocalComponentUsages(
  componentName: string,
  ctx: ImportContext,
  sourceFile: ts.SourceFile,
  visited: Set<string> = new Set(),
): ComponentUsage[] {
  if (visited.has(componentName)) return [];
  visited.add(componentName);

  const node = resolveLocalComponentNode(componentName, ctx);
  if (!node) {
    visited.delete(componentName);
    return [];
  }
  const body = getFunctionBodyNode(node);
  if (!body) {
    visited.delete(componentName);
    return [];
  }

  const jsxNodes = collectJsxNodes(body);
  const usages: ComponentUsage[] = [];

  jsxNodes.forEach((jsxNode) => {
    const tagName = ts.isJsxElement(jsxNode) ? jsxNode.openingElement.tagName : jsxNode.tagName;
    const meta = resolveComponentMeta(tagName, ctx);
    if (meta) {
      if (meta.isV7) {
        const { line, character } = sourceFile.getLineAndCharacterOfPosition(jsxNode.getStart());
        usages.push({
          filePath: sourceFile.fileName,
          componentName: meta.displayName,
          importSource: meta.source,
          loc: { line: line + 1, column: character + 1 },
          via: [],
        });
        return;
      }
      if (meta.filePath) {
        const nested = collectTrackedComponentUsages(meta.filePath).map((usage) => ({
          ...usage,
          via: [meta.displayName, ...usage.via],
        }));
        if (nested.length) {
          usages.push(...nested);
        }
      }
      return;
    }

    if (ts.isIdentifier(tagName) && ctx.localComponents.has(tagName.text)) {
      const nestedLocal = collectLocalComponentUsages(tagName.text, ctx, sourceFile, visited).map(
        (usage) => ({
          ...usage,
          via: [tagName.text, ...usage.via],
        }),
      );
      if (nestedLocal.length) {
        usages.push(...nestedLocal);
      }
    }
  });

  visited.delete(componentName);
  return usages;
}

function getModalIssuesForFileWithRoot(
  filePath: string,
  rootComponentName: string,
  allowNamespaceRootMatch: boolean,
): Issue[] {
  if (!filePath) return [];
  const cacheKey = modalCacheKey(filePath, rootComponentName);
  if (modalIssueCache.has(cacheKey)) {
    return modalIssueCache.get(cacheKey)!;
  }
  if (modalIssueInProgress.has(cacheKey)) {
    return [];
  }
  modalIssueInProgress.add(cacheKey);
  const issues = analyzeFile(filePath, { rootComponentName, allowNamespaceRootMatch }) ?? [];
  modalIssueCache.set(cacheKey, issues);
  modalIssueInProgress.delete(cacheKey);
  return issues;
}

function collectWrapperModalIssues(sourceFile: ts.SourceFile, ctx: ImportContext): Issue[] {
  const issues: Issue[] = [];
  const seen = new Set<string>();
  const jsxNodes = collectAllJsxElements(sourceFile);

  jsxNodes.forEach((node) => {
    const tagName = ts.isJsxElement(node) ? node.openingElement.tagName : node.tagName;
    if (!ts.isIdentifier(tagName)) return;
    const binding = ctx.components.get(tagName.text);
    if (!binding || !binding.filePath) return;
    if (seen.has(binding.filePath)) return;
    seen.add(binding.filePath);
    const nestedIssues = getModalIssuesForFileWithRoot(
      binding.filePath,
      ctx.rootComponentName,
      ctx.allowNamespaceRootMatch,
    );
    if (!nestedIssues.length) return;
    nestedIssues.forEach((issue) => {
      issues.push({
        ...issue,
        modalName: [tagName.text, issue.modalName].filter(Boolean).join(' > '),
      });
    });
  });

  return issues;
}

function analyzeFile(
  filePath: string,
  root?: { rootComponentName: string; allowNamespaceRootMatch: boolean },
): Issue[] {
  const sourceFile = getSourceFile(filePath);
  if (!sourceFile) {
    return [];
  }

  const context = buildImportContext(sourceFile, {
    rootComponentName: root?.rootComponentName,
    allowNamespaceRootMatch: root?.allowNamespaceRootMatch,
  });
  const hasResolvableComponent = Array.from(context.components.values()).some((binding) =>
    Boolean(binding.filePath),
  );
  if (!context.modalIdentifiers.size && !context.namespaces.size && !hasResolvableComponent) {
    return [];
  }

  const modalElements = collectModalElements(sourceFile, context);
  const issues: Issue[] = [];
  modalElements.forEach((modalNode) => {
    const modalName = formatModalName(modalNode);
    const descendants = collectDescendantElements(modalNode);
    descendants.forEach((descendant) => {
      const tagName = ts.isJsxElement(descendant)
        ? descendant.openingElement.tagName
        : descendant.tagName;
      const meta = resolveComponentMeta(tagName, context);
      if (!meta) {
        if (ts.isIdentifier(tagName) && context.localComponents.has(tagName.text)) {
          const localUsages = collectLocalComponentUsages(tagName.text, context, sourceFile);
          localUsages.forEach((usage) => {
            const modalTrail = [modalName, tagName.text, ...usage.via];
            issues.push({
              filePath: usage.filePath,
              componentName: usage.componentName,
              importSource: usage.importSource,
              modalName: modalTrail.filter(Boolean).join(' > '),
              loc: usage.loc,
            });
          });
        }
        return;
      }
      if (meta.isV7) {
        const { line, character } = sourceFile.getLineAndCharacterOfPosition(descendant.getStart());
        issues.push({
          filePath,
          componentName: meta.displayName,
          importSource: meta.source,
          modalName,
          loc: { line: line + 1, column: character + 1 },
        });
        return;
      }
      if (meta.filePath) {
        const nestedUsages = collectTrackedComponentUsages(meta.filePath);
        if (!nestedUsages.length) return;
        nestedUsages.forEach((usage) => {
          const modalTrail = [modalName, meta.displayName, ...usage.via];
          issues.push({
            filePath: usage.filePath,
            componentName: usage.componentName,
            importSource: usage.importSource,
            modalName: modalTrail.filter(Boolean).join(' > '),
            loc: usage.loc,
          });
        });
      }
    });
  });

  if (!modalElements.length) {
    const wrapperIssues = collectWrapperModalIssues(sourceFile, context);
    if (wrapperIssues.length) {
      issues.push(...wrapperIssues);
    }
  }

  return issues;
}

function formatLocation(loc?: { line?: number; column?: number }) {
  if (!loc || typeof loc.line !== 'number') return '?';
  const column = typeof loc.column === 'number' ? loc.column : 1;
  return `${loc.line}:${column}`;
}

function reportIssues(issues: Issue[], rootDir: string, quiet: boolean) {
  if (!issues.length) {
    if (!quiet) {
      console.log(chalk.green('✓ No CDS v7 descendants found inside Modal components.'));
    }
    return 0;
  }

  console.log('');
  console.log(chalk.bold.red('Found CDS v7 components nested inside Modal:'));
  const sorted = [...issues].sort((a, b) => {
    if (a.filePath === b.filePath) {
      const lineA = a.loc?.line ?? 0;
      const lineB = b.loc?.line ?? 0;
      return lineA - lineB;
    }
    return a.filePath.localeCompare(b.filePath);
  });

  sorted.forEach((issue) => {
    const rel = path.relative(rootDir, issue.filePath) || issue.filePath;
    const location = formatLocation(issue.loc);
    console.log(
      `  • ${chalk.cyan(rel)}:${location} ${chalk.yellow(issue.componentName)} from ${chalk.magenta(
        issue.importSource,
      )} (inside ${issue.modalName})`,
    );
  });
  console.log('');
  console.log(
    chalk.red(
      `Total: ${issues.length} component${
        issues.length === 1 ? '' : 's'
      } still importing from CDS v7`,
    ),
  );
  return 1;
}

async function main() {
  const parsed = parseArgs(process.argv);
  if (!parsed) return;

  const { rootDir, patterns, ignore, quiet, tsconfig, component } = parsed;
  if (!quiet && component) {
    console.log(chalk.gray(`Using custom root component name via --component: ${component}`));
  }
  initModuleResolution(rootDir, tsconfig);
  const files = await collectFiles(rootDir, patterns, ignore);
  if (!files.length) {
    console.warn(chalk.yellow('No matching files found.'));
    return;
  }

  if (!quiet) {
    console.log(
      `Scanning ${files.length} file${files.length === 1 ? '' : 's'} under ${chalk.cyan(
        rootDir,
      )}...`,
    );
  }

  const rootConfig = getRootConfig({ component });
  const allIssues: Issue[] = [];
  files.forEach((filePath) => {
    const fileIssues = analyzeFile(filePath, rootConfig);
    if (fileIssues.length) allIssues.push(...fileIssues);
  });

  const exitCode = reportIssues(allIssues, rootDir, quiet);
  if (exitCode !== 0) {
    process.exitCode = exitCode;
  }
}

main().catch((error: unknown) => {
  console.error(chalk.red(`Unexpected error: ${(error as Error).message}`));
  process.exitCode = 1;
});

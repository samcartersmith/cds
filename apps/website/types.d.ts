/* 
  You can embed MDX documents in other documents. 
  This is also known as transclusion.
  You can achieve this by importing an .mdx (or .md) file.
  https://mdxjs.com/getting-started#documents
  https://mdxjs.com/advanced/typescript
*/
declare module '*.mdx' {
  export default MDXComponent as React.FC<React.PropsWithChildren<unknown>>;
}

declare module '@contentful/rich-text-plain-text-renderer' {
  export * from '@contentful/rich-text-plain-text-renderer/dist/types/index';
}

declare module '*.md';

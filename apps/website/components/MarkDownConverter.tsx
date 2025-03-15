import React, { useCallback, useMemo, useState } from 'react';

function parseHeaders(text: string): string {
  return text.replace(/^(#+) (.*)$/gm, (_, hashes: string[], content: string) => {
    const level = hashes.length;
    return `<h${level}>${content}</h${level}>`;
  });
}

function parseBold(text: string): string {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

function parseItalic(text: string): string {
  return text.replace(/\*(.*?)\*/g, '<em>$1</em>');
}

function parseLinks(text: string): string {
  // This regex will handle a single level of nested brackets within the link text
  return text.replace(/\[([^[\]]+\[?[^\]]*\]?)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

function parseLists(text: string): string {
  const items = text.replace(
    /^\s*-\s+(.*)$/gm,
    (_, item: string) => `<li>${parseLinks(item)}</li>`,
  );
  return items.replace(/(<li>[^<]+<\/li>)/g, '<ul>$1</ul>');
}

function parseParagraphs(text: string): string {
  return text.replace(/^(?!<li>|<\/li>|<h|<ul>|<ol>)([\s\S]+?)(?=\n\n|$)/gm, '<p>$1</p>');
}

export function parseMarkdown(markdown: string): string {
  let html = parseHeaders(markdown);
  html = parseLists(html);
  html = parseBold(html);
  html = parseItalic(html);
  html = parseParagraphs(html);
  return html;
}

export const MarkDownConverter: React.FC = () => {
  const [markdown, setMarkdown] = useState('');

  const handleMarkdownChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(event.target.value);
  }, []);

  const htmlOutput = useMemo(() => ({ __html: parseMarkdown(markdown) }), [markdown]);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
      <textarea
        onChange={handleMarkdownChange}
        placeholder="Enter Markdown here"
        style={{ width: '60%', height: '90vh', fontSize: '14px' }}
        value={markdown}
      />
      <div
        dangerouslySetInnerHTML={htmlOutput}
        style={{
          width: '80%',
          height: '90vh',
          overflow: 'auto',
          fontFamily: 'Arial',
        }}
      />
    </div>
  );
};

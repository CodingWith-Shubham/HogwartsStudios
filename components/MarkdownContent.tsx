"use client";

import ReactMarkdown from "react-markdown";

const components = {
  h1: (props: any) => (
    <h1
      {...props}
      className="text-4xl md:text-5xl font-bold font-magical mb-6 mt-8 text-foreground"
    />
  ),
  h2: (props: any) => (
    <h2
      {...props}
      className="text-3xl md:text-4xl font-bold font-magical-alt mb-4 mt-8 text-foreground"
    />
  ),
  h3: (props: any) => (
    <h3
      {...props}
      className="text-2xl md:text-3xl font-semibold font-magical-alt mb-3 mt-6 text-foreground"
    />
  ),
  p: (props: any) => (
    <p
      {...props}
      className="text-lg font-body-alt leading-relaxed text-foreground/90 mb-4"
    />
  ),
  code: (props: any) => (
    <code
      {...props}
      className="bg-zinc-800 text-red-400 px-1.5 py-1 rounded font-mono text-sm"
    />
  ),
  pre: (props: any) => (
    <pre
      {...props}
      className="bg-zinc-900 rounded-lg p-4 overflow-x-auto my-4 text-sm"
    />
  ),
  ul: (props: any) => (
    <ul {...props} className="list-disc pl-6 mb-4 text-foreground/90" />
  ),
  ol: (props: any) => (
    <ol {...props} className="list-decimal pl-6 mb-4 text-foreground/90" />
  ),
  li: (props: any) => <li {...props} className="mb-2 text-lg font-body-alt" />,
  blockquote: (props: any) => (
    <blockquote
      {...props}
      className="border-l-4 border-red-600 pl-4 italic text-foreground/70 my-4"
    />
  ),
  img: (props: any) => (
    <img
      {...props}
      className="rounded-lg my-4 mx-auto max-w-full h-auto"
    />
  ),
  a: (props: any) => (
    <a {...props} className="text-red-500 hover:text-red-400 underline" />
  ),
};

export function MarkdownContent({ content }: { content: string }) {
  return (
    <article className="prose prose-invert prose-lg max-w-none">
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </article>
  );
}
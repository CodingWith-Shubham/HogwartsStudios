import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';

export async function generateStaticParams() {
  const files = await fs.readdir(path.join(process.cwd(), 'blogs'));
  return files.filter(f => f.endsWith('.mdx')).map((filename) => ({
    slug: filename.replace('.mdx', ''),
  }));
}

const components = {
  h1: (props: any) => <h1 {...props} className="text-4xl md:text-5xl font-bold font-magical mb-6 mt-8 text-foreground" />,
  h2: (props: any) => <h2 {...props} className="text-3xl md:text-4xl font-bold font-magical-alt mb-4 mt-8 text-foreground" />,
  h3: (props: any) => <h3 {...props} className="text-2xl md:text-3xl font-semibold font-magical-alt mb-3 mt-6 text-foreground" />,
  p: (props: any) => <p {...props} className="text-lg font-body-alt leading-relaxed text-foreground/90 mb-4" />,
  code: (props: any) => <code {...props} className="bg-zinc-800 text-red-400 px-1.5 py-1 rounded font-mono text-sm" />,
  pre: (props: any) => <pre {...props} className="bg-zinc-900 rounded-lg p-4 overflow-x-auto my-4 text-sm" />,
  ul: (props: any) => <ul {...props} className="list-disc pl-6 mb-4" />,
  ol: (props: any) => <ol {...props} className="list-decimal pl-6 mb-4" />,
  blockquote: (props: any) => <blockquote {...props} className="border-l-4 border-red-600 pl-4 italic text-foreground/70 my-4" />,
  img: (props: any) => <img {...props} className="rounded-lg my-4 mx-auto" />,
};

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const filePath = path.join(process.cwd(), 'blogs', `${params.slug}.mdx`);
  try {
    await fs.access(filePath);
  } catch {
    return notFound();
  }
  const fileContent = await fs.readFile(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return (
    <div className="max-w-3xl mx-auto py-20 px-6">
      {data.coverImage && (
        <div className="mb-8 w-full aspect-[2.5/1] relative rounded-lg overflow-hidden shadow-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.coverImage} alt={data.title} className="object-cover w-full h-full" />
        </div>
      )}
      <h1 className="text-4xl md:text-5xl font-bold font-magical mb-2 text-foreground">{data.title}</h1>
      <p className="text-lg text-foreground/70 mb-4 font-body-alt">{data.description}</p>
      <span className="text-sm text-foreground/50 mb-8 block font-body-alt">{data.date}</span>
      <article className="prose prose-invert prose-lg max-w-none">
        <MDXRemote source={content} components={components} />
      </article>
    </div>
  );
}

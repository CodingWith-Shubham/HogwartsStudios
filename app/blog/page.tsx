import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

export const dynamic = 'force-static'; // For static generation

const POSTS_PER_PAGE = 5;

async function getPosts() {
  const blogDir = path.join(process.cwd(), 'blogs');
  const files = await fs.readdir(blogDir);
  const posts = await Promise.all(
    files.filter(f => f.endsWith('.mdx')).map(async (filename) => {
      const filePath = path.join(blogDir, filename);
      const content = await fs.readFile(filePath, 'utf-8');
      const { data } = matter(content);
      return {
        title: data.title || filename,
        slug: filename.replace('.mdx', ''),
        description: data.description || '',
        date: data.date || '',
        coverImage: data.coverImage || null,
      };
    })
  );
  // Sort by date descending
  return posts.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
}

export default async function BlogList({ searchParams }: { searchParams?: { page?: string } }) {
  const posts = await getPosts();
  const page = parseInt(searchParams?.page || '1', 10);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  const paginatedPosts = posts.slice(start, end);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-6 py-24 w-full">
        <h1 className="text-5xl ml-20 lg:ml-60 font-bold mb-8 bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent font-magical">Latest Blogs</h1>
        <div className="space-y-8">
          {paginatedPosts.map(post => (
            <Link href={`/blog/${post.slug}`} key={post.slug}>
              <div className="bg-card dark:bg-zinc-900 p-6 rounded-lg hover:bg-zinc-800 transition shadow-lg border border-border">
                {post.coverImage && (
                  <img src={post.coverImage} alt={post.title} className="w-full h-48 object-cover rounded mb-4" />
                )}
                <h2 className="text-2xl font-semibold font-magical-alt text-foreground mb-2">{post.title}</h2>
                <p className="text-foreground/70 mt-1 font-body-alt">{post.description}</p>
                <span className="text-sm text-foreground/50 mt-2 block font-body-alt">{post.date}</span>
              </div>
            </Link>
          ))}
        </div>
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <Link
              href={page > 1 ? `/blog?page=${page - 1}` : '#'}
              aria-disabled={page === 1}
              className={`px-4 py-2 rounded bg-muted text-foreground/70 font-semibold transition ${page === 1 ? 'opacity-50 pointer-events-none' : 'hover:bg-accent hover:text-accent-foreground'}`}
            >
              Previous
            </Link>
            <span className="text-lg font-body-alt">
              Page {page} of {totalPages}
            </span>
            <Link
              href={page < totalPages ? `/blog?page=${page + 1}` : '#'}
              aria-disabled={page === totalPages}
              className={`px-4 py-2 rounded bg-muted text-foreground/70 font-semibold transition ${page === totalPages ? 'opacity-50 pointer-events-none' : 'hover:bg-accent hover:text-accent-foreground'}`}
            >
              Next
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

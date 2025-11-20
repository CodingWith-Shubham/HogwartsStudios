import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { getDatabase, getPageProperties } from "@/lib/notion";
import Link from "next/link";

// export const dynamic = 'force-dynamic';
export const revalidate = 60;
// export const dynamic = 'force-dynamic';

const POSTS_PER_PAGE = 10; // Show all posts or increase the limit

export default async function BlogList() {
  const pages = await getDatabase();
  const posts = pages.map((page) => getPageProperties(page));

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-6 py-24 w-full">
        <h1 className="text-5xl ml-20 lg:ml-60 font-bold mb-8 text-foreground font-sans">
          Latest Blogs
        </h1>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-foreground/70">No blog posts found.</p>
            <p className="text-sm text-foreground/50 mt-2">
              Make sure you have published posts in your Notion database with the "Published" checkbox checked.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.id}>
                <article className="group p-6 rounded-lg border border-border hover:border-red-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-600/10">
                  {post.coverImage && (
                    <div className="mb-4 w-full aspect-video relative rounded-lg overflow-hidden">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  <h2 className="text-2xl font-bold mb-2 text-foreground group-hover:text-red-600 transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-foreground/70 mb-4 line-clamp-2">
                    {post.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-foreground/50">
                    <span>{post.author}</span>
                    <span>•</span>
                    <time>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    
                    {post.tags.length > 0 && (
                      <>
                        <span>•</span>
                        <div className="flex gap-2">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="bg-red-600/20 text-red-400 px-2 py-1 rounded text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
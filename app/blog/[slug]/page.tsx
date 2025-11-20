import { notFound } from "next/navigation";
import { 
  getPageBySlug, 
  getPageContent, 
  getPageProperties, 
  getDatabase 
} from "@/lib/notion";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { MarkdownContent } from "@/components/MarkdownContent";

// export const dynamic = 'force-dynamic';
export const revalidate = 60;
// export const dynamic = 'force-dynamic';

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const page = await getPageBySlug(params.slug);

  if (!page) {
    return notFound();
  }

  const post = getPageProperties(page);
  const content = await getPageContent(page.id);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto py-20 px-6">
          {post.coverImage && (
            <div className="mb-8 w-full aspect-[2.5/1] relative rounded-lg overflow-hidden shadow-lg">
              <img
                src={post.coverImage}
                alt={post.title}
                className="object-cover w-full h-full"
              />
            </div>
          )}

          <h1 className="text-4xl md:text-5xl font-bold font-magical mb-2 text-foreground">
            {post.title}
          </h1>

          <p className="text-lg text-foreground/70 mb-4 font-body-alt">
            {post.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-foreground/50 mb-8 font-body-alt">
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
                  {post.tags.map((tag) => (
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

          <MarkdownContent content={content} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  try {
    console.log("🔄 Generating static params for blog posts...");
    const posts = await getDatabase();
    console.log(`📝 Found ${posts.length} posts`);

    const slugs = posts
      .map((post) => {
        try {
          return getPageProperties(post);
        } catch (error) {
          console.error("Error processing post:", error);
          return null;
        }
      })
      .filter((p) => p && p.slug)
      .map((p) => {
        console.log(`✅ Generated slug: ${p!.slug}`);
        return {
          slug: p!.slug,
        };
      });

    console.log(`✅ Total slugs generated: ${slugs.length}`);
    return slugs;
  } catch (error) {
    console.error("❌ Error in generateStaticParams:", error);
    return [];
  }
}
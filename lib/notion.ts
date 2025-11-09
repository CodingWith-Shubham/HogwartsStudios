import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  tags: string[];
  coverImage: string;
  author: string;
}

// Initialize Notion clients
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

// Fetch database entries
export const getDatabase = async (): Promise<any[]> => {
  if (!process.env.NOTION_DATABASE_ID || !process.env.NOTION_TOKEN) {
    return [];
  }

  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      filter: {
        property: "Published",
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: "Date",
          direction: "descending",
        },
      ],
    });

    return response.results;
  } catch (error: any) {
    console.error("Notion API Error:", error?.message);
    return [];
  }
};

// Fetch single page
export const getPage = async (pageId: string) => {
  return await notion.pages.retrieve({ page_id: pageId });
};

// Fetch markdown content
export const getPageContent = async (pageId: string): Promise<string> => {
  try {
    const mdblocks = await n2m.pageToMarkdown(pageId);
    const mdString = n2m.toMarkdownString(mdblocks);
    return mdString.parent;
  } catch {
    return "";
  }
};

// Fetch page by slug
export const getPageBySlug = async (slug: string) => {
  if (!process.env.NOTION_DATABASE_ID) return null;

  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      filter: {
        and: [
          {
            property: "Slug",
            rich_text: {
              equals: slug,
            },
          },
          {
            property: "Published",
            checkbox: {
              equals: true,
            },
          },
        ],
      },
    });

    return response.results[0];
  } catch {
    return null;
  }
};

// Extract typed properties
export const getPageProperties = (page: any): BlogPost => {
  try {
    return {
      id: page.id,
      title: page.properties.Title?.title?.[0]?.plain_text || "",
      slug: page.properties.Slug?.rich_text?.[0]?.plain_text || "",
      description: page.properties.Description?.rich_text?.[0]?.plain_text || "",
      date: page.properties.Date?.date?.start || "",
      tags: page.properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
      coverImage:
        page.properties.Cover?.files?.[0]?.file?.url ||
        page.cover?.external?.url ||
        page.cover?.file?.url ||
        "",
      author: page.properties.Author?.rich_text?.[0]?.plain_text || "Anonymous",
    };
  } catch {
    return {
      id: page.id,
      title: "Untitled",
      slug: "",
      description: "",
      date: "",
      tags: [],
      coverImage: "",
      author: "Anonymous",
    };
  }
};

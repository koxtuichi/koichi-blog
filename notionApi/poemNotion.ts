import { isFullPage } from "@jitl/notion-api";
import { Client } from "@notionhq/client";

export type PoemPost = {
  id: string;
  title: string;
  content: string;
  eng: string;
  updatedAt: any;
};

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

export const getPagePoemPost = async (cursor?: string | null) => {
  const fullOrPartialPages = await notion.databases.query({
    database_id: process.env.NOTION_POEM_DATABASE_ID || "",
  });

  const posts: PoemPost[] = [];

  for (const page of fullOrPartialPages.results) {
    if (!isFullPage(page)) {
      continue;
    }
    const published: any = page.properties.published;
    if (!published.checkbox) continue;
    const properties: any = page.properties;
    posts.push({
      id: page.id,
      title: properties.title.title[0]
        ? properties.title.title[0].plain_text
        : "",
      content: properties.content.rich_text[0]
      ? properties.content.rich_text[0].plain_text
      : "",
      eng: properties.eng.rich_text[0]
      ? properties.eng.rich_text[0].plain_text
      : "",
      updatedAt: properties.updatedAt.created_time,
    });
  }

  return {
    poemPosts: posts,
    nextCursor: fullOrPartialPages.next_cursor,
  };
};
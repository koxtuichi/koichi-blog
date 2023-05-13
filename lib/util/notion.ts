import { Client } from "@notionhq/client";
import { isFullPage } from "@jitl/notion-api";

export type Post = {
  id: string;
  title: string;
  description: string;
  url: any;
  updatedAt: any;
};

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

export const getPageDatas = async () => {
  const fullOrPartialPages = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID || "",
  });

  const posts: Post[] = [];

  for (const page of fullOrPartialPages.results) {
    if (!isFullPage(page)) {
      continue;
    }
    const published: any = page.properties.published;
    if (!published.checkbox) continue;
    const properties: any = page.properties;
    const image: any = page.properties.url;
    console.dir(properties.updatedAt);
    posts.push({
      id: page.id,
      title: properties.title.title[0].plain_text,
      description: properties.description.rich_text[0].plain_text,
      url: image.files[0]?.file?.url || "",
      updatedAt: properties.updatedAt.date.start,
    });
  }

  return posts;
};

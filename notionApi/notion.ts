import { Client } from "@notionhq/client";
import { isFullPage } from "@jitl/notion-api";
import fs from 'fs'

export type Post = {
  id: string;
  title: string;
  description: string;
  url: any;
  url2: any;
  url3: any;
  url4: any;
  updatedAt: any;
  shootingDate: any;
  titleEng: any;
  eng: any;
  link?: any;
};

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

export const getPageDatas = async (cursor?: string | null) => {
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
    const image2: any = page.properties.url2;
    const image3: any = page.properties.url3;
    const image4: any = page.properties.url4;

    const url = image.files[0]?.file?.url || "";
    const url2 = image2.files[0]?.file?.url || null;
    const url3 = image3.files[0]?.file?.url || null;
    const url4 = image4.files[0]?.file?.url || null;

    posts.push({
      id: page.id,
      title: properties.title.title[0]
        ? properties.title.title[0].plain_text
        : "",
      description: properties.description.rich_text[0]
        ? properties.description.rich_text[0].plain_text
        : "",
      url: url,
      url2: url2,
      url3: url3,
      url4: url4,
      updatedAt: properties.updatedAt.date.start,
      shootingDate: properties.shootingDate.date.start,
      titleEng: properties.titleEng.rich_text[0]?.plain_text || '',
      eng: properties.eng.rich_text[0]
        ? properties.eng.rich_text[0].plain_text
        : "",
      link: properties.link.rich_text[0]
        ? properties.link.rich_text[0].plain_text
        : "",
    });
  }

  return {
    posts: posts,
    nextCursor: fullOrPartialPages.next_cursor,
  };
};

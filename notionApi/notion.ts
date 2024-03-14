import { Client, isFullPageOrDatabase } from "@notionhq/client";

export type Post = {
  id: string;
  description: string;
  engDescription: string;
  url: any;
  url2: any;
  url3: any;
  url4: any;
  updatedAt: any;
  shootingDate: any;
  link?: any;
  camera?: any;
  jpnSpeechDescription?: string;
  engSpeechDescription?: string;
};

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

export const getPageDatas = async () => {
  let hasMore = true;
  let nextCursor: string | undefined = undefined;
  const posts: Post[] = [];

  while (hasMore) {
    const fullOrPartialPages = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID || "",
      start_cursor: nextCursor,
    });

    for (const page of fullOrPartialPages.results) {
      if (!isFullPageOrDatabase(page)) {
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

      const speechJpnFile = properties.jpnSpeechDescription.files[0]?.file?.url;
      const speechEngFile = properties.engSpeechDescription.files[0]?.file?.url;

      posts.push({
        id: page.id,
        description: properties.description.title[0]
          ? properties.description.title[0].plain_text
          : "",
        url: url,
        url2: url2,
        url3: url3,
        url4: url4,
        updatedAt: properties.updatedAt.date?.start,
        shootingDate: properties.shootingDate.date?.start,
        engDescription: properties.engDescription.rich_text[0]
          ? properties.engDescription.rich_text[0].plain_text
          : "",
        link: properties.link.rich_text[0]
          ? properties.link.rich_text[0].plain_text
          : "",
        camera: properties?.camera?.select?.name || "",
        jpnSpeechDescription: speechJpnFile,
        engSpeechDescription: speechEngFile,
      });
    }

    nextCursor = fullOrPartialPages.next_cursor || undefined;
    hasMore = fullOrPartialPages.has_more;
  }

  return posts;
};

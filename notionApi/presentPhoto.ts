import { Client, isFullPageOrDatabase } from "@notionhq/client";

export type PresentPhotoPost = {
  id: string;
  title: string;
  photo: string;
};

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

export const getPagePresentPhotoPost = async (cursor?: string | null) => {
  const fullOrPartialPages = await notion.databases.query({
    database_id: process.env.NOTION_PRESENT_PHOTO_ID || "",
  });

  const posts: PresentPhotoPost[] = [];

  for (const page of fullOrPartialPages.results) {
    if (!isFullPageOrDatabase(page)) {
      continue;
    }
    const published: any = page.properties.published;
    if (!published.checkbox) continue;
    const properties: any = page.properties;
    const image = properties.url;
    const url = image.files[0]?.file?.url || "";
    posts.push({
      id: page.id,
      title: properties.title.title[0]
        ? properties.title.title[0].plain_text
        : "",
      photo: url,
    });
  }

  return {
    presentPhotoPosts: posts,
    nextCursor: fullOrPartialPages.next_cursor,
  };
};

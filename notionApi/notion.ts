import { Client } from "@notionhq/client";
import { isFullPage } from "@jitl/notion-api";
import fs from 'fs'

export type Post = {
  id: string;
  title: string;
  description: string;
  num: number;
  url: any;
  updatedAt: any;
  shootingDate: any;
  titleEng: any;
  eng: any;
  link?: any;
  keywords?: any;
  explanation?: any;
  keywordsEng?: any;
  explanationEng?: any;
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

    const url = image.files[0]?.file?.url || "";
    const imagePath = 'public/blogImages';
    const savePath = 'public/' + page.id + '.png';
    const blob = await fetch(url).then((r) => r.blob());
    const binary = (await blob.arrayBuffer()) as Uint8Array;
    const buffer = Buffer.from(binary);
    fs.writeFileSync(savePath, buffer, {  })

    posts.push({
      id: page.id,
      title: properties.title.title[0]
        ? properties.title.title[0].plain_text
        : "",
      description: properties.description.rich_text[0]
        ? properties.description.rich_text[0].plain_text
        : "",
      num: properties.num.number,
      url: url,
      updatedAt: properties.updatedAt.date.start,
      shootingDate: properties.shootingDate.date.start,
      titleEng: properties.titleEng.rich_text[0].plain_text,
      eng: properties.eng.rich_text[0]
        ? properties.eng.rich_text[0].plain_text
        : "",
      link: properties.link.rich_text[0]
        ? properties.link.rich_text[0].plain_text
        : "",
      keywords: properties.keywords.rich_text[0]
        ? properties.keywords.rich_text[0].plain_text
        : "",
      explanation: properties.explanation.rich_text[0]
        ? properties.explanation.rich_text[0].plain_text
        : "",
      keywordsEng: properties.keywordsEng.rich_text[0]
        ? properties.keywordsEng.rich_text[0].plain_text
        : "",
      explanationEng: properties.explanationEng.rich_text[0]
        ? properties.explanationEng.rich_text[0].plain_text
        : "",
    });
  }

  return posts;
};

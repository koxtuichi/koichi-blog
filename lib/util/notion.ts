import { Client } from '@notionhq/client';
import { isFullPage } from '@jitl/notion-api';

export type Post = {
    id: string,
    title: string,
    url: any,
    num: any,
}

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
			continue
		}
		const published: any = page.properties.published;
		if (!published.checkbox) continue;
		const post: any = page.properties.post;
		const image: any = page.properties.image;
		const num: any = page.properties.num;
		posts.push(
			{
				id: page.id,
				title: post.title[0].plain_text,
				url: image.files[0]?.file?.url || "",
				num: num.number,
			}
		);
	}

	return posts;
}

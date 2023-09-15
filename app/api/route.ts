import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const response = await request.json()
    const res = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_CREATE_PRESENT_INFO_ID || "",
      },
      properties: {
        name: {
          type: "title",
          title: [
            {
              type: "text",
              text: {
                content: response?.['submitObj']?.['name'] ?? '',
              },
            },
          ],
        },
        zipCode: {
          type: "rich_text",
          rich_text: [
            {
              type: "text",
              text: {
                content: response?.['submitObj']?.['zipCode'] ?? '',
              },
            },
          ],
        },
        address: {
          type: "rich_text",
          rich_text: [
            {
              type: "text",
              text: {
                content: response?.['submitObj']?.['address'] ?? '',
              },
            },
          ],
        },
        email: {
          type: "rich_text",
          rich_text: [
            {
              type: "text",
              text: {
                content: response?.['submitObj']?.['email'] ?? '',
              },
            },
          ],
        },
      },
    });

    const data = await JSON.stringify(res);
    return NextResponse.json(data)
  } catch (e) {
    console.dir(e);
  }
}
import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

export async function POST(request: Request): Promise<Response> {
  try {
    const response = await request.json();
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
                content: response?.["submitObj"]?.["name"] ?? "",
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
                content: response?.["submitObj"]?.["zipCode"] ?? "",
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
                content: response?.["submitObj"]?.["address"] ?? "",
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
                content: response?.["submitObj"]?.["email"] ?? "",
              },
            },
          ],
        },
      },
    });

    return NextResponse.json(res); // オブジェクトを直接渡す
  } catch (e) {
    console.dir(e);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to create page",
        error: "error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

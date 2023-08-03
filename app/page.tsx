import { getPageDatas } from "@/notionApi/notion";
import HomeComponent from "./_page";

import fs from 'fs'

// export const dynamic = 'error';
export const revalidate = 10;

const Home = async () => {
  // const checkUrl = async (url: string) => {
  //   try {
  //     const response = await fetch(url, {
  //       method: 'HEAD', // 'HEAD'リクエストはリソースを取得せずにヘッダー情報だけを取得します
  //     });

  //     // 200 OKのレスポンスが返ってきたら、URLは有効です
  //     if (response.ok) {
  //       return true;
  //     }
  //     return false;
  //   } catch (error) {
  //     return false;
  //   }
  // }
  const posts = await getPageDatas();
  try {
    const imagePath = 'public/blogImages';

    if (!fs.existsSync(imagePath)) {
      fs.mkdirSync(imagePath)
    }

    posts.map(async (post) => {
      const id = post.id;
      const url = post.url;
      const savePath = imagePath + '/' + id + '.png';
      if (fs.existsSync(savePath)) {
        return;
      }
      const blob = await fetch(url).then((r) => r.blob());
      const binary = (await blob.arrayBuffer()) as Uint8Array;
      const buffer = Buffer.from(binary);
      fs.writeFile(savePath, buffer, (error) => {
        if (error) {
          throw error;
        }
      })
    })
    return (
      <HomeComponent posts={posts} />
    );
  } catch {
    return (
      <HomeComponent posts={posts} />
    )
  }
};

export default Home;

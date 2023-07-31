import { getPageDatas } from "@/notionApi/notion";
import HomeComponent from "./_page";

import fs from 'fs'

export const path = 'public/blogImages';

const Home = async () => {
  const posts = await getPageDatas();

  if (!fs.existsSync(path)) {
    fs.mkdirSync(path)
  }

  posts.map(async (post) => {
    const id = post.id;
    const url = post.url;
    if (fs.existsSync(path + '/' + id + '.png')) {
      return;
    }
    const blob = await fetch(url).then((r) => r.blob());
    const imagesPath = path + '/' + id;
    const binary = (await blob.arrayBuffer()) as Uint8Array;
    const buffer = Buffer.from(binary);
    fs.writeFile(imagesPath + '.png', buffer, (error) => {
      if (error) {
        throw error;
      }
    })
  })

  return (
    <HomeComponent posts={posts} />
  );
};

export default Home;

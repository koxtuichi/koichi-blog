import { getPageDatas } from "@/notionApi/notion";
import HomeComponent from "./_page";

import fs from 'fs'


const Home = async () => {
  const posts = await getPageDatas();
  const imagePath = 'public/blogImages';

  // if (!fs.existsSync(imagePath)) {
  //   fs.mkdirSync(imagePath)
  // }

  // posts.map(async (post) => {
  //   const id = post.id;
  //   const url = post.url;
  //   const savePath = imagePath + '/' + id + '.png';
  //   if (fs.existsSync(savePath)) {
  //     return;
  //   }
  //   const blob = await fetch(url).then((r) => r.blob());
  //   const binary = (await blob.arrayBuffer()) as Uint8Array;
  //   const buffer = Buffer.from(binary);
  //   fs.writeFile(savePath, buffer, (error) => {
  //     if (error) {
  //       throw error;
  //     }
  //   })
  // })

  return (
    <HomeComponent posts={posts} />
  );
};

export default Home;

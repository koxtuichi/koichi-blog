import { getPageDatas } from "@/notionApi/notion";
import HomeComponent from "./_page";
import { getPagePoemPost } from "@/notionApi/poemNotion";

import fs from "fs";

const Home = async () => {
  const posts = await getPageDatas();
  const { poemPosts } = await getPagePoemPost();

  const imagePath = "public/blogImages";

  if (!fs.existsSync(imagePath)) {
    fs.mkdirSync(imagePath);
  } else {
    fs.rmdir(imagePath, () => {
      fs.mkdirSync(imagePath);
    });
  }

  posts.map(async (post) => {
    const id = post.id;
    const url1 = post.url;
    const url2 = post.url2;
    const url3 = post.url3;
    const url4 = post.url4;
    const savePath1 = `${imagePath}/1-${id}.png`;
    const savePath2 = `${imagePath}/2-${id}.png`;
    const savePath3 = `${imagePath}/3-${id}.png`;
    const savePath4 = `${imagePath}/4-${id}.png`;
    if (fs.existsSync(savePath1)) {
      return;
    }
    if (fs.existsSync(savePath2)) {
      return;
    }
    if (fs.existsSync(savePath3)) {
      return;
    }
    if (fs.existsSync(savePath4)) {
      return;
    }
    const blob1 = await fetch(url1).then((r) => r.blob());
    const blob2 = url2 ? await fetch(url2).then((r) => r.blob()) : undefined;
    const blob3 = url3 ? await fetch(url3).then((r) => r.blob()) : undefined;
    const blob4 = url4 ? await fetch(url4).then((r) => r.blob()) : undefined;
    const binary1 = (await blob1.arrayBuffer()) as Uint8Array;
    const binary2 = blob2
      ? ((await blob2.arrayBuffer()) as Uint8Array)
      : undefined;
    const binary3 = blob3
      ? ((await blob3.arrayBuffer()) as Uint8Array)
      : undefined;
    const binary4 = blob4
      ? ((await blob4.arrayBuffer()) as Uint8Array)
      : undefined;
    const buffer1 = Buffer.from(binary1);
    const buffer2 = binary2 ? Buffer.from(binary2) : undefined;
    const buffer3 = binary3 ? Buffer.from(binary3) : undefined;
    const buffer4 = binary4 ? Buffer.from(binary4) : undefined;
    fs.writeFile(savePath1, buffer1, (error) => {
      if (error) {
        throw error;
      }
    });
    buffer2 &&
      fs.writeFile(savePath2, buffer2, (error) => {
        if (error) {
          throw error;
        }
      });
    buffer3 &&
      fs.writeFile(savePath3, buffer3, (error) => {
        if (error) {
          throw error;
        }
      });
    buffer4 &&
      fs.writeFile(savePath4, buffer4, (error) => {
        if (error) {
          throw error;
        }
      });
  });
  return <HomeComponent posts={posts} poemPosts={poemPosts} />;
};

export default Home;

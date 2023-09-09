import { getPageDatas } from "@/notionApi/notion";
import HomeComponent from "./_page";
import { getPagePoemPost } from "@/notionApi/poemNotion";

// let oldPosts = null;
// let oldNextCursor = null;
const Home = async () => {
  const { posts } = await getPageDatas();
  const { poemPosts }  = await getPagePoemPost();
  return (
    <HomeComponent posts={posts} poemPosts={poemPosts}/>
  );
};

export default Home;

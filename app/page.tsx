import { getPageDatas } from "@/notionApi/notion";
import HomeComponent from "./_page";

// let oldPosts = null;
// let oldNextCursor = null;
const Home = async () => {
  const { posts } = await getPageDatas();
  return (
    <HomeComponent posts={posts} />
  );
};

export default Home;

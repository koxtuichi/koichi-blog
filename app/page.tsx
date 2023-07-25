import { getPageDatas } from "@/notionApi/notion";
import HomeComponent from "./_page";

const Home = async () => {
  const posts = await getPageDatas();

  return (
    <HomeComponent posts={posts} />
  );
};

export default Home;

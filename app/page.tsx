import { getPageDatas } from "@/notionApi/notion";
import HomeComponent from "./_page";


// export const dynamic = 'error';
// export const revalidate = 1;

const Home = async () => {
  const posts = await getPageDatas();
  return (
    <HomeComponent posts={posts} />
  );
};

export default Home;

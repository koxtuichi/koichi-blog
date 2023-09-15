import { getPageDatas } from "@/notionApi/notion";
import HomeComponent from "./_page";
import { getPagePoemPost } from "@/notionApi/poemNotion";
import { getPagePresentPhotoPost } from "@/notionApi/presentPhoto";

const Home = async () => {
  const { posts } = await getPageDatas();
  const { poemPosts } = await getPagePoemPost();
  const { presentPhotoPosts } = await getPagePresentPhotoPost();

  return (
    <HomeComponent
      posts={posts}
      poemPosts={poemPosts}
      presentPhotoPosts={presentPhotoPosts}
    />
  );
};

export default Home;

import { getPageDatas } from '@/notionApi/notion';
import HomeComponent from './_page';
import { getPagePoemPost } from '@/notionApi/poemNotion';
import { useEffect } from 'react';

const Home = async () => {
	const { posts } = await getPageDatas();
	const { poemPosts } = await getPagePoemPost();

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		if (typeof window !== 'undefined') {
			require('aframe');
			require('aframe-react');
		}
	}, []);

	return (
		<HomeComponent
			posts={posts}
			poemPosts={poemPosts}
		/>
	);
};

export default Home;

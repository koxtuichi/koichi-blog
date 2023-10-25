'use client';

import { Post } from '@/notionApi/notion';
import React, { useMemo, useState } from 'react';
import {
	Button,
	Container,
	Grid,
	Header,
	Image as SemanticImage,
} from 'semantic-ui-react';
// semantic-uiはスタイルを含まないので以下のimportが必要
import 'semantic-ui-css/semantic.min.css';

import { TranslateButtonGroup } from '@/component/TranslateButtonGroup';
import Profile from '@/component/home/profile';
import MainPost from '@/component/home/MainPost';
import SecondPost from '@/component/home/SecondPost';
import { Analytics } from '@vercel/analytics/react';
import {
	ContainerButtonCenter,
	ContainerCenter,
	ContainerSelfIntroductionComponent,
	DividerMargin,
} from '@/component/home/styledComponents';
import ModalImage from '@/component/home/ModalImage';
import SlideImages from './_slideImages';
import { Flex, Text } from '@chakra-ui/react';
import SnsIcons from './_snsIcons';
import { PoemPost } from '@/notionApi/poemNotion';
import VerticalPoemSwipe from './_verticalPoemSwipe';

type HomeComponentProps = {
  posts: Post[];
  poemPosts: PoemPost[];
};
const SIGMA_SELECT = 'sigma';
const HomeComponent: React.FC<HomeComponentProps> = ({
	posts,
	poemPosts,
}) => {
	const [selectedPhoto, setSelectedPhoto] = useState<Post | null>(null);
	const [viewEng, setViewEng] = useState<boolean>(true);
	const [viewPosts, setViewPosts] = useState<number>(2);
	const [viewSlidePosts, setViewSlidePosts] = useState<number>(1);
	const [viewSigmaPosts, setViewSigmaPosts] = useState<number>(1);

	const slidePosts = useMemo(() => {
		const filtered = posts.filter(
			(post) => post.url2 && post.url3 && post.url4
		);
		return filtered;
	}, [posts]);

	const notSlidePosts = useMemo(() => {
		const filtered = posts.filter(
			(post) =>
				!post.url2 && !post.url3 && !post.url4 && post.camera !== SIGMA_SELECT
		);
		return filtered;
	}, [posts]);

	const sigmaPosts = useMemo(() => {
		const filtered = posts.filter((post) => post.camera === SIGMA_SELECT);
		return filtered;
	}, [posts]);

	const moreText = useMemo(() => {
		return viewEng ? 'More' : 'もっとみる';
	}, [viewEng]);

	const fourPictureTitle = useMemo(() => {
		return viewEng ? '"What Four Photographs Say."' : '「４枚で伝えたいこと」';
	}, [viewEng]);

	const foveonTitle = useMemo(() => {
		return viewEng ? '"This is FOVEON."' : '「これがFOVEON」';
	}, [viewEng]);

	const perfectDayTitle = useMemo(() => {
		return viewEng ? '"Perfect day for photographs."' : '「写真日和」';
	}, [viewEng]);

	return (
		<>
			<Header as="h2" icon textAlign="center">
				{/* vercelアナリティクス */}
				<Analytics />
				{/* プロフ画像 */}
				<SemanticImage src="/profileImg.jpg" alt="profileImg" avatar />
				{/* タイトル */}
				<Header.Content>
					<p>KAKIKUKE KOICHI</p>
				</Header.Content>
			</Header>
			<ContainerSelfIntroductionComponent text textAlign="center">
				{/* 日英切り替えボタン */}
				<TranslateButtonGroup setViewEng={setViewEng} viewEng={viewEng} />
				{/* プロフィール */}
				<Profile viewEng={viewEng} />
				{/* SNSアイコン */}
				<SnsIcons />
			</ContainerSelfIntroductionComponent>

			{/* 写真送付サービス TODO: 一旦なし */}
			{/* <DividerMargin /> */}
			{/* <SellPhoto
        viewEng={viewEng}
        presentPhotoPost={presentPhotoPosts[0]}
      /> */}

			<DividerMargin />
			{/* ポエム */}
			<VerticalPoemSwipe poems={poemPosts} viewEng={viewEng} />
			<DividerMargin />
			{/* 写真４枚 */}
			<Flex flexDirection="column" gap="20px" mb="20px">
				<Text fontSize="20px" width="100%" textAlign="center" mb="0px">
					{fourPictureTitle}
				</Text>
				{slidePosts
					.filter((_, index) => index < viewSlidePosts)
					.map((post, index) => (
						<SlideImages key={index} post={post} />
					))}
			</Flex>
			{!(slidePosts.length < viewSlidePosts + 1) && (
				<ContainerButtonCenter>
					<Button
						size="mini"
						basic
						onClick={() => setViewSlidePosts((prev) => prev + 1)}
					>
						{moreText}
					</Button>
				</ContainerButtonCenter>
			)}
			<DividerMargin />
			{/* SIGMAの写真 */}
			<Container>
				<ContainerCenter>
					<Text fontSize="20px" width="100%" textAlign="center">
						{foveonTitle}
					</Text>
					<Flex flexDirection="column" gap="20px">
						{sigmaPosts
							.filter((_, index) => index < viewSigmaPosts)
							.map((item, index) => {
								return (
									<SemanticImage
										key={index}
										src={item.url}
										alt="dp1 merrill sigma foveon"
									/>
								);
							})}
					</Flex>
				</ContainerCenter>
				{!(sigmaPosts.length < viewSigmaPosts + 1) && (
					<ContainerButtonCenter>
						<Button
							size="mini"
							basic
							onClick={() => setViewSigmaPosts((prev) => prev + 1)}
						>
							{moreText}
						</Button>
					</ContainerButtonCenter>
				)}
			</Container>
			<DividerMargin />
			{/* 写真日記 */}
			<Container>
				<Grid>
					<ContainerCenter>
						<Text fontSize="20px" width="100%" textAlign="center">
							{perfectDayTitle}
						</Text>
						<Grid.Row columns={1}>
							<MainPost
								posts={notSlidePosts}
								viewEng={viewEng}
								setSelectedPhoto={setSelectedPhoto}
							/>
						</Grid.Row>
					</ContainerCenter>
					<Grid.Row columns={2}>
						<SecondPost
							posts={notSlidePosts.filter((post, index) => index <= viewPosts)}
							viewEng={viewEng}
							setSelectedPhoto={setSelectedPhoto}
						/>
					</Grid.Row>
				</Grid>
				{!(posts.length < viewPosts + 1) && (
					<ContainerButtonCenter>
						<Button
							size="mini"
							basic
							onClick={() => setViewPosts((prev) => prev + 4)}
						>
							{moreText}
						</Button>
						<div style={{ height: '20px' }} />
					</ContainerButtonCenter>
				)}
			</Container>
			<DividerMargin />
			<ModalImage
				selectedPhoto={selectedPhoto}
				setSelectedPhoto={setSelectedPhoto}
				viewEng={viewEng}
			/>
		</>
	);
};

export default HomeComponent;

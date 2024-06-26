"use client";

import { Post } from "@/notionApi/notion";
import React, { useEffect, useMemo, useState } from "react";
import { Container, Grid, Header } from "semantic-ui-react";
// semantic-uiはスタイルを含まないので以下のimportが必要
import "semantic-ui-css/semantic.min.css";

import { TranslateButtonGroup } from "@/component/TranslateButtonGroup";
import Profile from "@/component/home/profile";
import MainPost from "@/component/home/MainPost";
// import SecondPost from "@/component/home/SecondPost";
import { Analytics } from "@vercel/analytics/react";
import {
  AvatarSemanticImageComponent,
  ContainerCenter,
  ContainerSelfIntroductionComponent,
  DividerMargin,
  HeaderComponent,
  // SecondPostsGridRow,
} from "@/component/home/styledComponents";
import ModalImage from "@/component/home/ModalImage";
// import SlideImages from "./_slideImages";
import { Text } from "@chakra-ui/react";
import SnsIcons from "./_snsIcons";
import { PoemPost } from "@/notionApi/poemNotion";
import VerticalPoemSwipe from "./_verticalPoemSwipe";
import PageLink from "./_pageLink";
import { Element } from "react-scroll";
import Image from "next/image";

type HomeComponentProps = {
  posts: Post[];
  poemPosts: PoemPost[];
};
const SIGMA_SELECT = "sigma";
const HomeComponent: React.FC<HomeComponentProps> = ({ posts, poemPosts }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Post | null>(null);
  const [viewEng, setViewEng] = useState<boolean>(false);
  const [viewPosts, setViewPosts] = useState<number>(10);
  // const [viewSlidePosts, setViewSlidePosts] = useState<number>(1);
  // const [viewSigmaPosts, setViewSigmaPosts] = useState<number>(1);

  // const slidePosts = useMemo(() => {
  //   const filtered = posts.filter((post) => post.url2 && post.url3);
  //   return filtered;
  // }, [posts]);

  const incompletePosts = useMemo(() => {
    const filtered = posts.filter(
      (post) =>
        !post.url2 &&
        !post.url3 &&
        post.camera !== SIGMA_SELECT &&
        post.jpnDescription &&
        post.engDescription
    );
    return filtered;
  }, [posts]);

  const notSlidePosts = useMemo(() => {
    const filtered = posts.filter(
      (post) =>
        !post.url2 &&
        !post.url3 &&
        post.camera !== SIGMA_SELECT &&
        !post.jpnDescription
    );
    return filtered;
  }, [posts]);

  // const sigmaPosts = useMemo(() => {
  //   const filtered = posts.filter((post) => post.camera === SIGMA_SELECT);
  //   return filtered;
  // }, [posts]);

  // const moreText = useMemo(() => {
  //   return viewEng ? "More" : "もっとみる";
  // }, [viewEng]);

  // const fourPictureTitle = useMemo(() => {
  //   return viewEng ? "Color and Monochrome." : "「カラーとモノクロ」";
  // }, [viewEng]);

  // const foveonTitle = useMemo(() => {
  //   return viewEng ? "This is FOVEON." : "「これがFOVEON」";
  // }, [viewEng]);

  const incompleteTitle = useMemo(() => {
    return viewEng
      ? "Why did you shutter?"
      : "「どうしてシャッターを切ったのか」";
  }, [viewEng]);

  const untitledTitle = useMemo(() => {
    return viewEng ? "Untitled." : "「無題」";
  }, [viewEng]);

  useEffect(() => {
    const handleScroll = () => {
      // ウィンドウのスクロール位置 + ビューポートの高さ
      const currentScroll = window.scrollY + window.innerHeight;
      // ドキュメントの全体の高さ
      const maxScroll = document.documentElement.scrollHeight;

      if (currentScroll + 300 >= maxScroll && !(posts.length < viewPosts + 1)) {
        setViewPosts((prev) => prev + 20);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [posts.length, viewPosts]);

  return (
    <>
      <HeaderComponent as="h2" icon textAlign="center">
        {/* トップページへのリンク */}
        <Element name="topPage" />
        <Image
          src="/mycatheader.jpg"
          alt="mycatheader"
          layout="responsive"
          width={1920} // 任意の幅 (例: 1920px)
          height={1080} // 任意の高さ (例: 1080px)
        />
        {/* <ImageComponent src="/mycatheader.jpg" alt="mycatheader" /> */}
        {/* vercelアナリティクス */}
        <Analytics />
        {/* プロフ画像 */}
        <AvatarSemanticImageComponent
          src="/profileImg.jpg"
          alt="profileImg"
          avatar
        />
        {/* タイトル */}
        <Header.Content>
          <p>KAKIKUKE KOICHI</p>
        </Header.Content>
      </HeaderComponent>
      <ContainerSelfIntroductionComponent text textAlign="center">
        {/* 日英切り替えボタン */}
        <TranslateButtonGroup setViewEng={setViewEng} viewEng={viewEng} />
        {/* プロフィール */}
        <Profile viewEng={viewEng} />
        {/* SNSリンク */}
        <SnsIcons />
      </ContainerSelfIntroductionComponent>
      <DividerMargin />
      {/* 写真集リンク */}
      <PageLink viewEng={viewEng} />
      <DividerMargin />
      {/* ポエム */}
      <VerticalPoemSwipe poems={poemPosts} viewEng={viewEng} />
      <DividerMargin />
      {/* 写真４枚 */}
      {/* <Flex flexDirection="column" gap="20px" mb="20px">
        <Text fontSize="20px" width="100%" textAlign="center" mb="0px">
          {fourPictureTitle}
        </Text>
        {slidePosts
          .filter((_, index) => index < viewSlidePosts)
          .map((post, index) => (
            <SlideImages key={index} post={post} />
          ))}
      </Flex> */}
      {/* {!(slidePosts.length < viewSlidePosts + 1) && (
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
      <DividerMargin /> */}
      {/* SIGMAの写真 */}
      {/* <Container>
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
                    src={`blogImages/1-${item.id}.png`}
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
      </Container> */}
      {/* 「どうしてシャッターを切ったのか」 */}
      {/* 「どうしてシャッターを切ったのか」へのスクロールリンク */}
      <Element name="incomplete" />
      <Container>
        <Grid>
          <ContainerCenter>
            <Text fontSize="20px" width="100%" textAlign="center">
              {incompleteTitle}
            </Text>
            <Text width="100%" textAlign="center">
              <div style={{ whiteSpace: "pre-line" }}>
                {viewEng
                  ? `"I want it to be this way."
                  I impose my own selfish ideals
                  I feel inadequate on my own.
                  Why am I attracted to things that bring out
                  I am somehow attracted to things that bring out my bad qualities.`
                  : `「こうあってほしい」
                自分勝手な理想を押し付けてしまう
                不十分さを勝手に感じてしまう
                そういった自分の嫌な性格を引き出すものに
                なぜか惹かれてしまう`}
              </div>
            </Text>
            <Grid.Row columns={1}>
              <MainPost
                posts={incompletePosts}
                viewEng={viewEng}
                setSelectedPhoto={setSelectedPhoto}
              />
            </Grid.Row>
          </ContainerCenter>
        </Grid>
      </Container>
      <DividerMargin />
      {/* 無題 */}
      {/* 無題へのスクロールリンク */}
      <Element name="untitled" />
      <Container id="untitled">
        <Grid>
          <ContainerCenter>
            <Text fontSize="20px" width="100%" textAlign="center">
              {untitledTitle}
            </Text>
            <Text width="100%" textAlign="center">
              <div style={{ whiteSpace: "pre-line" }}>
                {viewEng
                  ? `These are photos that I took because I was attracted to something.
                  I don't know what attracted me.`
                  : `なにかに惹かれてシャッターを切った写真たち。
                  どこに惹かれたのかはわかっていない。`}
              </div>
            </Text>
            <Grid.Row columns={1}>
              <MainPost
                posts={notSlidePosts}
                viewEng={viewEng}
                setSelectedPhoto={setSelectedPhoto}
              />
            </Grid.Row>
          </ContainerCenter>
        </Grid>
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

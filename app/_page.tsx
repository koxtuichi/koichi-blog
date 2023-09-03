"use client";

import { Post } from "@/notionApi/notion";
import React, { useMemo, useState } from "react";
import {
  Button,
  Container,
  Grid,
  Header,
  Image as SemanticImage,
} from "semantic-ui-react";
// semantic-uiはスタイルを含まないので以下のimportが必要
import "semantic-ui-css/semantic.min.css";

import { TranslateButtonGroup } from "@/component/TranslateButtonGroup";
import Profile from "@/component/home/profile";
import MainPost from "@/component/home/MainPost";
import SecondPost from "@/component/home/SecondPost";
import { Analytics } from "@vercel/analytics/react";
import {
  ContainerButtonCenter,
  ContainerCenter,
  ContainerFotune,
  ContainerSelfIntroductionComponent,
  DividerMargin,
  GridCentered,
} from "@/component/home/styledComponents";
import ModalImage from "@/component/home/ModalImage";
import TodaysFortune from "./_todaysFortune";
import SlideImages from "./_slideImages";
import { Flex, Text } from "@chakra-ui/react";
import SnsIcons from "./_snsIcons";

type HomeComponentProps = {
  posts: Post[];
};
const SIGMA_SELECT = "sigma";
const HomeComponent: React.FC<HomeComponentProps> = ({ posts }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Post | null>(null);
  const [viewEng, setViewEng] = useState<boolean>(false);
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
      <DividerMargin />
      {/* 今日の格言 */}
      <Container>
        <GridCentered centered>
          <ContainerFotune>
            <TodaysFortune isEng={viewEng} />
          </ContainerFotune>
        </GridCentered>
      </Container>
      <DividerMargin />
      {/* 写真４枚 */}

      <Flex flexDirection="column" gap="20px" mb="20px">
        <Text fontSize="20px" width="100%" textAlign="center" mb='0px'>
          「４枚で伝えたいこと」
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
            onClick={() => setViewSlidePosts((prev) => prev + 3)}
          >
            もっとみる
          </Button>
        </ContainerButtonCenter>
      )}
      <DividerMargin />
      {/* SIGMAの写真 */}
      <Container>
        <ContainerCenter>
          <Text fontSize="20px" width="100%" textAlign="center">
            「これがFOVEON」
          </Text>
          <Flex flexDirection='column' gap='20px'>
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
              もっとみる
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
              「写真日和」
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
              onClick={() => setViewPosts((prev) => prev + 6)}
            >
              もっとみる
            </Button>
            <div style={{ height: "20px" }} />
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

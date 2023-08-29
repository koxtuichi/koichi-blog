"use client";

import { Post } from "@/notionApi/notion";
import React, { useMemo, useState } from "react";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
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
import { Flex } from "@chakra-ui/react";

type HomeComponentProps = {
  posts: Post[];
};
const SIGMA_SELECT = "sigma";
const HomeComponent: React.FC<HomeComponentProps> = ({ posts }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Post | null>(null);
  const [viewEng, setViewEng] = useState<boolean>(false);
  const [viewPosts, setViewPosts] = useState<number>(4);
  const [viewSlidePosts, setViewSlidePosts] = useState<number>(2);
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
        <Analytics />
        <Image src="/profileImg.jpg" alt="profileImg" avatar />
        <Header.Content>
          <p>KAKIKUKE KOICHI</p>
        </Header.Content>
      </Header>
      <ContainerSelfIntroductionComponent text textAlign="center">
        <TranslateButtonGroup setViewEng={setViewEng} viewEng={viewEng} />
        <Profile viewEng={viewEng} />
        <Grid centered>
          <Grid.Row>
            <Icon
              name="instagram"
              size="big"
              link
              onClick={() =>
                window.open(
                  "https://www.instagram.com/kakikuke_koichi/",
                  "_blank"
                )
              }
            />
            <p style={{ lineHeight: 2 }}>since 2023/2</p>
          </Grid.Row>
        </Grid>
      </ContainerSelfIntroductionComponent>
      <DividerMargin />
      <Container>
        <GridCentered centered>
          <ContainerFotune>
            <TodaysFortune isEng={viewEng} />
          </ContainerFotune>
        </GridCentered>
      </Container>
      <DividerMargin />
      <Flex flexDirection="column" gap="20px" mb="20px">
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
      <Container>
        <ContainerCenter>
          {sigmaPosts
            .filter((_, index) => index < 2)
            .map((item) => {
              return <Image src={item.url} />;
            })}
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
      <Container>
        <Grid>
          <ContainerCenter>
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

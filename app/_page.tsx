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
import useAi from "@/openAiApi/logic";
import {
  ContainerCenter,
  ContainerFotune,
  ContainerSelfIntroductionComponent,
  GridCentered,
} from "@/component/home/styledComponents";
import ModalImage from "@/component/home/ModalImage";
import TodaysFortune from "./_todaysFortune";
import SlideImages from "./_slideImages";

type HomeComponentProps = {
  posts: Post[];
};
const HomeComponent: React.FC<HomeComponentProps> = ({ posts }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Post | null>(null);
  const [viewEng, setViewEng] = useState<boolean>(false);
  const [viewPosts, setViewPosts] = useState<number>(8);
  const [viewSlidePosts, setViewSlidePosts] = useState<number>(3);

  const slidePosts = useMemo(() => {
    const filtered = posts.filter(
      (post) => post.url2 && post.url3 && post.url4
    );
    return filtered;
  }, [posts]);

  return (
    <>
      <Header as="h2" icon textAlign="center">
        <Analytics />
        <Image src="/profileImg.png" alt="profileImg" avatar />
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
      <Divider />
      <Container>
        <GridCentered centered>
          <ContainerFotune>
            <TodaysFortune isEng={viewEng} />
          </ContainerFotune>
        </GridCentered>
      </Container>
      <Divider />
      {slidePosts
        .filter((_, index) => index < viewSlidePosts)
        .map((post, index) => (
          <SlideImages key={index} post={post} />
        ))}
      {!(slidePosts.length < viewSlidePosts + 1) && (
        <ContainerCenter>
          <Button onClick={() => setViewSlidePosts((prev) => prev + 3)}>
            もっとみる
          </Button>
        </ContainerCenter>
      )}
      <Divider />
      <Container>
        <Grid>
          <ContainerCenter>
            <Grid.Row columns={1}>
              <MainPost
                posts={posts.filter(
                  (post) => !post.url2 && !post.url3 && !post.url4
                )}
                viewEng={viewEng}
                setSelectedPhoto={setSelectedPhoto}
              />
            </Grid.Row>
          </ContainerCenter>
          <Grid.Row columns={2}>
            <SecondPost
              posts={posts.filter((post, index) => {
                const isPost = !post.url2 && !post.url3 && !post.url4;
                const isViewPost = index < viewPosts;
                return isPost && isViewPost;
              })}
              viewEng={viewEng}
              setSelectedPhoto={setSelectedPhoto}
            />
            {!(posts.length < viewPosts + 1) && (
              <ContainerCenter>
                <Button onClick={() => setViewPosts((prev) => prev + 6)}>
                  もっとみる
                </Button>
              </ContainerCenter>
            )}
          </Grid.Row>
        </Grid>
      </Container>
      <Divider />
      <ModalImage
        selectedPhoto={selectedPhoto}
        setSelectedPhoto={setSelectedPhoto}
        viewEng={viewEng}
      />
    </>
  );
};

export default HomeComponent;

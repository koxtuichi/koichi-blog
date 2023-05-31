import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Post, getPageDatas } from "@/notionApi/notion";
import React, { useState } from "react";
import {
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
} from "semantic-ui-react";
// semantic-uiはスタイルを含まないので以下のimportが必要
import "semantic-ui-css/semantic.min.css";
import {
  ContainerCenter,
  ContainerSelfIntroductionComponent,
  DividerNoneMarginBottom,
  TagLabel,
} from "../../component/home/styledComponents";
import { TranslateButtonGroup } from "@/component/TranslateButtonGroup";
import Profile from "@/component/home/profile";
import MainPost from "@/component/home/MainPost";
import SecondPost from "@/component/home/SecondPost";
import ModalImage from "@/component/home/ModalImage";
import SiteExplain from "@/component/home/SiteExplain";

export const getServerSideProps: GetServerSideProps<{
  posts: Post[];
}> = async (context) => {
  const posts = await getPageDatas();
  return {
    props: {
      posts: posts || [],
    },
  };
};

const Home = ({
  posts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Post | null>(null);
  const [viewEng, setViewEng] = useState<boolean>(false);

  return (
    <>
      <Header as="h2" icon textAlign="center">
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
          <DividerNoneMarginBottom />
          <SiteExplain viewEng={viewEng} />
        </Grid>
      </ContainerSelfIntroductionComponent>
      <Divider />
      <Container>
        <Grid>
          <ContainerCenter>
            <Grid.Row columns={1}>
              <MainPost
                posts={posts}
                viewEng={viewEng}
                setSelectedPhoto={setSelectedPhoto}
              />
            </Grid.Row>
          </ContainerCenter>
          <Grid.Row columns={2}>
            <SecondPost
              posts={posts}
              viewEng={viewEng}
              setSelectedPhoto={setSelectedPhoto}
            />
          </Grid.Row>
        </Grid>
      </Container>
      <ModalImage
        selectedPhoto={selectedPhoto}
        setSelectedPhoto={setSelectedPhoto}
        viewEng={viewEng}
      />
    </>
  );
};

export default Home;

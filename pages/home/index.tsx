import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Post, getPageDatas } from "@/notionApi/notion";
import React, { useState } from "react";
import {
  Button,
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Input,
} from "semantic-ui-react";
// semantic-uiはスタイルを含まないので以下のimportが必要
import "semantic-ui-css/semantic.min.css";
import {
  ContainerCenter,
  ContainerSelfIntroductionComponent,
  DividerNoneMarginBottom,
} from "../../component/home/styledComponents";
import { TranslateButtonGroup } from "@/component/TranslateButtonGroup";
import Profile from "@/component/home/profile";
import MainPost from "@/component/home/MainPost";
import SecondPost from "@/component/home/SecondPost";
import ModalImage from "@/component/home/ModalImage";
import SiteExplain from "@/component/home/SiteExplain";
import { Analytics } from "@vercel/analytics/react";
import useAi from "../../openAiApi/logic";

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
  const { handleSubmit, response, setPrompt, loading, prompt } = useAi();
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
          <DividerNoneMarginBottom />
          <SiteExplain viewEng={viewEng} />
        </Grid>
      </ContainerSelfIntroductionComponent>
      <Divider />
      <Container>
        <Form onSubmit={handleSubmit}>
          <Grid centered>
            <ContainerCenter>
              <p style={{ marginBottom: "8p" }}>
                どんな写真が撮りたいですか？
                <br />
                「お花」や「カフェ」などの撮りたいモノの名前を10文字以内で入れてみてください。
                <br />
                関東でおすすめのスポットをAIが探してくれます。
              </p>
              <div style={{ display: "flex", justifyContent: 'center', maxHeight: "36px" }}>
                <Input
                  type="input"
                  name="searchWord"
                  onChange={(e) => setPrompt(e.target.value)}
                  value={prompt}
                  loading={loading}
                  maxLength={10}
                />
                <Button type="submit" disabled={loading || !prompt}>
                  探す
                </Button>
                {0 < response.split(",").length && (
                  <>
                    {response.split(",").map((item, index) => (
                      <p key={index} style={{ marginTop: "8px" }}>
                        {item}
                      </p>
                    ))}
                  </>
                )}
              </div>
            </ContainerCenter>
          </Grid>
        </Form>
      </Container>
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
      <Divider />
      <ModalImage
        selectedPhoto={selectedPhoto}
        setSelectedPhoto={setSelectedPhoto}
        viewEng={viewEng}
      />
    </>
  );
};

export default Home;

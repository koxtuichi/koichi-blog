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
} from "../../component/home/styledComponents";
import { TranslateButtonGroup } from "@/component/TranslateButtonGroup";
import Profile from "@/component/home/profile";
import MainPost from "@/component/home/MainPost";
import SecondPost from "@/component/home/SecondPost";
import ModalImage from "@/component/home/ModalImage";
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
        </Grid>
      </ContainerSelfIntroductionComponent>
      <Divider />
      <Container>
        <Form onSubmit={handleSubmit}>
          <Grid centered>
            <ContainerCenter>
              <p style={{ marginBottom: "8p" }}>
                あなたに関連する数字を入力してください。
                <br />
                たとえば電話番号や、生年月日など。
                <br />
                運気の上がる（当社比）撮影スポットをAIが探してくれます。
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  maxHeight: "36px",
                }}
              >
                <Input
                  type="number"
                  name="searchWord"
                  onChange={(e) => setPrompt(e.target.value)}
                  value={prompt}
                  loading={loading}
                  maxLength={15}
                  disabled={loading}
                />
                <Button type="submit" disabled={loading || !prompt}>
                  探す
                </Button>
              </div>
              {0 < response.split(",").length && (
                <>
                  {response.split(",").map((item, index) => (
                    <p key={index} style={{ marginTop: "8px", whiteSpace: 'pre-line' }}>
                      {item}
                    </p>
                  ))}
                </>
              )}
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

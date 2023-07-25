import {
  GetServerSideProps,
  GetStaticProps,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from "next";
import { Post, getPageDatas } from "@/notionApi/notion";
import React, { useEffect, useState } from "react";
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
import ModalText from "@/component/home/ModalText";

type Cache = {
  timestamp: number;
  posts: Post[];
};

type Caches = {
  [key in string]: Cache;
};

const cache: Caches = {};

export const getStaticProps: GetStaticProps<{
  posts: Post[];
}> = async (context) => {
  const cacheKey = "datakey";
  const cacheDuration = 10;
  if (
    cache[cacheKey] &&
    cache[cacheKey].timestamp + cacheDuration > Date.now()
  ) {
    return {
      props: {
        posts: cache[cacheKey]?.posts || [],
      },
    };
  }
  try {
    const posts = await getPageDatas();
    cache[cacheKey] = {
      timestamp: Date.now(),
      posts,
    };
    return {
      props: {
        posts: posts,
      },
    };
  } catch (e) {
    return {
      props: {
        posts: [],
      },
    };
  }
};

const Home = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Post | null>(null);
  const [viewEng, setViewEng] = useState<boolean>(false);
  const {
    handleSubmit,
    setResponse,
    response,
    setPrompt,
    problem,
    setProblem,
    loading,
    prompt,
  } = useAi(viewEng);

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
              {/* <p style={{ marginBottom: "8p" }}>
                {viewEng
                  ? "Please Enter any number you like."
                  : "あなたが好きな数字を入力してください。"}
                <br />
                {viewEng
                  ? "For example, phone number, date of birth, etc."
                  : "たとえば電話番号や、生年月日など。"}
                <br />
                {viewEng
                  ? "A slightly annoying AI will search for photo spots that will bring you luck if you go there today."
                  : "今日いけば運気が上がる撮影スポットを少しウザいAIが探してくれます。"}
              </p> */}
              <p>AIの励まし 開発中</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  // maxHeight: "36px",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <div style={{ width: '100px', textAlign: 'right' }}>好きな数字</div>
                    <Input
                      type="number"
                      name="searchWord"
                      onChange={(e) => setPrompt(e.target.value)}
                      value={prompt}
                      loading={loading}
                      maxLength={15}
                      disabled={loading}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <div style={{ width: '100px', textAlign: 'right' }}>悩み</div>
                    <Input
                      type="input"
                      name="problem"
                      onChange={(e) => setProblem(e.target.value)}
                      value={problem}
                      loading={loading}
                      disabled={loading}
                    />
                  </div>
                </div>
                <Button type="submit" disabled={loading || !prompt}>
                  {viewEng ? "search" : "聞く"}
                </Button>
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
      <ModalText
        open={!!response}
        setResponse={setResponse}
        response={response}
        posts={posts}
      />
      {/* <ModalImage
        selectedPhoto={selectedPhoto}
        setSelectedPhoto={setSelectedPhoto}
        viewEng={viewEng}
      /> */}
    </>
  );
};

export default Home;

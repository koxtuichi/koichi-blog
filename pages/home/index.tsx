import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Post, getPageDatas } from "@/lib/util/notion";
import React, { useState } from "react";
import {
  Card,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Modal,
} from "semantic-ui-react";
// semantic-uiはスタイルを含まないので以下のimportが必要
import "semantic-ui-css/semantic.min.css";
import {
  ContainerSelfIntroductionComponent,
  ImageComponent,
} from "../../styles/homeStyles";

export const getServerSideProps: GetServerSideProps<{ posts: Post[] }> = async (
  context
) => {
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
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);
  return (
    <>
      <Header as="h2" icon textAlign="center">
        <Image src="/profileImg.png" avatar />
        <Header.Content>
          <p>KAKIKUKE KOICHI</p>
        </Header.Content>
      </Header>
      <ContainerSelfIntroductionComponent text textAlign="center">
        <p>
          1992/9/14生まれ。数年前からカメラは買ってきたが、すぐに飽きてしまい売却してしまうことを数回繰り返す。そのときに手放したカメラはdp2,
          dp2x, dp2s, dp2quattro,
          dp0quattroのSIGMAたち。またfoveon使いたいなとも思うけど、とりあえず今は使いやすいSIGMA
          fpを使用中。
        </p>
        <p>
          レンズはSteinheil MunchenのCassaron 40mm
          f3.5。flickrでそのときメインで使っていた GXR
          を検索していたところ、このレンズを使用していた写真があって気に入り、
          #cassaron
          でflickrを検索して画像を見漁った結果、即購入。つい最近、二代目を購入した。
        </p>
        <p>
          そのため、カメラはSIGMA
          fpとcassaron40mmのみ使用してる。ここに上げてる写真すべて。
        </p>
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
        <Grid divided="vertically">
          <Grid.Row columns={2}>
            {posts.sort((a, b) => {
                const dateA = new Date(a.updatedAt.replace(/-/g, '/'));
                const dateB = new Date(b.updatedAt.replace(/-/g, '/'));
                return dateB.getTime() - dateA.getTime();
              })
              .map((post, index) => {
                return (
                  <Grid.Column key={index}>
                    <ImageComponent
                      src={post.url}
                      wrapped
                      ui={false}
                      onClick={() => setSelectedPhoto(post)}
                    />
                    <Card.Content>
                      <Card.Header>{post.title}</Card.Header>
                      <Card.Meta>
                        <span>{post.shootingDate}</span>
                      </Card.Meta>
                      <Card.Description>{post.description}</Card.Description>
                    </Card.Content>
                  </Grid.Column>
                );
              })}
          </Grid.Row>
        </Grid>
      </Container>
      <Modal
        open={!!selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        closeIcon
        size="fullscreen"
        centered={true}
        basic
      >
        <Modal.Content image>
          <Image
            src={selectedPhoto && selectedPhoto.url}
            onClick={() => setSelectedPhoto(null)}
            fluid
          />
        </Modal.Content>
      </Modal>
    </>
  );
};

export default Home;

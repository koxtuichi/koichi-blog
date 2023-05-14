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
import { ImageComponent } from "./styles/index";

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
          <p>KAKUKIKE KOICHI</p>
        </Header.Content>
      </Header>
      <Container text textAlign="center">
        <p>1992/9/14</p>
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
      </Container>
      <Divider />
      <Container>
        <Grid divided="vertically">
          <Grid.Row columns={2}>
            {posts
              .sort((a, b) => b.updatedAt - a.updatedAt)
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
                        <span className="date">{post.updatedAt}</span>
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
        centered={false}
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

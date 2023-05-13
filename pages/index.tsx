import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Post, getPageDatas } from "@/lib/util/notion";
import Head from "next/head";
import React, { useState } from "react";
import Link from "next/link";
import { Dialog, DialogContent } from "@material-ui/core";
import { Grid } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import { Card, Container, Image, Divider } from "semantic-ui-react";
import { Header, Icon } from "semantic-ui-react";
// semantic-uiはスタイルを含まないので以下のimportが必要
import "semantic-ui-css/semantic.min.css";

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

const Index = ({
  posts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [useSelectedPhoto, useSetelectPhoto] = useState<any>(null);
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
        <p>since 2023/2</p>
      </Container>
      <Divider />
      <Container>
        <Grid divided="vertically">
          <Grid.Row columns={2}>
            {posts
              .sort((a, b) => b.updatedAt - a.updatedAt)
              .map((post, index) => {
                return (
                  <Grid.Column>
                    <Image
                      src={post.url}
                      wrapped
                      ui={false}
                      onClick={() => useSetelectPhoto(post)}
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
      <Dialog
        open={!!useSelectedPhoto}
        onClose={() => useSetelectPhoto(null)}
        PaperProps={{ style: { padding: 4 } }}
      >
        <DialogContent
          style={{ padding: 0, overflowY: "hidden", width: "100%" }}
        >
          <Image
            src={useSelectedPhoto && useSelectedPhoto.url}
            wrapped
            ui={false}
            onClick={() => useSetelectPhoto(null)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
export default Index;

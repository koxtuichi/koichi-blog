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
  Button,
} from "semantic-ui-react";
// semantic-uiはスタイルを含まないので以下のimportが必要
import "semantic-ui-css/semantic.min.css";
import {
  ContainerCenter,
  ContainerSelfIntroductionComponent,
  GridImageComponent,
  ImageComponent,
} from "../../styles/homeStyles";
import { TranslateButtonGroup } from "@/lib/component/TranslateButtonGroup";

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
  const [viewEng, setViewEng] = useState<boolean>(false);
  return (
    <>
      <Header as="h2" icon textAlign="center">
        <Image src="/profileImg.png" avatar />
        <Header.Content>
          <p>KAKIKUKE KOICHI</p>
        </Header.Content>
      </Header>
      <ContainerSelfIntroductionComponent text textAlign="center">
        <TranslateButtonGroup setViewEng={setViewEng} viewEng={viewEng} />
        {!viewEng && (
          <>
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
          </>
        )}
        {viewEng && (
          <>
            <p>
              Born on 9/14/1992. I have been buying cameras for a few years, but
              I have repeated several times that I get bored quickly and sell
              them. The cameras I gave away at that time were dp2, dp2x, dp2s,
              dp2quattro, dp0quattro SIGMAs. I would like to use foveon again,
              but for now I am using SIGMA fp which is easy to use.
            </p>
            <p>
              I was searching on flickr for the GXR I was using as my main lens
              at the time, and I saw a picture of me using this lens, which I
              liked, so I searched #cassaron on flickr and looked through the
              images and bought it immediately. Just recently, I bought a second
              generation.
            </p>
            <p>
              That&apos;s why I use only SIGMA fp and cassaron 40mm camera. All the
              photos I put up here.
            </p>
          </>
        )}
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
        <Grid>
          <ContainerCenter>
            <Grid.Row columns={1}>
              {posts
                .sort((a, b) => {
                  const dateA = new Date(a.updatedAt.replace(/-/g, "/"));
                  const dateB = new Date(b.updatedAt.replace(/-/g, "/"));
                  return dateB.getTime() - dateA.getTime();
                })
                .map((post, index) => {
                  if (index === 0) {
                    return (
                      <Grid.Column key={index}>
                        <ImageComponent
                          src={post.url}
                          wrapped
                          ui={false}
                          onClick={() => setSelectedPhoto(post)}
                        />
                        <Card.Content>
                          <Card.Header>
                            {!viewEng ? post.title : post.titleEng}
                          </Card.Header>
                          <Card.Meta>
                            <Icon name="camera retro" />
                            <span>{post.shootingDate}</span>
                          </Card.Meta>
                          <Card.Description>
                            {!viewEng ? post.description : post.eng}
                          </Card.Description>
                        </Card.Content>
                      </Grid.Column>
                    );
                  }
                })}
            </Grid.Row>
          </ContainerCenter>
          <Grid.Row columns={2}>
            {posts
              .sort((a, b) => {
                const dateA = new Date(a.updatedAt.replace(/-/g, "/"));
                const dateB = new Date(b.updatedAt.replace(/-/g, "/"));
                return dateB.getTime() - dateA.getTime();
              })
              .map((post, index) => {
                if (index === 0) {
                  return;
                }
                return (
                  <GridImageComponent key={index}>
                    <ImageComponent
                      src={post.url}
                      wrapped
                      ui={false}
                      onClick={() => setSelectedPhoto(post)}
                    />
                    <Card.Content>
                      <Card.Header>
                        {!viewEng ? post.title : post.titleEng}
                      </Card.Header>
                      <Card.Meta>
                        <Icon name="camera retro" />
                        <span>{post.shootingDate}</span>
                      </Card.Meta>
                      <Card.Description>
                        {!viewEng ? post.description : post.eng}
                      </Card.Description>
                    </Card.Content>
                  </GridImageComponent>
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

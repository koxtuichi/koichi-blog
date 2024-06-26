import { Post } from "@/notionApi/notion";
import React from "react";
import { Card } from "semantic-ui-react";
import { GridImageComponent, TagLabel } from "./styledComponents";
import styled from "@emotion/styled";

import { Image } from "@chakra-ui/react";

const ContainerContent = styled(Card.Content)({
  whiteSpace: "break-spaces",
});

type MainPostProps = {
  posts: Post[];
  viewEng: boolean;
  setSelectedPhoto: React.Dispatch<React.SetStateAction<Post | null>>;
};
const MainPost: React.FC<MainPostProps> = ({ posts, setSelectedPhoto }) => {
  return (
    <>
      {posts
        .sort((a, b) => {
          const dateA = new Date(a.updatedAt.replace(/-/g, "/"));
          const dateB = new Date(b.updatedAt.replace(/-/g, "/"));
          return dateB.getTime() - dateA.getTime();
        })
        .map((post, index) => {
          return (
            <GridImageComponent key={index}>
              <Image
                src={`blogImages/1-${post.id}.png`}
                onClick={() => setSelectedPhoto(post)}
                w="100%"
                borderRadius={4}
                alt="main post image"
              />
              <ContainerContent>
                <Card.Header>
                  {post.link && (
                    <TagLabel
                      as="a"
                      color="black"
                      tag
                      size="mini"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={post.link}
                    >
                      {/* <Icon name="shop" /> */}
                      SHOP
                    </TagLabel>
                  )}
                </Card.Header>
                {/* <Card.Meta>
                  <Icon name="camera retro" />
                  <span>{post.shootingDate}</span>
                </Card.Meta> */}
                {/* <Card.Description>
                  <SpeakButton
                    text={viewEng ? post.engDescription : post.description}
                    viewEng={viewEng}
                    speechFile={
                      viewEng
                        ? post.engSpeechDescription
                        : post.jpnSpeechDescription
                    }
                  />
                  {!viewEng ? post.jpnDescription : post.engDescription}
                </Card.Description> */}
              </ContainerContent>
            </GridImageComponent>
          );
        })}
    </>
  );
};

export default MainPost;

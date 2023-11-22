import { Post } from "@/notionApi/notion";
import React from "react";
import { Card, Icon } from "semantic-ui-react";
import SpeakButton from "./SpeakButton";
import { GridImageComponent, TagLabel } from "./styledComponents";
import styled from "@emotion/styled";

import { Image } from "@chakra-ui/react";

const ContainerContent = styled(Card.Content)({
  maxWidth: "960px",
});

type MainPostProps = {
  posts: Post[];
  viewEng: boolean;
  setSelectedPhoto: React.Dispatch<React.SetStateAction<Post | null>>;
};
const MainPost: React.FC<MainPostProps> = ({
  posts,
  viewEng,
  setSelectedPhoto,
}) => {
  return (
    <>
      {posts
        .sort((a, b) => {
          const dateA = new Date(a.updatedAt.replace(/-/g, "/"));
          const dateB = new Date(b.updatedAt.replace(/-/g, "/"));
          return dateB.getTime() - dateA.getTime();
        })
        .map((post, index) => {
          if (index === 0) {
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
                    {!viewEng ? post.title : post.titleEng}
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
                  <Card.Meta>
                    <Icon name="camera retro" />
                    <span>{post.shootingDate}</span>
                  </Card.Meta>
                  <Card.Description>
                    <SpeakButton
                      text={viewEng ? post.eng : post.description}
                      viewEng={viewEng}
                      speechFile={
                        viewEng
                          ? post.speechDescriptionEng
                          : post.speechDescriptionJpn
                      }
                    />
                    {!viewEng ? post.description : post.eng}
                  </Card.Description>
                </ContainerContent>
              </GridImageComponent>
            );
          }
        })}
    </>
  );
};

export default MainPost;

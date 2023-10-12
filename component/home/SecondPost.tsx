import { Post } from "@/notionApi/notion";
import React from "react";
import { Card, Icon } from "semantic-ui-react";
import SpeakButton from "./SpeakButton";
import { GridImageComponent, TagLabel } from "./styledComponents";

import { Image } from "@chakra-ui/react";

type SecondPostProps = {
  posts: Post[];
  viewEng: boolean;
  setSelectedPhoto: React.Dispatch<React.SetStateAction<Post | null>>;
};
const SecondPost: React.FC<SecondPostProps> = ({
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
            return null;
          }
          return (
            <GridImageComponent key={index}>
              <Image
                src={post.url}
                onClick={() => setSelectedPhoto(post)}
                borderRadius={4}
                alt="second post image"
              />
              <Card.Content>
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
                      {/* <Icon name="shop" size="mini" /> */}
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
              </Card.Content>
            </GridImageComponent>
          );
        })}
    </>
  );
};

export default SecondPost;

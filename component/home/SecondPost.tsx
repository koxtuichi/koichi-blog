import { Post } from "@/notionApi/notion";
import React from "react";
import { Card } from "semantic-ui-react";
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
                src={`blogImages/1-${post.id}.png`}
                onClick={() => setSelectedPhoto(post)}
                borderRadius={4}
                alt="second post image"
              />
              <Card.Content>
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
                      {/* <Icon name="shop" size="mini" /> */}
                      SHOP
                    </TagLabel>
                  )}
                </Card.Header>
                {/* <Card.Meta>
                  <Icon name="camera retro" />
                  <span>{post.shootingDate}</span>
                </Card.Meta> */}
                <Card.Description>
                  {/* <SpeakButton
                    text={viewEng ? post.engDescription : post.description}
                    viewEng={viewEng}
                    speechFile={
                      viewEng
                        ? post.engSpeechDescription
                        : post.jpnSpeechDescription
                    }
                  /> */}
                  {!viewEng ? post.description : post.engDescription}
                </Card.Description>
              </Card.Content>
            </GridImageComponent>
          );
        })}
    </>
  );
};

export default SecondPost;

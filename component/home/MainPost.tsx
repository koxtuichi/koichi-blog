import { Post } from "@/notionApi/notion";
import React from "react";
import { Card, Icon } from "semantic-ui-react";
import SpeakButton from "./SpeakButton";
import {
  GridImageComponent,
  ImageComponent,
  TagLabel,
} from "./styledComponents";

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
                <ImageComponent
                  src={post.url}
                  size="huge"
                  ui={true}
                  onClick={() => setSelectedPhoto(post)}
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
                    />
                    {!viewEng ? post.description : post.eng}
                  </Card.Description>
                </Card.Content>
              </GridImageComponent>
            );
          }
        })}
    </>
  );
};

export default MainPost;

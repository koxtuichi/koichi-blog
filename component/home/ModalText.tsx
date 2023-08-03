import { Post } from "@/notionApi/notion";
import styled from "@emotion/styled";
import React from "react";
import { Modal } from "semantic-ui-react";
import { ImageComponent } from "./styledComponents";

const ModalComponent = styled(Modal)({
  background: "rgba(50, 50, 50, 0.5) !important",
  borderRadius: "2px",
  width: "100% !important",
  transform: "translateY(-28px)",
  padding: "20px 0 20px 0",
});

const ModalContent = styled(Modal.Content)({
  width: "100% !important",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const ModalContentColumn = styled(Modal.Content)({
  display: "flex",
  flexDirection: "column",
});

const ModalDescription = styled(Modal.Description)({
  whiteSpace: "pre-wrap",
  padding: "10px",
  maxWidth: "500px",
});

type ModalTextProps = {
  open: boolean;
  setResponse: React.Dispatch<React.SetStateAction<string>>;
  response: string;
  posts: Post[];
};
const ModalText: React.FC<ModalTextProps> = ({
  open,
  setResponse,
  response,
  posts,
}) => {
  const getRandomPost = (posts: Post[]): Post => {
    const randomIndex = Math.floor(Math.random() * posts.length);
    return posts[randomIndex];
  }
  return (
    <ModalComponent
      open={open}
      onClose={() => setResponse("")}
      size="large"
      basic
      closeIcon='window close'
    >
      <ModalContent image>
        <ModalContentColumn>
          <ModalDescription>
            {response}
          </ModalDescription>
        </ModalContentColumn>
      </ModalContent>
      <ModalContent image>
        <ImageComponent
          // src={`blogImages/${getRandomPost(posts).id}.png`}
          src={getRandomPost(posts).url}
          size='huge'
        />
      </ModalContent>
    </ModalComponent>
  );
};

export default ModalText;

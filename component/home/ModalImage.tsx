import { Post } from "@/notionApi/notion";
import styled from "@emotion/styled";
import React from "react";
import { Image, Modal, Container } from "semantic-ui-react";

const ModalDescription = styled(Modal.Description)({
  whiteSpace: "pre-wrap",
  padding: "10px",
  minWidth: "120px !important",
  maxWidth: "400px !important",
});

type ModalImageProps = {
  selectedPhoto: Post | null;
  setSelectedPhoto: React.Dispatch<React.SetStateAction<Post | null>>;
};
const ModalImage: React.FC<ModalImageProps> = ({
  selectedPhoto,
  setSelectedPhoto,
}) => {
  return (
    <Modal
      open={!!selectedPhoto}
      onClose={() => setSelectedPhoto(null)}
      size="small"
      centered={true}
      basic
    >
      <Modal.Content image>
        <Image
          src={selectedPhoto && selectedPhoto.url}
          onClick={() => setSelectedPhoto(null)}
          fluid
          size={
            selectedPhoto?.keywords && selectedPhoto?.explanation
              ? "medium"
              : "huge"
          }
        />
        {selectedPhoto?.keywords && (
          <ModalDescription>
            <p>キーワード</p>
            <p>{selectedPhoto?.keywords}</p>
          </ModalDescription>
        )}
        {selectedPhoto?.explanation && (
          <ModalDescription>
            <p>解説</p>
            <p>{selectedPhoto?.explanation}</p>
          </ModalDescription>
        )}
      </Modal.Content>
    </Modal>
  );
};

export default ModalImage;

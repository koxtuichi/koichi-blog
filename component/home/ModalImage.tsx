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
  viewEng: boolean;
};
const ModalImage: React.FC<ModalImageProps> = ({
  selectedPhoto,
  setSelectedPhoto,
  viewEng,
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
          <ModalDescription onClick={() => setSelectedPhoto(null)}>
            <p>{viewEng ? "KEYWORDS" : "キーワード"}</p>
            <p>
              {viewEng ? selectedPhoto?.keywordsEng : selectedPhoto?.keywords}
            </p>
          </ModalDescription>
        )}
        {selectedPhoto?.explanation && (
          <ModalDescription onClick={() => setSelectedPhoto(null)}>
            <p>{viewEng ? "EXPLANATION" : "解説"}</p>
            <p>
              {viewEng
                ? selectedPhoto?.explanationEng
                : selectedPhoto?.explanation}
            </p>
          </ModalDescription>
        )}
      </Modal.Content>
    </Modal>
  );
};

export default ModalImage;

import { Post } from "@/notionApi/notion";
import styled from "@emotion/styled";
import React from "react";
import { Image, Modal } from "semantic-ui-react";

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

const ImageComponent = styled(Image)({
  objectFit: "contain",
  marginRight: "10px",
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
    <ModalComponent
      open={!!selectedPhoto}
      onClose={() => setSelectedPhoto(null)}
      size="large"
      basic
    >
      {!!selectedPhoto && (
        <ModalContent image onClick={() => setSelectedPhoto(null)}>
          <ImageComponent
            src={`blogImages/1-${selectedPhoto?.id}.png`}
            onClick={() => setSelectedPhoto(null)}
            size="massive"
            alt="blogImage"
          />
          <div
            style={{
              whiteSpace: "break-spaces",
              maxWidth: "500px",
            }}
          >
            {viewEng
              ? selectedPhoto.engDescription
              : selectedPhoto.jpnDescription}
          </div>
        </ModalContent>
      )}
    </ModalComponent>
  );
};

export default ModalImage;

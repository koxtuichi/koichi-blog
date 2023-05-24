import { Post } from "@/notionApi/notion";
import React from "react";
import { Image, Modal } from "semantic-ui-react";

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
  );
};

export default ModalImage;

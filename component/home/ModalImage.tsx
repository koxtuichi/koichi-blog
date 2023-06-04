import { Post } from "@/notionApi/notion";
import styled from "@emotion/styled";
import React from "react";
import { Image, Modal, Header } from "semantic-ui-react";

const ModalContent = styled(Modal.Content)({
  display: "flex",
  flexDirection: "column",
});

const ModalDescription = styled(Modal.Description)({
  whiteSpace: "pre-wrap",
  padding: "10px",
});

const ImageContain = styled(Image)({
  objectFit: "contain",
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
  const getKeyWords = (keywords: string) => {
    const results = keywords
      .split("\n") // 改行で文字列を分割
      .map((line) => `「${line.trim()}」`) // 各行の前後の空白を削除し、「」かっこを付ける
      .join("");
    return results;
  };
  const getExplanation = (explanation: string) => {
    return explanation.split("\n").map((item) => <p>{item}</p>);
  };

  return (
    <Modal
      open={!!selectedPhoto}
      onClose={() => setSelectedPhoto(null)}
      size="large"
      centered={true}
      basic
    >
      <Modal.Content image>
        <ImageContain
          src={selectedPhoto && selectedPhoto.url}
          onClick={() => setSelectedPhoto(null)}
          size={
            selectedPhoto?.keywords && selectedPhoto?.explanation
              ? "large"
              : "huge"
          }
        />
        <ModalContent>
          {selectedPhoto?.keywords && (
            <ModalDescription onClick={() => setSelectedPhoto(null)}>
              <p>{viewEng ? "KEYWORDS" : "キーワード"}</p>
              <p>
                {viewEng
                  ? getKeyWords(selectedPhoto?.keywordsEng)
                  : getKeyWords(selectedPhoto?.keywords)}
              </p>
            </ModalDescription>
          )}
          {selectedPhoto?.explanation && (
            <ModalDescription onClick={() => setSelectedPhoto(null)}>
              <p>{viewEng ? "EXPLANATION" : "解説"}</p>
              <p>
                {viewEng
                  ? getExplanation(selectedPhoto?.explanationEng)
                  : getExplanation(selectedPhoto?.explanation)}
              </p>
            </ModalDescription>
          )}
        </ModalContent>
      </Modal.Content>
    </Modal>
  );
};

export default ModalImage;

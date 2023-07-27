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

const ModalContentColumn = styled(Modal.Content)({
  display: "flex",
  flexDirection: "column",
});

const ModalDescription = styled(Modal.Description)({
  whiteSpace: "pre-wrap",
  padding: "10px",
  maxWidth: "500px",
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
    <ModalComponent
      open={!!selectedPhoto}
      onClose={() => setSelectedPhoto(null)}
      size="large"
      basic
    >
      <ModalContent image onClick={() => setSelectedPhoto(null)}>
        <ImageComponent
          src={selectedPhoto && selectedPhoto.url}
          onClick={() => setSelectedPhoto(null)}
          size="massive"
        />
        {/* <ModalContentColumn>
          {selectedPhoto?.keywords && (
            <ModalDescription onClick={() => setSelectedPhoto(null)}>
              <p>{viewEng ? "KEYWORDS" : "キーワード"}</p>
              <p style={{ paddingLeft: "10px" }}>
                {viewEng
                  ? getKeyWords(selectedPhoto?.keywordsEng)
                  : getKeyWords(selectedPhoto?.keywords)}
              </p>
            </ModalDescription>
          )}
          {selectedPhoto?.explanation && (
            <ModalDescription onClick={() => setSelectedPhoto(null)}>
              <p>{viewEng ? "EXPLANATION" : "解説"}</p>
              <p style={{ paddingLeft: "10px" }}>
                {viewEng
                  ? getExplanation(selectedPhoto?.explanationEng)
                  : getExplanation(selectedPhoto?.explanation)}
              </p>
            </ModalDescription>
          )}
        </ModalContentColumn> */}
      </ModalContent>
    </ModalComponent>
  );
};

export default ModalImage;

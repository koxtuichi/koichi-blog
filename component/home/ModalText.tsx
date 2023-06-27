import styled from "@emotion/styled";
import React from "react";
import { Modal } from "semantic-ui-react";

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
};
const ModalText: React.FC<ModalTextProps> = ({
  open,
  setResponse,
  response,
}) => {
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
    </ModalComponent>
  );
};

export default ModalText;

import { speakEnglish, speakJapanese } from "@/component/home/logic";
import React from "react";

import { Icon } from "semantic-ui-react";
import styled from "@emotion/styled";

type SpeechButtonProps = {
  text: string;
  viewEng: boolean;
};

export const IconCursor = styled(Icon)({
  cursor: "pointer",
});

const SpeakButton: React.FC<SpeechButtonProps> = ({ text, viewEng }) => {
  return (
    <IconCursor
      name="volume up"
      color={viewEng ? "teal" : "olive"}
      onClick={() => (viewEng ? speakEnglish(text) : speakJapanese(text))}
    />
  );
};

export default SpeakButton;

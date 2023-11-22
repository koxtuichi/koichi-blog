import { speakEnglish, speakJapanese } from "@/component/home/logic";
import React from "react";

import { Icon } from "semantic-ui-react";
import styled from "@emotion/styled";

type SpeechButtonProps = {
  text: string;
  viewEng: boolean;
  speechFile?: string;
};

export const IconCursor = styled(Icon)({
  cursor: "pointer",
});

const SpeakButton: React.FC<SpeechButtonProps> = ({
  text,
  viewEng,
  speechFile,
}) => {
  const playAudio = () => {
    const audio = new Audio(speechFile);
    audio.play();
  };
  return (
    <IconCursor
      name="volume up"
      color={viewEng ? "teal" : "olive"}
      onClick={() => {
        if (speechFile) {
          playAudio();
          return;
        }
        if (viewEng) {
          speakEnglish(text);
        } else {
          speakJapanese(text);
        }
      }}
    />
  );
};

export default SpeakButton;

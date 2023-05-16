import React from "react";
import { Button } from "semantic-ui-react";

type TranslateButtonGroupProps = {
  setViewEng: React.Dispatch<React.SetStateAction<boolean>>;
  viewEng: boolean;
};

export const TranslateButtonGroup: React.FC<TranslateButtonGroupProps> = ({
  setViewEng,
  viewEng,
}) => {
  return (
    <div style={{ margin: '10px 0 0px 0' }}>
      <Button.Group size="mini">
        <Button
          size="mini"
          basic
          color={!viewEng ? "olive" : "grey"}
          onClick={() => setViewEng(false)}
        >
          JPN
        </Button>
        <Button.Or size="mini" />
        <Button
          size="mini"
          basic
          color={viewEng ? "teal" : "grey"}
          onClick={() => setViewEng(true)}
        >
          ENG
        </Button>
      </Button.Group>
    </div>
  );
};

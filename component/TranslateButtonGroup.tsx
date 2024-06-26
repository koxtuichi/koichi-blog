import React from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-scroll";

type TranslateButtonGroupProps = {
  setViewEng: React.Dispatch<React.SetStateAction<boolean>>;
  viewEng: boolean;
};

export const TranslateButtonGroup: React.FC<TranslateButtonGroupProps> = ({
  setViewEng,
  viewEng,
}) => {
  return (
    <div
      style={{
        margin: "10px 0 0px 0",
        zIndex: 100,
        position: "fixed",
        bottom: 20,
        right: 20,
      }}
    >
      <Button.Group size="mini">
        <Button
          size="mini"
          color={!viewEng ? "olive" : "grey"}
          onClick={() => setViewEng(false)}
        >
          JPN
        </Button>
        <Button.Or size="mini" />
        <Button
          size="mini"
          color={viewEng ? "teal" : "grey"}
          onClick={() => setViewEng(true)}
        >
          ENG
        </Button>
      </Button.Group>
      <Link
        to="topPage"
        spy={true}
        smooth={true}
        duration={500}
        style={{
          cursor: "pointer",
          color: "inherit",
          textDecoration: "underline",
          marginLeft: "12px",
          fontSize: "12px",
        }}
      >
        TOP
      </Link>
    </div>
  );
};

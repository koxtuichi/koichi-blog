import { Box, ButtonGroup } from "@chakra-ui/react";
import { Grid } from "semantic-ui-react";
import { Link } from "react-scroll";
import { CSSProperties } from "react";

const commonStyle: CSSProperties = {
  cursor: "pointer",
  color: "inherit",
  textDecoration: "underline",
};

type PageLinkProps = {
  viewEng: boolean;
};

const mw600px: CSSProperties = {
  maxWidth: "600px",
};

const PageLink: React.FC<PageLinkProps> = ({ viewEng }) => {
  return (
    <Box paddingRight="20px">
      <Grid centered>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>{viewEng ? "Link of Photo" : "写真のリンク"}</div>
          <div style={{ height: "16px" }} />
          <Link
            to="incomplete"
            spy={true}
            smooth={true}
            duration={500}
            style={commonStyle}
          >
            {viewEng ? "incomplete" : "未完"}
          </Link>
          <div style={mw600px}>
            {viewEng
              ? "We are attracted to things that are not finished, that are in the process of growing, that are not in a sufficiently attractive state. Because we are on the way to our goal, we want to document it well. I put it together with that in mind."
              : "完成していない、成長過程、十分に魅力がない状態であるものに惹かれる。目標に向かう途中だからこそ、しっかりと記録をしたい。そんな風に思ってまとめる。"}
          </div>

          <div style={{ height: "16px" }} />

          <Link
            to="untitled"
            spy={true}
            smooth={true}
            duration={500}
            style={commonStyle}
          >
            {viewEng ? "untitled" : "無題"}
          </Link>
          <div style={mw600px}>
            {viewEng
              ? "These are photos that I took because I was attracted to something. I don't know what attracted me."
              : "なにかに惹かれてシャッターを切った写真たち。どこに惹かれたのかはわかっていない。"}
          </div>
        </div>
      </Grid>
    </Box>
  );
};

export default PageLink;

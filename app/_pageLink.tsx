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

const PageLink: React.FC<PageLinkProps> = ({ viewEng }) => {
  return (
    <Box paddingRight="20px">
      <Grid centered>
        <div>{viewEng ? "Link of Photo." : "写真リンク"}</div>
        <Grid.Row>
          <ButtonGroup gap={4}>
            <Link
              to="incomplete"
              spy={true}
              smooth={true}
              duration={500}
              style={commonStyle}
            >
              {viewEng ? "incomplete" : "未完"}
            </Link>
            <Link
              to="untitled"
              spy={true}
              smooth={true}
              duration={500}
              style={commonStyle}
            >
              {viewEng ? "untitled" : "無題"}
            </Link>
          </ButtonGroup>
        </Grid.Row>
      </Grid>
    </Box>
  );
};

export default PageLink;

import { Box, ButtonGroup } from "@chakra-ui/react";
import { Typography } from "@mui/material";
import { Grid } from "semantic-ui-react";

const SnsIcons = () => {
  const SnsLinkDiv = ({
    name,
    path,
  }: {
    name: string;
    path: string;
  }): JSX.Element => {
    return (
      <Typography
        component="div"
        style={{
          cursor: "pointer",
          textDecoration: "underline",
        }}
        fontStyle="italic"
        onClick={() => window.open(path, "_blank")}
      >
        {name}
      </Typography>
    );
  };
  return (
    <Box paddingRight="20px">
      <Grid centered>
        <Grid.Row>
          <ButtonGroup gap={4}>
            <SnsLinkDiv
              name="Instagram"
              path="https://www.instagram.com/kakikuke_koichi/"
            />
            <SnsLinkDiv
              name="Threads"
              path="https://www.threads.net/@kakikuke_koichi"
            />
            <SnsLinkDiv name="X" path="https://twitter.com/kakikukekoichi" />
          </ButtonGroup>
        </Grid.Row>
      </Grid>
    </Box>
  );
};

export default SnsIcons;

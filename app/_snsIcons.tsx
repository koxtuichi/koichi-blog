import { Grid, Icon } from "semantic-ui-react";

const SnsIcons = () => {
  return (
    <Grid centered>
      <Grid.Row>
        <Icon
          name="instagram"
          size="big"
          link
          onClick={() =>
            window.open("https://www.instagram.com/kakikuke_koichi/", "_blank")
          }
        />
        <p style={{ lineHeight: 2 }}>since 2023/2</p>
      </Grid.Row>
    </Grid>
  );
};

export default SnsIcons;
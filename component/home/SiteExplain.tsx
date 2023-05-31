import React from "react";

import { Grid, Icon } from "semantic-ui-react";
import { TagLabel } from "./styledComponents";

type SiteExplain = {
  viewEng: boolean;
};
const SiteExplain: React.FC<SiteExplain> = ({ viewEng }) => {
  return (
    <Grid.Row verticalAlign="middle">
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: 1,
          }}
        >
          <Icon name="pencil" />
          <p style={{ lineHeight: 2 }}>
            {viewEng
              ? "Please choose the photo you are most interested in. It may reveal your state of mind."
              : "一番気になる写真を選んでください。あなたの心理状態がわかるかも。"}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: 1,
          }}
        >
          <Icon name="volume up" color={viewEng ? "teal" : "olive"} />
          <p style={{ lineHeight: 2 }}>
            {viewEng ? "Audio can be played." : "音声を再生できます"}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: 1,
          }}
        >
          <div style={{ paddingTop: "4px" }}>
            <TagLabel color="black" tag size="mini">
              SHOP
            </TagLabel>
          </div>
          <p style={{ lineHeight: 2, marginLeft: "10px" }}>
            {viewEng
              ? "You can buy the keychain in the picture from the tag"
              : "タグをから写真のキーホルダーを購入できます"}
          </p>
        </div>
      </div>
    </Grid.Row>
  );
};

export default SiteExplain;

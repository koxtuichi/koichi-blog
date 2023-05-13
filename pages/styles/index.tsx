import styled from "@emotion/styled";
import { Image } from 'semantic-ui-react';

export const ImageComponent = styled(Image)({
  "> *": {
    borderRadius: '6px',
  }
});

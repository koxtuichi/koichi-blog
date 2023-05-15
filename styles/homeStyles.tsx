import styled from "@emotion/styled";
import { Image, Container } from 'semantic-ui-react';

export const ImageComponent = styled(Image)({
  "> *": {
    borderRadius: '6px',
  }
});

export const ContainerSelfIntroductionComponent = styled(Container)({
  color: 'f5f5f5',
  fontWeight: 400,
});

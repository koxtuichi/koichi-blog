import styled from "@emotion/styled";
import { Image, Container, Grid, Label } from 'semantic-ui-react';

export const ImageComponent = styled(Image)({
  "> *": {
    borderRadius: '6px',
    margin: '0 auto',
  }
});

export const ContainerSelfIntroductionComponent = styled(Container)({
  color: 'f5f5f5',
  fontWeight: 400,
});

export const GridImageComponent = styled(Grid.Column)({
  paddingBottom: '20px',
});

export const ContainerCenter = styled(Container)({
  width: 'fit-content !important',
  margin: '20px auto',
});

export const TagLabel = styled(Label)({
  transform: "translateX(4px)"
});

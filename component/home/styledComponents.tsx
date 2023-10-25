import styled from '@emotion/styled';
import { Image, Container, Grid, Label, Divider } from 'semantic-ui-react';

export const ImageComponent = styled(Image)({
	'> *': {
		borderRadius: '2px',
		margin: '0 auto 4px auto',
	},
});

export const ContainerSelfIntroductionComponent = styled(Container)({
	color: 'f5f5f5',
	fontWeight: 400,
});

export const GridImageComponent = styled(Grid.Column)({
	paddingBottom: '20px',
});

export const GridCentered = styled(Grid)({
	maxWidth: '700px',
	width: 'fit-content',
	margin: '0 auto !important',
});

export const ContainerFotune = styled(Container)({
	minWidth: '100px',
	height: 'fit-content',
	minHeight: '40px',
	margin: '20px auto',
});

export const ContainerCenter = styled(Container)({
	width: 'fit-content !important',
	margin: '20px auto !important',
});

export const ContainerButtonCenter = styled(Container)({
	width: '100% !important',
	textAlign: 'center',
});

export const TagLabel = styled(Label)({
	transform: 'translateX(4px) translateY(-2px)',
});

export const DividerNoneMarginBottom = styled(Divider)({
	marginBottom: '0px !important',
});

export const DividerMargin = styled(Divider)({
	margin: '40px 0 40px 0 !important',
});

import styled from 'styled-components'
import {
	ColumnNumberCSS,
	FlexBetweenCSS,
	FlexCenterCSS,
	GridCenterCSS,
} from '../../../../../../../../../Styles/common'

export const Wrapper = styled.div`
	position: relative;
	height: 60%;
	background-color: ${({ theme }) => theme.COLOR.common.gray[100]};
`
export const Container = styled.div`
	height: 100%;
	padding: 3rem;

	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		padding: 3rem 1rem;
	}
`

export const BottomSection = styled.div`
	height: 21rem;
	margin-bottom: 1.5rem;
	${FlexBetweenCSS}
`

export const ContentSection = styled.section`
	width: 65%;
	height: 100%;
	font-size: ${({ theme }) => theme.FONT_SIZE.small};
	${FlexBetweenCSS}
	align-items: flex-start;
	flex-direction: column;
`
export const ImageSection = styled.section`
	width: 34%;
	height: 100%;
	${GridCenterCSS};
	${ColumnNumberCSS(2)};
	column-gap: 0.5rem;
	row-gap: 0.5rem;
`
export const ButtonSection = styled.section`
	${FlexBetweenCSS}
	width: 13.3rem;
`

export const TextBox = styled.div`
	min-height: ${({ type }) => (type === 'title' ? '4.5rem' : '15rem')};
	max-height: ${({ type }) => (type === 'title' ? '4.5rem' : '15rem')};
	margin-bottom: 1rem;
	padding: 1rem;
	overflow-y: auto;
	color: ${({ theme, type }) =>
		type === 'content' && `${theme.COLOR.common.gray[200]}`};
`

export const TextAreaBox = styled.textarea`
	width: 100%;
	min-height: ${({ name }) => (name === 'title' ? '20%' : '75%')};
	max-height: ${({ name }) => (name === 'title' ? '20%' : '75%')};
	margin-bottom: 1rem;
	padding: 1rem;
	font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
	overflow-y: auto;
	outline: none;
	border: none;
	resize: none;
`

export const ImageBox = styled.div`
	${FlexCenterCSS}
	position: relative;
	cursor: pointer;
	width: 100%;
	height: 10.2rem;
	background: ${({ imgURL }) => `url(${imgURL})`} no-repeat center center;
	background-size: cover;
	/* background-color: ${({ theme }) => theme.COLOR.common.gray[400]}; */
	/* border: 1px solid ${({ theme }) => theme.COLOR.common.gray[400]}; */
	box-shadow: 0 3px 3px rgba(48, 52, 65, 0.15);
	opacity: ${({ hover }) => (hover ? 0.5 : 1)};
`

export const AlertBox = styled.div`
	width: 100%;
	height: 100%;
	${FlexCenterCSS}
	flex-direction: column;

	& > p {
		margin-bottom: 0.5rem;
	}
`

import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: 'LINESeed-Bd';
        src: url('../assets/font/LINESeedKR-Bd.ttf');
    }

    @font-face {
        font-family: 'LINESeed-Rg';
        src: url('../assets/font/LINESeedKR-Rg.ttf');
    }

    @font-face {
        font-family: 'LINESeed-Th';
        src: url('../assets/font/LINESeedKR-Th.ttf');
    }

    * {
        margin:0;
        padding:0;
        box-sizing: border-box;
    }

    html {
        // Font : Line Seed (라인 시드)
        font-size: 62.5%;
        font-family: ${({ theme }) => theme.FONT_WEIGHT.regular};

        @media screen and (max-width:820px) {
            font-size:50%;
        }
    }

    ul, li {
        list-style: none;
    }

    h1 {
        // 로고
        font-size:${({ theme }) => theme.FONT_SIZE.big};
    }

    h2 {
        font-size:${({ theme }) => theme.FONT_SIZE.huge};
        font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
    }

    h2 ~ p {
        font-size:${({ theme }) => theme.FONT_SIZE.large}
        
    }

    h3 {
        font-size:${({ theme }) => theme.FONT_SIZE.large};
        font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
    }

    h3 ~ p {
        font-size:${({ theme }) => theme.FONT_SIZE.medium}
    }

    h3 ~ span {
        font-size:${({ theme }) => theme.FONT_SIZE.small}
    }

    h4 {
        font-size:${({ theme }) => theme.FONT_SIZE.medium};
        font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
    }

    button {
        border: none;
    }

    input {
        outline: none;
    }

    textarea {
        font-size:${({ theme }) => theme.FONT_SIZE.small};
        font-family: 'LINESeed-Rg';
    }

    p {
        font-size:${({ theme }) => theme.FONT_SIZE.small};
        font-weight:${({ theme }) => theme.FONT_WEIGHT.regular}
    }

    span {
        font-size:${({ theme }) => theme.FONT_SIZE.tiny}
    }
`

export default GlobalStyles

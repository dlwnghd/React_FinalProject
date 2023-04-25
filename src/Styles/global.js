import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: 'LINESeed-Bd';
        src: url('./assets/font/LINESeedKR-Bd.ttf');
    }

    @font-face {
        font-family: 'LINESeed-Rg';
        src: url('./assets/font/LINESeedKR-Rg.ttf');
    }

    @font-face {
        font-family: 'LINESeed-Th';
        src: url('./assets/font/LINESeedKR-Th.ttf');
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
    }

    h2 {
        font-size:${({ theme }) => theme.FONT_SIZE.huge}
    }

    h2 ~ p {
        font-size:${({ theme }) => theme.FONT_SIZE.large}
    }

    h3 {
        font-size:${({ theme }) => theme.FONT_SIZE.large}
    }

    h3 ~ p {
        font-size:${({ theme }) => theme.FONT_SIZE.medium}
    }

    h4 {
        font-size:${({ theme }) => theme.FONT_SIZE.medium}
    }

    textarea {
        font-size:${({ theme }) => theme.FONT_SIZE.small}
    }

    p {
        font-weight: 700;
        font-size:${({ theme }) => theme.FONT_SIZE.small};
        font-weight:${({ theme }) => theme.FONT_WEIGHT.bold}
    }

    span {
        font-size:${({ theme }) => theme.FONT_SIZE.tiny}
    }
`

export default GlobalStyles

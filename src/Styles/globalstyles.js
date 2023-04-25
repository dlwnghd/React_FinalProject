import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: 'LINESeedKR-Bd';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/LINESeedKR-Bd.woff2') format('woff2');
        font-weight: 400;
        font-style: normal;
    }

    * {
        margin:0;
        padding:0;
        box-sizing: border-box;
    }

    html {
        // Font : Line Seed (라인 시드)
        font-size: 62.5%;
        font-family: 'LINESeedKR-Bd';

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
        font-size:${({ theme }) => theme.FONT_SIZE.small}
    }

    span {
        font-size:${({ theme }) => theme.FONT_SIZE.tiny}
    }
`

export default GlobalStyles

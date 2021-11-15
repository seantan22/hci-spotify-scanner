import { createGlobalStyle } from 'styled-components/macro';
import theme from './theme';
const { colors, fontSizes, fonts } = theme;

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Circular Std';
    src: local('Circular Std Medium'), local('CircularStd-Medium'),
    font-weight: 500;
    font-style: normal;
  }
  @font-face {
    font-family: 'Circular Std';
    src: local('Circular Std Book'), local('CircularStd-Book'),
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'Circular Std';
    src: local('Circular Std Medium Italic'), local('CircularStd-MediumItalic'),
    font-weight: 500;
    font-style: italic;
  }
  @font-face {
    font-family: 'Circular Std';
    src: local('Circular Std Black'), local('CircularStd-Black'),
    font-weight: 900;
    font-style: normal;
  }
  @font-face {
    font-family: 'Circular Std';
    src: local('Circular Std Bold'), local('CircularStd-Bold'),
    font-weight: 700;
    font-style: normal;
  }
  @font-face {
    font-family: 'Circular Std';
    src: local('Circular Std Bold Italic'), local('CircularStd-BoldItalic'),
    font-weight: 700;
    font-style: italic;
  }
  @font-face {
    font-family: 'Circular Std';
    src: local('Circular Std Book Italic'), local('CircularStd-BookItalic'),
    font-weight: 400;
    font-style: italic;
  }
  @font-face {
    font-family: 'Circular Std';
    src: local('Circular Std Black Italic'), local('CircularStd-BlackItalic'),
    font-weight: 900;
    font-style: italic;
  }
  html {
    box-sizing: border-box;
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  html,
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    max-width: 100%;
  }
  body {
    min-height: 100%;
    overflow-x: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: ${fonts.primary};
    font-size: ${fontSizes.base};
    background-color: ${colors.black};
    color: ${colors.white};
  }
  #root {
    min-height: 100%;
  }
  h1, h2, h3, h4, h5, h6 {
    letter-spacing: -.025em;
    margin: 0 0 10px;
    font-weight: 700;
  }
  h1, h2, h3 {
    font-weight: 900;
  }
  p {
    margin: 0 0 10px;
  }
  ol, ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  a {
    display: inline-block;
    text-decoration: none;
    color: inherit;
    transition: ${theme.transition};
    cursor: pointer;
  }
  img {
    width: 100%;
    max-width: 100%;
    vertical-align: middle;
  }
  svg {
    fill: currentColor;
    vertical-align: middle;
  }
  input {
    border-radius: 0;
    outline: 0;
    &::placeholder {
      opacity: 0.7;
    }
    &:focus,
    &:active {
      &::placeholder {
        opacity: 0.5;
      }
    }
  }
  button {
    display: inline-block;
    color: ${colors.lightestGrey};
    font-family: ${fonts.primary};
    font-size: ${fontSizes.base};
    font-weight: 700;
    border-radius: 50px;
    border: 0;
    padding: 10px 20px;
    cursor: pointer;
    transition: ${theme.transition};
    &:hover,
    &:focus {
      color: ${colors.white};
      outline: 0;
    }
  }
`;

export default GlobalStyle;
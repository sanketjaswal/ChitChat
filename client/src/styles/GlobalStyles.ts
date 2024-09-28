// src/styles/GlobalStyles.ts
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    /* box-sizing: border-box; */
  }

  body {
    font-family: 'Arial', sans-serif;
    background-color: #f4f7fc;
    color: #333;
  }
`;

export default GlobalStyles;

import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }


  body {
    font-family: 'Poppins', sans-serif;
    background: #f8f8f8;
  }

  input::placeholder {
    font-size: 1rem;
    font-family: 'Poppins', sans-serif;
    font-weight: 200;
  }

  button {
    font-family: inherit;
  }


`;

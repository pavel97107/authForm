import styled from "styled-components";

export const HomePage = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const HomePageContent = styled.div`
  width: 100%;
  max-width: 400px;
  background-color: beige;
  height: auto;
  max-height: 500px;

  padding: 2rem;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  color: black;

  & > span {
    color: blueviolet;
  }
`;

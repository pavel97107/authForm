import styled from "styled-components";

export const Button = styled.button`
  display: inline-block;
  background: #6dabe4;
  color: #fff;
  border: none;
  width: auto;
  padding: 15px 39px;
  border-radius: 5px;
  margin-top: 25px;
  cursor: pointer;
  outline: none;
  transition: background 0.1s linear;

  :hover {
    background: #3879a7;
  }

  :active {
    background: #1e587a;
  }
`;

import styled from "styled-components";
import { Field } from "formik";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

type ErrorLine = string | undefined;

export const FormGroup = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
`;

export const Input = styled(Field)`
  width: 100%;
  max-width: 100%;
  padding: 6px 30px;
  border: none;
  outline: none;

  &:focus + div {
    background-color: green;
  }
`;

export const Line = styled.div<{ vError: ErrorLine }>`
  position: absolute;
  bottom: -2px;
  width: 100%;
  height: 2px;
  transition: background 0.3s linear;
  background: ${({ vError }) => (vError ? "red" : "#3879a7")};
`;

export const IconEmail = styled(MdEmail)``;
export const IconPassword = styled(RiLockPasswordFill)``;

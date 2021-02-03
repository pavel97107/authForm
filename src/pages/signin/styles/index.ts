import styled, {ThemeProps} from 'styled-components'
import {Form as FormFormik, Field} from 'formik';


export const SignIn = styled.section`
  display: block;
  margin-top: 10%;

  @media screen and (max-width: 768px) {
    margin-top: 0;
  }
`
export const SignInContainer = styled.div`
  display: block;
  width: 900px;
  margin: 0 auto;
  background: white;
  box-shadow: 0px 15px 16.83px 0.17px rgb(0 0 0 / 5%);
  -moz-box-shadow: 0px 15px 16.83px 0.17px rgba(0, 0, 0, 0.05);
  -webkit-box-shadow: 0px 15px 16.83px 0.17px rgb(0 0 0 / 5%);
  -o-box-shadow: 0px 15px 16.83px 0.17px rgba(0, 0, 0, 0.05);
  -ms-box-shadow: 0px 15px 16.83px 0.17px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  -moz-border-radius: 20px;
  -webkit-border-radius: 20px;

  @media screen and (max-width: 1200px) {
    width: calc(100% - 30px);
    max-width: 100%;
  }

`

export const SignInContent = styled.div`
  display: flex;
  padding-top: 67px;
  padding-bottom: 87px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }

`

export const SignInImage = styled.div`
  flex: 1;
  margin-left: 110px;
  margin-top: 10px;

  @media screen and (max-width: 768px) {
    margin: 0;
    margin-bottom: 20px;
    text-align: center;
  }
`

export const SignInForm = styled.section`
  flex: 1;
  margin-right: 90px;
  margin-left: 80px;

  @media screen and (max-width: 375px) {
    margin-right: 45px;
    margin-left: 40px;
  }

`

export const Form = styled(FormFormik)`

`
export const FormGroup = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`

export const Label = styled.label`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
`

export const Error = styled.div`
  color: red;
  font-weight: 400;
`

export const WrapperImage = styled.div`
  width: 100%;
  height: auto;
`

export const Image = styled.img`
  max-width: 100%;
  height: auto;

`
export const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  font-family: 'Poppins';
  font-weight: bold;

`


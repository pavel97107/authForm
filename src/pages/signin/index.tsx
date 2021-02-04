import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Formik } from "formik";
import { Input, Button } from "../../components";
import * as validate from "./validate";
import {
  SignIn,
  SignInContainer,
  SignInContent,
  SignInImage,
  SignInForm,
  Form,
  WrapperImage,
  Image,
  Title,
  Error,
} from "./styles";
import { SET_USER } from "../../actions";
import { RootState, useAppDispatch } from "../../store";
import { useSelector } from "react-redux";

interface MyFormValues {
  email: string;
  password: string;
}

export default (props: RouteComponentProps) => {
  const dispatch = useAppDispatch();
  const requestError = useSelector<RootState>((state) => state.user.isError);

  const initialValues: MyFormValues = {
    email: "",
    password: "",
  };

  return (
    <SignIn>
      <SignInContainer>
        <SignInContent>
          <SignInImage>
            <WrapperImage>
              <Image src="/images/signin-image.jpg" alt="MAN" />
            </WrapperImage>
          </SignInImage>
          <SignInForm>
            <Title>Sign In</Title>
            <Formik
              initialValues={initialValues}
              validateOnBlur={false}
              onSubmit={(values: MyFormValues) => {
                dispatch(SET_USER(values, props.history));
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="off"
                    validate={validate.validateEmail}
                    propError={errors.email}
                    placeholder="Email"
                  />
                  {errors.email && touched.email && (
                    <Error>{errors.email}</Error>
                  )}
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="off"
                    validate={validate.validatePassword}
                    propError={errors.password}
                    placeholder="Password"
                  />
                  {errors.password && touched.email && (
                    <Error>{errors.password}</Error>
                  )}
                  {requestError && typeof requestError === "string" && (
                    <Error>{requestError}</Error>
                  )}
                  <Button title="Sign In" />
                </Form>
              )}
            </Formik>
          </SignInForm>
        </SignInContent>
      </SignInContainer>
    </SignIn>
  );
};

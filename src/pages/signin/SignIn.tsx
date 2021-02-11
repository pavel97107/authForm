import React, { useState } from "react";
import { Formik } from "formik";
import { Input, Button, Spinner } from "../../components/common";
import * as validate from "./SignIn.validate";
import { useAuthState } from "../../context/AuthProvider/AuthProvider";
import SignInImg from "../../assests/images/signin-image.jpg";
import api from "../../api";
import { AuthenticationData } from "../../api/api";
import {
  SignIn as SignInWrapper,
  SignInContainer,
  SignInContent,
  SignInImage,
  SignInForm,
  Form,
  WrapperImage,
  Image,
  Title,
  Error,
} from "./SignIn.styles";

interface MyFormValues {
  email: string;
  password: string;
}

const authenticatedUser = async (AuthenticationData: AuthenticationData) => {
  try {
    const authResponse = await api.authenticatedUser(AuthenticationData);
    const { tokenType, accessToken, expiresAt } = authResponse.data;
    const token = `${tokenType} ${accessToken}`;
    localStorage.setItem("accessToken", token);
    localStorage.setItem("expiresAt", expiresAt);
    api.client.setHeaders("Authorization", token);
  } catch (e) {
    return Promise.reject(e);
  }
};

const getUserData = () => api.getProfileUser();

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const authState = useAuthState();

  const initialValues: MyFormValues = {
    email: "",
    password: "",
  };

  async function onSubmit(values: MyFormValues) {
    setLoading(true);
    try {
      await authenticatedUser(values);
      const response = await getUserData();
      authState.setUser(response.data);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  }

  return (
    <SignInWrapper>
      <SignInContainer>
        <SignInContent>
          <SignInImage>
            <WrapperImage>
              <Image src={SignInImg} alt="MAN" />
            </WrapperImage>
          </SignInImage>
          <SignInForm>
            <Title>Sign In</Title>
            <Formik
              initialValues={initialValues}
              validateOnBlur={false}
              onSubmit={onSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="off"
                    disabled={loading}
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
                    disabled={loading}
                    autoComplete="off"
                    validate={validate.validatePassword}
                    propError={errors.password}
                    placeholder="Password"
                  />
                  {errors.password && touched.email && (
                    <Error>{errors.password}</Error>
                  )}
                  {error && <Error>{error}</Error>}
                  {loading ? <Spinner /> : <Button title="Sign In" />}
                </Form>
              )}
            </Formik>
          </SignInForm>
        </SignInContent>
      </SignInContainer>
    </SignInWrapper>
  );
}

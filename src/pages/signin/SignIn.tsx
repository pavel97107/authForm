import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Formik } from "formik";
import { Input, Button, Spinner } from "../../components";
import * as validate from "./SignIn.validate";
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
import { useAuthState } from "../../AuthProvider/AuthProvider";
import { authenticatedUser, getUserData } from "../../actions";

interface MyFormValues {
  email: string;
  password: string;
}

export default function SignIn(props: RouteComponentProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const authState = useAuthState();

  const initialValues: MyFormValues = {
    email: "",
    password: "",
  };

  return (
    <SignInWrapper>
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
              onSubmit={async (values: MyFormValues) => {
                setLoading(true);
                try {
                  await authenticatedUser(values);
                  const response = await getUserData();
                  authState?.setUser(response.data);
                } catch (e) {
                  setError(e.message);
                  setLoading(false);
                }
              }}
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

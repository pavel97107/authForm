import React from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { HomePage, HomePageContent, Title } from "./styles";
import { Button } from "../../components";
import { userState } from "../../reducers/user";
import { Link } from "react-router-dom";
import { LOG_OUT } from "../../actions";

export default () => {
  const user = useSelector<RootState, userState>((state) => ({
    ...state.user,
  }));
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(LOG_OUT);
  };

  return (
    <HomePage>
      <HomePageContent>
        {user.isAuth ? (
          <>
            <Title>
              UserName: <span>{user.currentUser?.name}</span>
            </Title>
            <Title>
              UserEmail: <span>{user.currentUser?.email}</span>
            </Title>
            <Button title="Log out" handleClick={handleClick} />
          </>
        ) : (
          <h1>
            You are not logged in please follow the
            <Link to="/signin">link</Link>
          </h1>
        )}
      </HomePageContent>
    </HomePage>
  );
};

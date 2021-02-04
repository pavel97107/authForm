import React from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { HomePage, HomePageContent, Title } from "./styles";
import { Button } from "../../components";
import { UserState } from "../../reducers/user";
import { Link } from "react-router-dom";
import { LOG_OUT } from "../../actions";
import { AppStatus } from "../../reducers/appStatus";

// eslint-disable-next-line react/display-name
export default () => {
  const user = useSelector<RootState, UserState>((state) => ({
    ...state.user,
  }));
  const isAppError = useSelector<RootState, AppStatus>(
    (state) => state.appStatus
  );
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
        {isAppError.status === "error" && isAppError.message && (
          <div>{isAppError.message}</div>
        )}
      </HomePageContent>
    </HomePage>
  );
};

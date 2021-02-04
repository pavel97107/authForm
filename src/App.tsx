import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { RootState, useAppDispatch } from "./store";
import { useSelector } from "react-redux";
import { checkAuth } from "./actions";
import { GlobalStyle, WrapperLoader } from "./globalStyle";
import { Loading } from "./components";
import Routes from "./routes";

const App = () => {
  const dispatch = useAppDispatch();

  const appStatus = useSelector<RootState>(
    (state) => state.appStatus.appStatus
  );
  const history = useHistory();
  useEffect(() => {
    dispatch(checkAuth(history));
  }, []);

  return (
    <div className="App">
      <GlobalStyle />
      {appStatus === "loading" ? (
        <WrapperLoader>
          <Loading />
        </WrapperLoader>
      ) : (
        <Routes />
      )}
    </div>
  );
};
export default App;

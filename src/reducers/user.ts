import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  name: string;
  email: string;
}

export interface userState {
  currentUser: null | User;
  isAuth: boolean;
  accessToken: null | string;
  isError: null | string;
  isLoading: boolean;
}

interface actionTypes {
  user: {
    name: string;
    email: string;
  };
  accessToken: string;
}

const initialState: userState = {
  currentUser: null,
  isAuth: false,
  accessToken: null,
  isError: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<actionTypes>) {
      state.currentUser = action.payload.user;
      state.isAuth = true;
      state.accessToken = action.payload.accessToken;
      state.isLoading = false;
    },
    logOutUser(state) {
      state.currentUser = null;
      state.isAuth = false;
      state.accessToken = null;
    },
    setUserFailed(state, action: PayloadAction<string>) {
      state.isError = action.payload;
      state.isLoading = false;
    },
    setLoading(state) {
      state.isLoading = true;
    },
  },
});

export const {
  setUser,
  logOutUser,
  setUserFailed,
  setLoading,
} = userSlice.actions;
export default userSlice.reducer;

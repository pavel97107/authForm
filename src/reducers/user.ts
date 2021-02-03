import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  name: string;
  email: string;
}

export interface userState {
  currentUser: null | User;
  isAuth: boolean;
  accessToken: null | string;
  error: null | string;
  loading: boolean;
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
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<actionTypes>) {
      state.currentUser = action.payload.user;
      state.isAuth = true;
      state.accessToken = action.payload.accessToken;
      state.loading = false;
    },
    logOutUser(state) {
      state.currentUser = null;
      state.isAuth = false;
      state.accessToken = null;
    },
    setUserFailed(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    setLoading(state) {
      state.loading = true;
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

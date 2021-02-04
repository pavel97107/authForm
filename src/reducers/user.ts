import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CurrentUser {
  name: string;
  email: string;
}

export interface UserState {
  currentUser: null | CurrentUser;
  isAuth: boolean;
  accessToken: null | string;
  isError: null | string;
  isLoading: boolean;
}

interface ActionType {
  user: {
    name: string;
    email: string;
  };
  accessToken: string;
}

const initialState: UserState = {
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
    setUser(state, action: PayloadAction<ActionType>) {
      state.currentUser = action.payload.user;
      state.isAuth = true;
      state.isError = null;
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

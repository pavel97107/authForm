import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AppStatus = "loading" | "complete" | "error";

const initialState = {
  appStatus: "loading",
} as { appStatus: AppStatus };

const appStatusSlice = createSlice({
  name: "appStatus",
  initialState,
  reducers: {
    setAppStatus: (state, action: PayloadAction<AppStatus>) => {
      state.appStatus = action.payload;
    },
  },
});

export const { setAppStatus } = appStatusSlice.actions;
export default appStatusSlice.reducer;

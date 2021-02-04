import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppStatus {
  status: Status;
  message: null | string;
}

type Status = "loading" | "complete" | "error";

const initialState: AppStatus = {
  status: "loading",
  message: null,
};

const appStatusSlice = createSlice({
  name: "appStatus",
  initialState,
  reducers: {
    setAppStatus: (state, action: PayloadAction<AppStatus>) => {
      state.status = action.payload.status;
      state.message = action.payload.message;
    },
  },
});

export const { setAppStatus } = appStatusSlice.actions;
export default appStatusSlice.reducer;

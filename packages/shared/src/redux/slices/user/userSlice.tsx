import type { PayloadAction } from "@reduxjs/toolkit";

import { createAppSlice } from "../../createAppSlice";
import type { AppThunk } from "../../store";

import { fetchUser } from "./userAPI";

import { types } from "util";

export interface UserSliceState {
  user: object | null;
}

const initialState: UserSliceState = {
  user: null,
};

export const userSlice = createAppSlice({
  name: "user",
  initialState,
  reducers: (create) => ({
    updateUser: create.reducer((state, action: PayloadAction<object>) => {
      state.user = action.payload;
    }),
    loggedInUsers: create.asyncThunk<object>(
      async () => {
        const response = await fetchUser();
        return response;
      },
      {
        pending: (state) => {
          // state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.user = action.payload;
        },
        rejected: (state) => {
          // state.status = "failed";
        },
      }
    ),
  }),

  selectors: {
    selectUser: (user) => user,
  },
});

export const { updateUser, loggedInUsers } = userSlice.actions;
export const { selectUser } = userSlice.selectors;

import type { PayloadAction } from "@reduxjs/toolkit";

import { createAppSlice } from "../../createAppSlice";
import type { AppThunk } from "../../store";

import { addProfileInDb, fetchUser } from "./userAPI";
import { userType } from "@repo/shared/types/user";

export interface UserSliceState {
  user: object | null;
  profile: object | null;
}

const initialState: UserSliceState = {
  user: null,
  profile: null,
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
    addProfile: create.asyncThunk(
      async (data: userType) => {
        const response = await addProfileInDb(data);
        return response;
      },
      {
        pending: (state) => {
          // state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.profile = action.payload as object;
        },
        rejected: (state) => {
          // state.status = "failed";
        },
      }
    ),
  }),

  selectors: {
    selectUser: (user) => user.user,
    selectProfile: (user) => user.profile,
  },
});

export const { updateUser, loggedInUsers, addProfile } = userSlice.actions;
export const { selectUser, selectProfile } = userSlice.selectors;

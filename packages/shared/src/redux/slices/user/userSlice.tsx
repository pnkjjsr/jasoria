import type { PayloadAction } from "@reduxjs/toolkit";

import { createAppSlice } from "../../createAppSlice";
import type { AppThunk } from "../../store";

import { fetchUser, getProfile, postProfile } from "./userAPI";
import { userType, UIdType } from "@repo/shared/types/user";

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
        const response = await postProfile(data);
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
    updateProfile: create.asyncThunk(
      async (data: UIdType) => {
        const response = await getProfile(data.uid);
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

export const { updateUser, loggedInUsers, updateProfile, addProfile } =
  userSlice.actions;
export const { selectUser, selectProfile } = userSlice.selectors;

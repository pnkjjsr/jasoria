import type { PayloadAction } from "@reduxjs/toolkit";

import { createAppSlice } from "../../createAppSlice";
import type { AppThunk } from "../../store";
import { types } from "util";

export interface UserSliceState {
  user: null | object;
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
  }),

  selectors: {
    selectUser: (user) => user,
  },
});

export const { updateUser } = userSlice.actions;
export const { selectUser } = userSlice.selectors;

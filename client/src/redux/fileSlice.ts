// src/redux/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FileType, user } from "../types/types";
import { stat } from "fs";

export interface ReduxFileData {
  files : FileType[]
}

const initialState: ReduxFileData = {
    files : []
};

const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    addFiles : (state,action) => {
        state.files = action.payload
    },
  },
});

export const { addFiles } = fileSlice.actions;
export default fileSlice.reducer;

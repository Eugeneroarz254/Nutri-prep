import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { coverService } from "./coverService";

export const getAllCovers = createAsyncThunk(
  "cover/get",
  async (data, thunkAPI) => {
    try {
      const response = await coverService.getCovers(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getACover = createAsyncThunk(
  "cover/getACover",
  async (id, thunkAPI) => {
    try {
      return await coverService.getSingleCover(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const coverState = {
  covers: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const coverSlice = createSlice({
  name: "cover",
  initialState: coverState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllCovers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCovers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.covers = action.payload;
      })
      .addCase(getAllCovers.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getACover.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getACover.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.singleCover = action.payload;
        state.message = "Cover Fetched Successfully!";
      })
      .addCase(getACover.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default coverSlice.reducer;

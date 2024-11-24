import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import coverService from "./coverService";

export const getCovers = createAsyncThunk("cover/get-covers", async (thunkAPI) => {
  try {
    return await coverService.getCovers();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const createCover = createAsyncThunk(
  "cover/create-cover",
  async (coverData, thunkAPI) => {
    try {
      return await coverService.createCover(coverData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getACover = createAsyncThunk(
  "cover/get-cover",
  async (id, thunkAPI) => {
    try {
      return await coverService.getCover(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateACover = createAsyncThunk(
  "cover/update-cover",
  async (cover, thunkAPI) => {
    try {
      return await coverService.updateCover(cover);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteACover = createAsyncThunk(
  "cover/delete-cover",
  async (id, thunkAPI) => {
    try {
      return await coverService.deleteCover(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");

const initialState = {
  covers: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};
export const coverSlice = createSlice({
  name: "covers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCovers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCovers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.covers = action.payload;
      })
      .addCase(getCovers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createCover.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCover.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdCover = action.payload;
      })
      .addCase(createCover.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
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
        state.coverData = action.payload;
      })
      .addCase(getACover.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateACover.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateACover.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedCover = action.payload;
      })
      .addCase(updateACover.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteACover.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteACover.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedCover = action.payload;
      })
      .addCase(deleteACover.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default coverSlice.reducer;
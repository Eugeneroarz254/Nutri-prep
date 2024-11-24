import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import cCategoryService from "./ccategoryService";

export const getCategories = createAsyncThunk(
  "coverCategory/get-categories",
  async (thunkAPI) => {
    try {
      return await cCategoryService.getCoverCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createNewCoverCat = createAsyncThunk(
  "blogCategory/create-category",
  async (catData, thunkAPI) => {
    try {
      return await cCategoryService.createCoverCategory(catData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getACoverCat = createAsyncThunk(
  "blogCategory/get-category",
  async (id, thunkAPI) => {
    try {
      return await cCategoryService.getCoverCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateACoverCat = createAsyncThunk(
  "coverCategory/update-category",
  async (coverCat, thunkAPI) => {
    try {
      return await cCategoryService.updateCoverCategory(coverCat);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteACoverCat = createAsyncThunk(
  "coverCategory/delete-category",
  async (id, thunkAPI) => {
    try {
      return await cCategoryService.deleteCoverCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");
const initialState = {
  cCategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const cCategorySlice = createSlice({
  name: "cCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cCategories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createNewCoverCat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewCoverCat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createCoverCategory = action.payload;
      })
      .addCase(createNewCoverCat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getACoverCat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getACoverCat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.coverCatName = action.payload.title;
      })
      .addCase(getACoverCat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateACoverCat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateACoverCat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedCoverCategory = action.payload;
      })
      .addCase(updateACoverCat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteACoverCat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteACoverCat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedCoverCategory = action.payload;
      })
      .addCase(deleteACoverCat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default cCategorySlice.reducer;
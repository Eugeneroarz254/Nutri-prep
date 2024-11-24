import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import wineCategoryService from "./wcategoryService"; // Assuming you have a wineCategoryService

export const getCategories = createAsyncThunk(
  "wineCategory/get-categories",
  async (thunkAPI) => {
    try {
      return await wineCategoryService.getWineCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createCategory = createAsyncThunk(
  "wineCategory/create-category",
  async (categoryData, thunkAPI) => {
    try {
      return await wineCategoryService.createWineCategory(categoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateWineCategory = createAsyncThunk(
  "wineCategory/update-category",
  async (category, thunkAPI) => {
    try {
      return await wineCategoryService.updateWineCategory(category);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteWineCategory = createAsyncThunk(
  "wineCategory/delete-category",
  async (id, thunkAPI) => {
    try {
      return await wineCategoryService.deleteWineCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getWineCategory = createAsyncThunk(
  "wineCategory/get-wine-category",
  async (id, thunkAPI) => {
    try {
      return await wineCategoryService.getWineCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("RevertAll");

const initialState = {
  wCategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const wcategorySlice = createSlice({
  name: "wineCategories",
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
        state.wCategories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdCategory = action.payload;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateWineCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateWineCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedCategory = action.payload;
      })
      .addCase(updateWineCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteWineCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteWineCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedCategory = action.payload;
      })
      .addCase(deleteWineCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getWineCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWineCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.categoryName = action.payload.title;
      })
      .addCase(getWineCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default wcategorySlice.reducer;

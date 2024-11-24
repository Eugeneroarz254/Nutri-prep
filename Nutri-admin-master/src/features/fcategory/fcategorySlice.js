import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import fCategoryService from "./fcategoryService";

export const getCategories = createAsyncThunk(
  "furnitureCategory/get-categories",
  async (thunkAPI) => {
    try {
      return await fCategoryService.getCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createCategory = createAsyncThunk(
  "furnitureCategory/create-category",
  async (catData, thunkAPI) => {
    try {
      return await fCategoryService.createCategory(catData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAFurnitureCat = createAsyncThunk(
  "furnitureCategory/get-category",
  async (id, thunkAPI) => {
    try {
      return await fCategoryService.getCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateAFurnitureCat = createAsyncThunk(
  "furnitureCategory/update-category",
  async (coverCat, thunkAPI) => {
    try {
      return await fCategoryService.updateCategory(coverCat);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAFurnitureCat = createAsyncThunk(
  "furnitureCategory/delete-category",
  async (id, thunkAPI) => {
    try {
      return await fCategoryService.deleteCoverCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");
const initialState = {
  fCategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const fCategorySlice = createSlice({
  name: "furnitureCategories",
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
        state.fCategories = action.payload;
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
      .addCase(getAFurnitureCat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAFurnitureCat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.categoryName = action.payload.title;
      })
      .addCase(getAFurnitureCat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAFurnitureCat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAFurnitureCat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedCategory = action.payload;
      })
      .addCase(updateAFurnitureCat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteAFurnitureCat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAFurnitureCat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedCategory = action.payload;
      })
      .addCase(deleteAFurnitureCat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default fCategorySlice.reducer;

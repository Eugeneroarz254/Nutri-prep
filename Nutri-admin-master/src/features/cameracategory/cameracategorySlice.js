import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import cameraCategoryService from "./cameracategoryService"; // Assuming you have a cameraCategoryService

export const getCategories = createAsyncThunk(
  "cameraCategory/get-categories",
  async (thunkAPI) => {
    try {
      return await cameraCategoryService.getCameraCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createCategory = createAsyncThunk(
  "cameraCategory/create-category",
  async (categoryData, thunkAPI) => {
    try {
      return await cameraCategoryService.createCameraCategory(categoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateCameraCategory = createAsyncThunk(
  "cameraCategory/update-category",
  async (category, thunkAPI) => {
    try {
      return await cameraCategoryService.updateCameraCategory(category);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteCameraCategory = createAsyncThunk(
  "cameraCategory/delete-category",
  async (id, thunkAPI) => {
    try {
      return await cameraCategoryService.deleteCameraCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCameraCategory = createAsyncThunk(
  "cameraCategory/get-camera-category",
  async (id, thunkAPI) => {
    try {
      return await cameraCategoryService.getCameraCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("RevertAll");

const initialState = {
  cCategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const cameracategorySlice = createSlice({
  name: "cameraCategories",
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
      .addCase(updateCameraCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCameraCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedCategory = action.payload;
      })
      .addCase(updateCameraCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteCameraCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCameraCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedCategory = action.payload;
      })
      .addCase(deleteCameraCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getCameraCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCameraCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.categoryName = action.payload.title;
      })
      .addCase(getCameraCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default cameracategorySlice.reducer;

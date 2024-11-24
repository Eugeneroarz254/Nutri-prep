import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import cologneBrandService from "./cbrandService"; // Update the import to match your actual service path

export const getCologneBrands = createAsyncThunk(
  "cologneBrand/get-brands",
  async (thunkAPI) => {
    try {
      return await cologneBrandService.getCologneBrands();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getACologneBrand = createAsyncThunk(
  "cologneBrand/get-brand",
  async (id, thunkAPI) => {
    try {
      return await cologneBrandService.getCologneBrand(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createCologneBrand = createAsyncThunk(
  "cologneBrand/create-brand",
  async (brandData, thunkAPI) => {
    try {
      return await cologneBrandService.createCologneBrand(brandData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateACologneBrand = createAsyncThunk(
  "cologneBrand/update-brand",
  async (brand, thunkAPI) => {
    try {
      return await cologneBrandService.updateCologneBrand(brand);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteACologneBrand = createAsyncThunk(
  "cologneBrand/delete-brand",
  async (id, thunkAPI) => {
    try {
      return await cologneBrandService.deleteCologneBrand(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  cologneBrands: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const cbrandSlice = createSlice({
  name: "cologneBrands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCologneBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCologneBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cologneBrands = action.payload;
      })
      .addCase(getCologneBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createCologneBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCologneBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdCologneBrand = action.payload;
      })
      .addCase(createCologneBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getACologneBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getACologneBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cologneBrandName = action.payload.title;
      })
      .addCase(getACologneBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateACologneBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateACologneBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedCologneBrand = action.payload;
      })
      .addCase(updateACologneBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteACologneBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteACologneBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedCologneBrand = action.payload;
      })
      .addCase(deleteACologneBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default cbrandSlice.reducer;

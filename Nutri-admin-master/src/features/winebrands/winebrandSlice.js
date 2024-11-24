import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import winebrandService from "./winebrandService";

export const getWineBrands = createAsyncThunk(
  "winebrand/get-brands",
  async (thunkAPI) => {
    try {
      return await winebrandService.getWineBrands();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAWineBrand = createAsyncThunk(
  "winebrand/get-brand",
  async (id, thunkAPI) => {
    try {
      return await winebrandService.getWineBrand(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createWineBrand = createAsyncThunk(
  "winebrand/create-brand",
  async (brandData, thunkAPI) => {
    try {
      return await winebrandService.createWineBrand(brandData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateAWineBrand = createAsyncThunk(
  "winebrand/update-brand",
  async (brand, thunkAPI) => {
    try {
      return await winebrandService.updateWineBrand(brand);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAWineBrand = createAsyncThunk(
  "winebrand/delete-brand",
  async (id, thunkAPI) => {
    try {
      return await winebrandService.deleteWineBrand(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  winebrands: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const wineBrandSlice = createSlice({
  name: "winebrands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWineBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWineBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.winebrands = action.payload;
      })
      .addCase(getWineBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createWineBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createWineBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdWineBrand = action.payload;
      })
      .addCase(createWineBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAWineBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAWineBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.wineBrandName = action.payload.title;
      })
      .addCase(getAWineBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAWineBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAWineBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedWineBrand = action.payload;
      })
      .addCase(updateAWineBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteAWineBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAWineBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedWineBrand = action.payload;
      })
      .addCase(deleteAWineBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default wineBrandSlice.reducer;

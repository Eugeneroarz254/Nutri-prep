import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import propertyService from "./propertyService"; // Assuming you have a propertyService

export const getProperties = createAsyncThunk(
  "property/get-properties",
  async (thunkAPI) => {
    try {
      return await propertyService.getProperties();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createProperty = createAsyncThunk(
  "property/create-property",
  async (propertyData, thunkAPI) => {
    try {
      return await propertyService.createProperty(propertyData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAProperty = createAsyncThunk(
  "property/delete-property",
  async (id, thunkAPI) => {
    try {
      return await propertyService.deleteProperty(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  properties: [], // Change 'products' to 'properties'
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const propertySlice = createSlice({
  name: "properties", // Change 'products' to 'properties'
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProperties.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProperties.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.properties = action.payload; // Change 'products' to 'properties'
      })
      .addCase(getProperties.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createProperty.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProperty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdProperty = action.payload; // Change 'createdProduct' to 'createdProperty'
      })
      .addCase(createProperty.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(deleteAProperty.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAProperty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deleteProperty = action.payload; // Change 'deleteProduct' to 'deleteProperty'
      })
      .addCase(deleteAProperty.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(resetState, () => initialState);
  },
});

export default propertySlice.reducer;

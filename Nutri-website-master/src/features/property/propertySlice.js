import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { propertyService } from "./propertyService"; // Assuming you have a propertyService for properties

export const getAllProperties = createAsyncThunk(
  "property/getAllProperties", // Update action type to "property/getAllProperties"
  async (data, thunkAPI) => {
    try {
      return await propertyService.getProperties(data); // Update service function to getAllProperties
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getProperty = createAsyncThunk(
  "property/getProperty", // Update action type to "property/getProperty"
  async (id, thunkAPI) => {
    try {
      return await propertyService.getSingleProperty(id); // Update service function to getSingleProperty
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addToWishlist = createAsyncThunk(
  "property/addToWishlist", // Update action type to "property/addToWishlist"
  async (propId, thunkAPI) => {
    try {
      return await propertyService.addToWishlist(propId); // Update service function to addToWishlist
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addRating = createAsyncThunk(
  "property/addRating", // Update action type to "property/addRating"
  async (data, thunkAPI) => {
    try {
      return await propertyService.rateProperty(data); // Update service function to rateProperty
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const propertyState = {
  property: [], // Update state property to "property"
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  recentlyViewed: [],
};

export const propertySlice = createSlice({
  name: "property", // Update slice name to "property"
  initialState: propertyState,
  reducers: {
    addToRecentlyViewed: (state, action) => {
      const propertyId = action.payload; // Update variable name to "propertyId"
      if (!state.recentlyViewed.includes(propertyId)) {
        state.recentlyViewed.unshift(propertyId);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProperties.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProperties.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.property = action.payload; // Update state property to "property"
      })
      .addCase(getAllProperties.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(addToWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.addToWishlist = action.payload;
        state.message = "Property Added To Wishlist !";
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getProperty.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProperty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.singleProperty = action.payload; // Update state property to "singleProperty"
        state.message = "Property Fetched Successfully !";
      })
      .addCase(getProperty.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(addRating.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addRating.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.rating = action.payload;
        state.message = "Rating Added Successfully";
        if (state.isSuccess) {
          toast.success("Rating Added Successfully");
        }
      })
      .addCase(addRating.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export const { addToRecentlyViewed } = propertySlice.actions;

export default propertySlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import uploadService from "./uploadService";

export const uploadImg = createAsyncThunk(
  "upload/images",
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < data.length; i++) {
        formData.append("images", data[i]);
      }
      return await uploadService.uploadImg(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const delImg = createAsyncThunk(
  "delete/images",
  async (id, thunkAPI) => {
    try {
      return await uploadService.deleteImg(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const uploadVideo = createAsyncThunk(
  "upload/videos",
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < data.length; i++) {
        formData.append("videos", data[i]);
      }
      return await uploadService.uploadVideo(formData); // Update this to use the correct service method for uploading videos
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteVideo = createAsyncThunk(
  "delete/videos",
  async (id, thunkAPI) => {
    try {
      return await uploadService.deleteVideo(id); // Update this to use the correct service method for deleting videos
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/*--description Images/videos--*/

export const uploadDescImg = createAsyncThunk(
  "upload/desc/images",
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < data.length; i++) {
        formData.append("images", data[i]);
      }
      return await uploadService.uploadDescImg(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const delDescImg = createAsyncThunk(
  "delete/desc/images",
  async (id, thunkAPI) => {
    try {
      return await uploadService.deleteDescImg(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const uploadDescVideo = createAsyncThunk(
  "upload/desc/videos",
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < data.length; i++) {
        formData.append("videos", data[i]);
      }
      return await uploadService.uploadDescVideo(formData); // Update this to use the correct service method for uploading videos
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteDescVideo = createAsyncThunk(
  "delete/desc/videos",
  async (id, thunkAPI) => {
    try {
      return await uploadService.deleteDescVideo(id); // Update this to use the correct service method for deleting videos
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/*--End description Images/videos--*/




const initialState = {
  images: [],
  descImages:[],
  descVideos:[],
  videos: [], // Add a new state property for storing video information
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const uploadSlice = createSlice({
  name: "images",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadImg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.images = action.payload;
      })
      .addCase(uploadImg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(delImg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(delImg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.images = [];
      })
      .addCase(delImg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })

      .addCase(uploadDescImg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadDescImg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.descImages = action.payload;
      })
      .addCase(uploadDescImg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(delDescImg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(delDescImg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.descImages = [];
      })
      .addCase(delDescImg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })

      .addCase(uploadVideo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadVideo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.videos = action.payload; // Update the state with uploaded video information
      })
      .addCase(uploadVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteVideo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteVideo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.videos = []; // Clear the video information upon deletion
      })
      .addCase(deleteVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })

      .addCase(uploadDescVideo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadDescVideo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.descVideos = action.payload; // Update the state with uploaded video information
      })
      .addCase(uploadDescVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(deleteDescVideo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDescVideo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.descVideos = []; // Clear the video information upon deletion
      })
      .addCase(deleteDescVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
  },
});
export default uploadSlice.reducer;

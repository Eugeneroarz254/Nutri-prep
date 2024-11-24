import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { authService } from "./userService";





export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const verifyEmailOTP = createAsyncThunk(
  "user/verify-otp",
  async (otpData, thunkAPI) => {
    try {
      // Call the authService method to verify the OTP
      const verificationResult = await authService.verifyOTP(otpData);

      console.log("data",verificationResult)
      // If OTP is verified successfully, return the success message
      if (verificationResult === true) {
        return verificationResult;
      } else {
        // Handle OTP verification failure and return the error message
        return thunkAPI.rejectWithValue("OTP verification failed");
      }
    } catch (error) {
      // Handle any errors that occurred during OTP verification
      return thunkAPI.rejectWithValue("Error verifying OTP");
    }
  }
);

export const resendOTP = createAsyncThunk(
  "user/resend-otp",
  async (userData, thunkAPI) => {
    try {
      // Call the authService method to resend OTP
      const resendResult = await authService.resendOTP(userData);

      // Check if OTP resend was successful
      if (resendResult) {
        return resendResult;
      } else {
        // Handle OTP resend failure and return an appropriate message
        return thunkAPI.rejectWithValue("OTP resend failed");
      }
    } catch (error) {
      // Handle any errors that occurred during OTP resend
      return thunkAPI.rejectWithValue("Error resending OTP");
    }
  }
);



export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await authService.login(userData);
      console.log(response,"response")
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk for logging out the user
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await authService.logout(); // Call the logout API
      localStorage.clear(); // Clear all data in local storage
      return true;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (_, thunkAPI) => {
    try {
      const data = await authService.fetchUserData();

      localStorage.setItem("customer", JSON.stringify(data));

      console.log("Fetched user data:", data); 
      return data; 
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        "Failed to fetch user data";
      console.error("Error fetching user data:", message); 
      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const addAddress = createAsyncThunk(
  "auth/addaddress",
  async (addressData, thunkAPI) => {
    try {
      return await authService.addAddress(addressData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAddress = createAsyncThunk(
  "user/get-address",
  async (data,thunkAPI) => {
    try {
      return await authService.getAddress(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const subscribeNewsletter = createAsyncThunk(
  "user/subscribeNewsletter",
  async (email, thunkAPI) => {
    try {
      const data = await authService.subscribe(email);
      return data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        "Failed to subscribe to the newsletter";
      console.error("Error subscribing to newsletter:", message);
      return thunkAPI.rejectWithValue({
        message,
        response: error.response
      });
    }
  }
);



export const getUserProductWishlist = createAsyncThunk(
  "user/wishlist",
  async (thunkAPI) => {
    try {
      return await authService.getUserWislist();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const addProdToCart = createAsyncThunk(
  "user/cart/add",
  async (cartData,thunkAPI) => {
    try {
      return await authService.addToCart(cartData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createAnOrder = createAsyncThunk(
  "user/cart/create-order",
  async (orderDetail,thunkAPI) => {
    try {
      return await authService.createOrder(orderDetail);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserCart = createAsyncThunk(
  "user/cart/get",
  async (data,thunkAPI) => {
    try {
      const result = await authService.getCart(data);
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteUserCart = createAsyncThunk(
  "user/cart/delete",
  async (data,thunkAPI) => {
    try {
      return await authService.emptyCart(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getRecentlyViewedProducts = createAsyncThunk(
  "user/recentlyViewed",
  async (userId, thunkAPI) => {
    try {
      const response = await authService.getRecentlyViewedProducts(userId);
      return response;
    } catch (error) {
      console.error("Error fetching recently viewed products:", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const getOrders = createAsyncThunk(
  "user/order/get",
  async (thunkAPI) => {
    try {
      return await authService.getUserOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const updateAOrder = createAsyncThunk(
  "order/update-order",
  async (data, thunkAPI) => {
    try {
      return await authService.updateOrder(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteCartProduct = createAsyncThunk(
  "user/cart/product/delete",
  async ({ id, config2 }, thunkAPI) => {
    try {
      return await authService.removeProductFromCart({ id, config: config2 });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateCartProduct = createAsyncThunk(
  "user/cart/product/update",
  async (cartDetail,thunkAPI) => {
    try {
      return await authService.updateProductFromCart(cartDetail);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "user/profile/update",
  async (data, thunkAPI) => {
   
    try {
      return await authService.updateUser(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const forgotPasswordToken = createAsyncThunk(
  "user/password/token",
  async (data, thunkAPI) => {
    try {
      const response = await authService.forgotPassToken(data);
    console.log(response,"response")
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const resetPassword = createAsyncThunk(
  "user/password/reset",
  async (data,thunkAPI) => {
    try {
      return await authService.resetPass(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetLoggedOut = createAsyncThunk('auth/resetLoggedOut', async () => {
  return true; // Returning `false` to reset the flag
});
export const setLoggedOut = createAsyncThunk('auth/setLoggedOut', async () => {
  return false; // Returning `false` to reset the flag
});


export const resetState = createAction("Reset_all");

const getCustomerfromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;
   
   

  const initialState = {
    user: getCustomerfromLocalStorage || null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    isOtpSent: false,
    isOtpResent: false,
    recentlyViewed: [],
    newsletterStatus: null,
    createdUser: null,
    createdAddress: null,
    verifyOtp: null,
    wishlist: [],
    cartProduct: null,
    cartProducts: [],
    deletedCartProduct: null,
    updatedCartProduct: null,
    orderedProduct: null,
    getorderedProduct: [],
    updatedUser: null,
    address: [],
    isLoggedOut: false,
    token: null,
  };
  

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setOtpSent: (state, action) => {
      state.isOtpSent = action.payload;
    },
    resetState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    }
  
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdUser = action.payload;
        if (state.isSuccess === true) {
          state.isOtpSent = true;
          toast.info("OTP has been sent to your email");
        }
        
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload.response.data.message);
        }
      })

      
      .addCase(resetLoggedOut.fulfilled, (state) => {
        state.isLoggedOut = true;
      })
      .addCase(setLoggedOut.fulfilled, (state) => {
        state.isLoggedOut = false;
      })
      
    

      .addCase(addAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdAddress = action.payload;  
        if (state.isSuccess === true) {
          toast.info("Address Saved Successfully");
        }
      })

      .addCase(addAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload.response.data.message);
        }
      })
      .addCase(getAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.address = action.payload;
      })
      .addCase(getAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;       
      })

      .addCase(verifyEmailOTP.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(verifyEmailOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.verifyOtp = action.payload;
        if (state.isSuccess === true) {
          toast.info("User Has been Created Successfully!");
        }
      })
      .addCase(verifyEmailOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.verifyOtp = action.payload; 
      })

      .addCase(resendOTP.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resendOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isOtpResent = true; 
        if (state.isSuccess === true) {
          toast.info("OTP has been resent to your email");
        }
      })
      .addCase(resendOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload.response.data.message);
        }
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
        localStorage.setItem('customer', JSON.stringify(action.payload));
        toast.info("User Logged in Successfully!");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload || 'An error occurred';
        toast.error(state.message);
      })
      
      .addCase(subscribeNewsletter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(subscribeNewsletter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
        if (state.isSuccess === true) {
          toast.info("Thank you for subscribing to our newsletter!");
        }
      })
      .addCase(subscribeNewsletter.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message;
      
        if (action.payload.response && action.payload.response.data) {
          toast.error(action.payload.response.data.message);
        } else {
          toast.error(action.payload.message);
        }
      })

      .addCase(fetchUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
        
   
    })
    
      .addCase(fetchUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
  
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        toast.info("User Logged Out Successfully");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        toast.error("Logout failed: " + action.payload);
      })
       
    
      .addCase(getUserProductWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProductWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.wishlist = action.payload;
      })
      .addCase(getUserProductWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;       
      })

      
      .addCase(addProdToCart.pending, (state) => {
        state.isLoading = true;
      }).addCase(addProdToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cartProduct = action.payload;
        if (state.isSuccess) {
          toast.success("Product Added to Cart")
        }
      }).addCase(addProdToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      }).addCase(getUserCart.pending, (state) => {
        state.isLoading = true;
      }).addCase(getUserCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cartProducts = action.payload;
       
      }).addCase(getUserCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAOrder.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.yearlyData = action.payload;
        state.message = "success";
        if (state.isSuccess === true) {
          toast.info("Order Cancelled Successfully!");
        }
      })
      .addCase(updateAOrder.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(deleteCartProduct.pending, (state) => {
        state.isLoading = true;
      }).addCase(deleteCartProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedCartProduct = action.payload;
        if (state.isSuccess) {
          toast.success("Product Removed From Cart Successfully!")
        }
       
      }).addCase(deleteCartProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isSuccess===false) {
          toast.error("Something Went Wrong!")
        }
      })
      .addCase(updateCartProduct.pending, (state) => {
        state.isLoading = true;
      }).addCase(updateCartProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedCartProduct = action.payload;
        if (state.isSuccess) {
          toast.success("Product Updated From Cart Successfully!")
        }
       
      }).addCase(updateCartProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isSuccess===false) {
          toast.error("Something Went Wrong!")
        }
      })
      .addCase(createAnOrder.pending, (state) => {
        state.isLoading = true;
      }).addCase(createAnOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orderedProduct = action.payload;
        if (state.isSuccess) {
          toast.success("Ordered Created Successfully")
        }
       
      }).addCase(createAnOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isSuccess===false) {
          toast.error("Something Went Wrong!")
        }
      }).addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      }).addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getorderedProduct = action.payload;
     
       
      }).addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        
      }).addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      }).addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedUser = action.payload;
        let currentUserData = JSON.parse(localStorage.getItem("customer"))
        
          let newUserData = {
            _id: currentUserData?._id,
            token: currentUserData.token,
            firstname:action?.payload?.firstname,
            lastname: action?.payload?.lastname,
            email: action?.payload?.email,
            mobile:action?.payload?.mobile,
        }
        console.log(newUserData);
          localStorage.setItem("customer", JSON.stringify(newUserData))
          state.user = newUserData;

          toast.success("Profile Updated Successfully")
       
       
      }).addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isSuccess===false) {
          toast.error("Something Went Wrong!")
        }
      })
      
      .addCase(forgotPasswordToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPasswordToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.token = action.payload;
      })
      .addCase(forgotPasswordToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        // Check if the payload is a string or object
        state.message = typeof action.payload === 'string'
            ? action.payload
            : action.payload?.message || "Something went wrong!";
    })
    
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      }).addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.pass = action.payload;
        if (state.isSuccess) {
          toast.success("Password Updated Successfully")
        }
       
      }).addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isSuccess===false) {
          toast.error("Something Went Wrong!")
        }
      })
      .addCase(deleteUserCart.pending, (state) => {
        state.isLoading = true;
      }).addCase(deleteUserCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedCart = action.payload;
        
       
      }).addCase(deleteUserCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        
      })
      .addCase(getRecentlyViewedProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRecentlyViewedProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.recentlyViewed = action.payload;
      })
      .addCase(getRecentlyViewedProducts.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.recentlyViewed = [];
        console.log("Error Fetching recently viewed:", state);

      })
      .addCase(resetState, () => initialState)
  },
});



export default authSlice.reducer;

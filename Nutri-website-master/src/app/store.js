import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/user/userSlice";
import winesReducer from "../features/wines/wineSlice"
import productReducer from "../features/products/productSlice";
import propertyReducer from "../features/property/propertySlice"
import coverReducer from "../features/cover/coverSlice"
import blogReducer from "../features/blogs/blogSlice";
import contactReducer from '../features/contact/contactSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    wines:winesReducer,
    blog: blogReducer,
    contact:contactReducer,
    property:propertyReducer,
    covers:coverReducer
  },
});

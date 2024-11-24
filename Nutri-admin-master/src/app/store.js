import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/cutomers/customerSlice";
import productReducer from "../features/product/productSlice";
import propertyReducer from "../features/property/propertySlice";
import brandReducer from "../features/brand/brandSlice";
import winebrandsReducer from "../features/winebrands/winebrandSlice";
import cologneBrandsReducer from "../features/cologneBrands/cbrandSlice"
import wCategoryReducer from "../features/wcategory/wcategorySlice"
import pCategoryReducer from "../features/pcategory/pcategorySlice";
import bCategoryReducer from "../features/bcategory/bcategorySlice";
import fCategoryReducer from "../features/fcategory/fcategorySlice"
import cCategoryReducer from "../features/ccategory/ccategorySlice";
import cameracategoryReducer from "../features/cameracategory/cameracategorySlice"
import wineReducer from "../features/wine/wineSlice"
import blogReducer from "../features/blogs/blogSlice";
import sizeReducer from "../features/size/sizeSlice"
import colorReducer from "../features/color/colorSlice";
import coverReducer from "../features/cover/coverSlice";
import enquiryReducer from "../features/enquiry/enquirySlice";
import uploadReducer from "../features/upload/uploadSlice";
import couponReducer from "../features/coupon/couponSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    wines:wineReducer,
    property:propertyReducer,
    brand: brandReducer,
    cbrand:cologneBrandsReducer,
    winebrands: winebrandsReducer,
    cCategories: cameracategoryReducer,
    fCategories: fCategoryReducer,
    size:sizeReducer,
    wCategory:wCategoryReducer,
    pCategory: pCategoryReducer,
    cCategory:cCategoryReducer,
    bCategory: bCategoryReducer,
    blogs: blogReducer,
    cover:coverReducer,
    color: colorReducer,
    enquiry: enquiryReducer,
    upload: uploadReducer,
    coupon: couponReducer,
  },
});

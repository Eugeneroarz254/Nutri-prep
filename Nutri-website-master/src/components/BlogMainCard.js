import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs } from '../features/blogs/blogSlice';
import BlogCard from './BlogCard';
import moment from "moment";

const BlogMainCard = () => {
    const blogState = useSelector((state) => state?.blog?.blog);
    
    const dispatch = useDispatch();
    useEffect(() => {
      getblogs();
    }, []);
    const getblogs = () => {
      dispatch(getAllBlogs());
    };
  

    {blogState && blogState?.map((item,index)=>{
      if (index < 4) {
  return (
    <div className="col-3 px-0 blog-main-card" key={index}>
    <BlogCard
   id={item?._id}
  title={item?.title}
   description={item?.description}
   image={item?.images[0]?.url}
   date={moment(item?.createdAt).format( "MMMM Do YYYY, h:mm a"
   )}/>
   </div>
  )
  }

})}
}

export default BlogMainCard
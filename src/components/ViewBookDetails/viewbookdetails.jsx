import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { GrLanguage } from 'react-icons/gr';
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
const ViewBookDetails = () => {
  const navigate= useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(); // Initialize with null or an empty object instead of undefined
  const isLoggedIn =useSelector((state)=>state.auth.isLoggedIn);
  const role =useSelector((state)=>state.auth.role);
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`https://the-literary-loft-d64a.onrender.com/api/v1/get-book-by-id/${id}`);
      setData(response.data.data);
    };
    fetch();
  }, []);
  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
    bookid:id,
  };
  const HandleFavourite = async () => {
    const response = await axios.put("https://the-literary-loft-d64a.onrender.com/api/v1/add-book-to-favourite", {}, { headers });
    alert(response.data.message);
  };
  const handleCart= async () => {
    const response =await axios.put("https://the-literary-loft-d64a.onrender.com/api/v1/add-to-cart",{},{headers});
    alert(response.data.message);
  }
  const deletebook =async () =>{
    const response= await axios.delete("https://the-literary-loft-d64a.onrender.com/api/v1/delete-book",{headers});
    alert(response.data.message);
    navigate("/all-books")
  }
  return (
    <>
      {data && (
        <div className=' px-4 md:px-12  py-8 bg-zinc-900 flex  gap-8 flex-col lg:flex-row items-start'>
          <div className='  w-full lg:w-3/6 '>
            {" "}
            <div className="flex flex-col lg:flex-row justify-around bg-zinc-800 rounded  p-12 ">
            <img src={data.url} alt="/" className="h-[50vh] md:h-[60vh] lg:h-[70vh] rounded " />
            {isLoggedIn===true && role ==="user" &&(
              <div className="flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-4 lg:t-0 ">
              <button className="bg-white rounded lg:rounded-full text-3xl p-3 flex items-center justify-center" onClick={HandleFavourite}><FaHeart /><span className="ms-4 block lg:hidden">Favourites</span></button>
              <button className="text-white rounded lg:rounded-full text-3xl p-3 mt-8 md:mt-0 lg:mt-8 flex items-center justify-center bg-blue-500"onClick={handleCart}><FaShoppingCart /><span className="ms-4 block lg:hidden">Add to Cart</span></button>
            </div>
            )}
            {isLoggedIn===true && role ==="admin" &&(
              <div className="flex felx-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-4 lg:t-0 ">
              <Link to={`/update-book/${id}`} className="bg-white rounded lg:rounded-full text-3xl p-3 text-red-500 flex items-center justify-center">{""}<FaEdit /><span className="ms-4 block lg:hidden">Edit Book</span></Link>
              <button className="text-red-500 rounded lg:rounded-full text-3xl p-3 mt-8 md:mt-0 lg:mt-8 flex items-center justify-center bg-white" onClick={deletebook}>{""}<MdDeleteOutline /><span className="ms-4 block lg:hidden">Delete Book</span></button>
            </div>
            )}
            </div>
            </div>
          <div className='p-4 w-full md:w-3/6'>
            <h1 className="text-4xl text-zinc-300 font-semibold md:text-2xl">{data.title}</h1>
            <p className="text-zinc-400 mt-1 md:text-sm">by {data.author}</p>
            <p className="text-zinc-500 mt-4 text-xl md:text-base">{data.desc}</p>
            <p className="flex mt-4 items-center justify-start text-zinc-400">
              <GrLanguage className="me-3"/>{data.language}
            </p>
            <p className="mt-4 text-zinc-100 text-3xl font-semibold">
              Price:Rs.{data.price}{" "}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;
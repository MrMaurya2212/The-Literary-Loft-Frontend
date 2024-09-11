import axios from "axios";
import React, { useState, useEffect } from 'react';
import BookCard from "../components/BookCard/bookcard";
const AllBooks = () => {
  const [Data, setData] = useState();
    useEffect(() =>{
        const fetch =async()=>{
        const response= await axios.get("https://the-literary-loft-d64a.onrender.com/api/v1/get-all-book");
        setData(response.data.data);
        };
    fetch();
    },[]);
  return (
    <div className='bg-zinc-900 h-auto px-12 py-8'>
      <div>
        <h4 className='text-3xl text-yellow-100'>All Books</h4>
      </div>
      <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8'>
        {Data && Data.map((items,i)=><div key={i}>
            <BookCard data ={items}/>{" "}
        </div>)}
      </div>
    </div>
  )
}

export default AllBooks

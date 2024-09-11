import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Bookcard from '../BookCard/bookcard';
const Favourites = () => {
  const [favourite, setFavouritebook]= useState();
  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const response =  await axios.get("https://the-literary-loft-d64a.onrender.com/api/v1/get-favourite-books",{headers});
      setFavouritebook(response.data.data);
    }
    fetch();
  },[favourite]);
  
  return (
    <>
    { favourite && favourite.length===0 && (<div className='text-5xl h-[100%] font-semibold text-zinc-500 flex items-center justify-center w-full '>No Favourite Books</div> )}
     <div className='lg:grid lg:grid-cols-4 lg:gap-4 sm:flex sm:flex-wrap sm:flex-col'>
      { favourite && favourite.map((items,i) => (
      <div key={i} className=''>
      <Bookcard data={items} favourite={true}/>
      </div>
    ))}
    </div>
     </>
    
  )
}

export default Favourites

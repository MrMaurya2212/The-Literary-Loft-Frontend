import React from 'react';
import { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

const UserOrderHistory = () => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const [OrderHistory, setOrderHistory] = useState();

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("https://the-literary-loft-d64a.onrender.com/api/v1/get-order-history", { headers });
      setOrderHistory(response.data.data);
    };
    fetch();
  }, []);

  return (
    <>
      {OrderHistory && OrderHistory.length === 0 && (
        <div className='h-screen p-4 text-zinc-100 flex justify-center items-center'>
          <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>
            No Order History
          </h1>
        </div>
      )}
      {OrderHistory && OrderHistory.length > 0 && (
        <div className='h-screen p-0 md:p-4 text-zinc-100 overflow-y-auto'>
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'> 
            Your Order History
          </h1>
          <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
            <div className='w-[3%]'>
              <h1 className='text-center'>
                Sr.
              </h1>
            </div>
            <div className='w-[22%]'>
              <h1 className=''>Books</h1>
            </div>
            <div className='w-[45%]'>
              <h1 className=''>Description</h1>
            </div>
            <div className='w-[9%]'>
              <h1 className=''>Price</h1>
            </div>
            <div className='w-[16%]'>
              <h1 className=''>Status</h1>
            </div>
            <div className='w-none md:w-[5%] hidden md:block'>
              <h1 className=''>Mode</h1>
            </div>
          </div>
          {OrderHistory.map((items, i) => (
            <div className='bg-zinc-800 w-full rounded px-4 py-2 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer'>
              <div className='w-[3%]'>
                <h1 className='text-center'>{i + 1}</h1>
              </div>
              <div className='w-[22%]'>
                <Link to={`/view-book-details/${items.book._id}`} className='hover:text-blue-300'>
                  {items.book.title}
                </Link>
              </div>
              <div className='w-[45%]'>
                <h1>{items.book.desc.slice(0, 50)}...</h1>
              </div>
              <div className='w-[9%]'>
                <h1>{items.book.price}</h1>
              </div>
              <div className='w-[16%]'>
                <h1 className='text-green-500 font-semibold'>
                  {items.status === "Order placed" ? (
                    <div className='text-yellow-500'>{items.status}</div>
                  ) : items.status === "Canceled" ? (
                    <div className='text-red-500'>{items.status}</div>
                  ) : (
                    items.status
                  )}
                </h1>
              </div>
              <div className='w-none md:w-[5%] hidden md:block'>
                <h1 className='text-sm text-zinc-400'>COD</h1>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UserOrderHistory;
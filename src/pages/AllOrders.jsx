import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { FaUserLarge } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import SeeUserData from './SeeUserData';
const AllOrders = () => {
  const [userDiv, setuserDiv] = useState("hidden");
  const [userDivData, setuserDivData] = useState();
  const[Allorders, setAllorders] = useState();
  const [options, setoptions] = useState(-1);
  const [values, setValues] = useState({status:""});
  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch= async () => {
      const response =await axios.get("https://the-literary-loft-d64a.onrender.com/api/v1/get-all-orders",{headers});
      setAllorders(response.data.data);
    };
    fetch();
  }, [Allorders]);
  const change = (e) => {
    setValues({ status: e.target.value });
  };
  useEffect(() => {
  }, [values]);
  const submitchanges = async (i) => {
    if (Allorders && Allorders.length > 0) {
      const id = Allorders[i]._id;
      const updatedStatus = { status: values.status };
      const response = await axios.put(`https://the-literary-loft-d64a.onrender.com/api/v1/update-status/${id}`, updatedStatus, { headers });
      alert(response.data.message);
      const updatedAllorders = [...Allorders];
      updatedAllorders[i].status = values.status;
      setAllorders(updatedAllorders);
    } else {
      console.error("Allorders is not populated yet");
    }
  };
  Allorders && Allorders.splice(Allorders.length -1, 1);
  return (
    <>
    {
      !AllOrders && (<div className='text-zinc-600 items-center justify-center flex h-[100%]'>No Orders</div>
    )}
    {Allorders && Allorders.length> 0 && (
       
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
            <div className='w-[40%] md:w-[22%]'>
              <h1 className=''>Books</h1>
            </div>
            <div className='w-0 md:w-[45%] hidden md:block'>
              <h1 className=''>Description</h1>
            </div>
            <div className='w-[17%] md:w-[9%]'>
              <h1 className=''>Price</h1>
            </div>
            <div className='w-[30%] md:w-[16%]'>
              <h1 className=''>Status</h1>
            </div>
            <div className='w-[10%] md:w-[5%] '>
              <h1 className=''><FaUserLarge /></h1>
            </div>
          </div>
          {Allorders.map((items, i) => (
            <div key={items._id} className='bg-zinc-800 w-full rounded px-4 py-2 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer'>
              <div className='w-[3%]'>
                <h1 className='text-center'>{i + 1}</h1>
              </div>
              <div className='w-[40%] md:w-[22%]'>
                <Link to={`/view-book-details/${items.book._id}`} className='hover:text-blue-300'>
                  {items.book.title}
                </Link>
              </div>
              <div className='w-0 md:w-[45%] hidden md:block'>
                <h1>{items.book.desc.slice(0, 50)}...</h1>
              </div>
              <div className='w-[17%] md:w-[9%]'>
                <h1>{items.book.price}</h1>
              </div>
              <div className='w-[30%] md:w-[16%]'>
                <h1 className='font-semibold'>
                  <button
                    className='hover:scale-105 transition-all duration-300'
                    onClick={() => setoptions(options === i ? -1 : i)} >
                    {items.status === "Order placed" ? (
                      <div className='text-yellow-500'>{items.status}</div>
                    ) : items.status === "Canceled" ? (
                      <div className='text-red-500'>{items.status}</div>
                    ) : (
                      <div className='text-green-500'>{items.status}</div>
                    )}
                  </button>
                  {options === i && (
                    <div className='flex mt-4 '>
                      <select name='status' id='' className='bg-gray-500' onChange={change} value={values.status}>
                        {[
                          "Order placed",
                          "Out for Delivery",
                          "Delivered",
                          "Canceled",
                        ].map((items, i) => (
                          <option value={items} key={i}>
                            {items}
                          </option>
                        ))}
                      </select>
                      <button className='text-green-500 hover:text-pink-600 mx-2'onClick={() => {setoptions(-1); submitchanges(i);}}>
                        <FaCheck />
                      </button>
                    </div>
                  )}
                </h1>
              </div>
              <div className='w-[10%] md:w-[5%] '>
                <button className='text-xl hover:text-orange-500'
                onClick={()=> {
                  setuserDiv("fixed");
                  setuserDivData(items.user);
                }}>
                  <IoOpenOutline />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {userDivData && (
        <SeeUserData
        userDivData={userDivData}
        userDiv={userDiv}
        setuserDiv={setuserDiv}
        />
      )}
    </>
  )
}

export default AllOrders
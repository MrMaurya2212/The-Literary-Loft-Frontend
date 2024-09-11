import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true); // Add a loading state
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      setLoading(true); // Set loading to true when fetching data
      const response = await axios.get("https://the-literary-loft-d64a.onrender.com/api/v1/get-user-cart", { headers });
      setCart(response.data.data);
      setLoading(false); // Set loading to false when data is received
    };
    fetch();
  }, []);

  const deleteItem = async (bookid) => {
    const response = await axios.put(`https://the-literary-loft-d64a.onrender.com/api/v1/remove-from-cart/${bookid}`, {}, { headers });
    alert(response.data.message);
  };

  useEffect(() => {
    if (cart && cart.length > 0) {
      let total = 0;
      cart.map((items) => {
        total += items.price;
      });
      setTotal(total);
      total = 0;
    }
  }, [cart]);

  const PlaceOrder = async () => {
    try {
      const response = await axios.post(`https://the-literary-loft-d64a.onrender.com/api/v1/place-order`, { order: cart }, { headers });
      alert(response.data.message);
      setCart([]); // Reset the cart state to an empty array
      setTotal(0); // Reset the total state to 0
      navigate("/profile/orderHistory");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='bg-zinc-900 px-12 py-8 h-screen'>
      {loading ? (
        <div className='h-screen'>
          <div className='h-[100%] flex items-center justify-center flex-col'>
            <h1 className='text-5xl lg:text-6xl font-semibold text-zinc-400'>
              Loading...
            </h1>
          </div>
        </div>
      ) : (
        cart && cart.length === 0 ? (
          <div className='h-screen'>
            <div className='h-[100%] flex items-center justify-center flex-col'>
              <h1 className='text-5xl lg:text-6xl font-semibold text-zinc-400'>
                Empty Cart
              </h1>
            </div>
          </div>
        ) : (
          <>
            <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>
              Your Cart
            </h1>
            {cart.map((items, i) => (
              <div className='w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center' key={i}>
                <img src={items.url} alt="/" className='h-[20vh] md:h-[10vh] object-cover'/>
                <div className='w-full md:w-auto'>
                  <h1 className='text-2xl text-zinc-100 font-semibold text-start mt=2 md:mt-0'>
                    {items.title}
                  </h1>
                  <p className='text-normal text-zinc-300 mt-2 hidden lg:block'>
                    {items.desc ? items.desc.slice(0, 100) : ''}...
                  </p>
                  <p className='text-normal text-zinc-300 mt-2 hidden md:block lg:hidden'>
                    {items.desc ? items.desc.slice(0, 65) : ''}...
                  </p>
                  <p className='text-normal text-zinc-300 mt-2  block md:hidden'>
                    {items.desc ? items.desc.slice(0, 100) : ''}...
                  </p>
                </div>
                <div className='flex mt-4 w-full md:w-auto items-center justify-between'>
                  <h2 className='text-zinc-300 text-3xl font-semibold flex'>
                    Price: Rs.{items.price}
                  </h2>
                  <button className='bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12' onClick={() => deleteItem(items._id)}>
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            ))}
          </>
        )
      )}
      {cart && cart.length > 0 && (
        <div className='mt-4 w-full flex items-center justify-end'>
          <div className='p-4 bg-zinc-800 rounded'>
            <h1 className='text-3xl text-zinc-200 font-semibold'>
              Total Amount
            </h1>
            <div className='mt-3 flex items-center justify-between text-xl text-zinc-200'>
              <h2 >{cart.length} books</h2> <h2>Rs. {total}</h2>
            </div>
            <div className='w-[100%] mt-3'>
              <button className='bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-200' onClick={PlaceOrder}>
                Place Your Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { authActions } from "../../store/auth";
import { useDispatch } from "react-redux";

const Sidebar = ({ data, role1 }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className='bg-zinc-800 p-4 rounded flex flex-col justify-between items-center h-auto lg:h-[100%]'>
      <div className='flex items-center flex-col justify-center'>
        {" "}
        <img src={data.avatar} className='h-[12vh]'></img>
        <p className='mt-3 text-xl text-zinc-100 font-semibold'>
          {data.username}
        </p>
        <p className='mt-1 text-normal text-zinc-300 '>{data.email}</p>
        <div className='w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block'></div>
      </div>
      {role1 === "user" && (
        <div className='w-full flex-col items-center justify-center hidden lg:flex'>
          <Link
            to={"/profile"}
            className='text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all'>
            Favourites
          </Link>
          <Link
            to={"/profile/orderHistory"}
            className='text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all'>
            Order History
          </Link>
          <Link
            to={"/profile/settings"}
            className='text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all'>
            Settings
          </Link>
        </div>
      )}
      {role1 === "admin" && (
        <div className='w-full flex-col items-center justify-center hidden lg:flex'>
          <Link
            to={"/profile"}
            className='text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all'>
            All Orders
          </Link>
          <Link
            to={"/profile/add-book"}
            className='text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all'>
            Add Book
          </Link>
        </div>
      )}
      <button
        className='bg-zinc-900 w-3/6 lg:w-full mt-4 lg:mt-0 text-white font-semibold flex items-center justify-center py-2 rounded hover:bg-white hover:text-zinc-900 transition-all duration-300'
        onClick={handleLogout}
      >
        Log Out <FaArrowRightFromBracket className='ms-4' />
      </button>
    </div>
  );
};

export default Sidebar;
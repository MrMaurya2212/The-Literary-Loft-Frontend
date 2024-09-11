import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Profile/Sidebar';
import { Outlet } from 'react-router-dom';
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import MobileNav from '../components/Profile/MobileNav';
import { authActions } from '../store/auth';

const profile = () => {
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();
  const [profile,setProfile]=useState();
  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
    role:localStorage.getItem("role"),
  };

  useEffect(()=>{
    const fetch= async()=>{
      const response= await axios.get("https://the-literary-loft-d64a.onrender.com/api/v1/get-user-information",{headers});
      setProfile(response.data);
      console.log(role);
    };
    fetch();
  },[role]);

  useEffect(()=>{
    dispatch(authActions.changeRole(localStorage.getItem("role")));
  },[]);

  return (
    <div className=' bg-zinc-900 px-2 md:px-12 flex  flex-col md:flex-row w-full py-8 gap-4 text-white'>
    {profile && <>
      <div className='w-full md:w-1/6 h-auto lg:h-screen '>
        <Sidebar data={profile} role1={role} />
        <MobileNav/>
      </div>
      <div className='w-full md:w-5/6 h-screen '>
        <Outlet/>
      </div></>}
    </div>
  )
}

export default profile
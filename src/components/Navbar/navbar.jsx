import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGripLines } from "react-icons/fa";
import { useSelector } from 'react-redux';

const navbar = () => {
  const links = [{
    title: "Home",
    link: "/",
  }, {
    title: " All Books",
    link: "/all-books",
  }, {
    title: "Cart",
    link: "/cart",
  }, {
    title: "Profile",
    link: "/profile",
  },
  {
    title: "Admin Profile",
    link: "/profile",
  }, ];
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  const [MobileNav, setMobileNav] = useState("hidden");
  const role=useSelector((state)=>state.auth.role);
  if (!isLoggedIn) {
    // Remove Cart, Profile, and Admin Profile
    links.splice(4, 1); // Remove Admin Profile
    links.splice(3, 1); // Remove Profile
    links.splice(2, 1); // Remove Cart
  } else if (isLoggedIn && role === "user") {
    // Remove Admin Profile
    links.splice(4, 1);
  } else if (isLoggedIn && role === "admin") {
    // Remove Profile
    links.splice(3, 1);
  }
  return (
    <>
      <nav className=' z-50 relative bg-zinc-800 text-white px-4 py-2 flex items-center justify-between'>
        <Link to={"/"} className='flex items-center' > 
          <img className='h-10 me-4' 
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZC9B09wzo2qjIiF4fwbE3QljCd9Ektte2Tw&s' alt="Logo.png"></img>
          <h1 className='text-2xl font-semibold'>The Literary Loft</h1></Link>
        <div className='nav-links-literaryloft md:flex block items-center gap-4 '>
          <div className='hidden md:flex gap-4'>
            {links.map((items, i) => (
              <div key={i} className='flex items-center'>
              {items.title==="Profile" || items.title==="Admin Profile" ?<Link to={items.link} className='hover:bg-white  hover:text-zinc-800 px-4 py-1  rounded border border-blue-500  transition-all duration-300' key={i}>{items.title}</Link>
              :<Link to={items.link} className='hover:text-blue-500 transition-all duration-300' key={i}>{items.title}</Link>
              }
              </div>
            ))}
          </div>
          {isLoggedIn ? null : (
            <div className='hidden md:flex gap-4'>
              <Link to={"/Login"} className='hover:bg-white  hover:text-zinc-800 px-4 py-1 border-blue-500 rounded'>Login</Link>
              <Link to={"/Signup"} className='hover:bg-white hover:text-zinc-800  px-4 py-1 bg-blue-500 rounded'>SignUp</Link>
            </div>
          )}
          <button className='text-white text-2xl hover:text-zinc-400 block md:hidden' onClick={() => setMobileNav(MobileNav === "hidden"? "flex" : "hidden")}>
            <FaGripLines />
          </button>
        </div>
      </nav>
      <div className={`${MobileNav} fixed  top-0 left-0 w-full h-screen z-40 flex flex-col items-center justify-center bg-zinc-800 text-white`}>
        {links.map((items, i) => (
          <Link to={items.link} className='text-4xl font-semibold mb-8 hover:text-blue-500 transition-all duration-300' key={i} onClick={() => setMobileNav("hidden")}>{items.title}</Link>
        ))}
        {isLoggedIn === false ? (
          <>
            <Link to={"/Login"} className='text-4xl font-semibold  hover:bg-white mb-8 hover:text-zinc-800 px-8 py-2 border-blue-500 rounded' onClick={() => setMobileNav("hidden")}>
              Login</Link>
            <Link to={"/Signup"} className='text-4xl font-semibold hover:bg-white mb-8 hover:text-zinc-800  px-8 py-2 bg-blue-500 rounded' onClick={() => setMobileNav("hidden")}>SignUp
            </Link>
          </>
        ) : null}
      </div>
    </>
  );
};

export default navbar;
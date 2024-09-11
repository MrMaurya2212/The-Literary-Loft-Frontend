import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='h-[75vh] flex  flex-col md:flex-row items-center justify-center'>
    <div className='w-full mb-12 md:mb-0 lg:w-3/6 flex flex-col items-center lg:items-start justify-center'><h1 className='text-4xl lg:text-6xl font-semibold text-yellow-100 text-center lg:text-left'>A Cozy Corner for Bookworms</h1>
    <p className='mt-4 text-xl text-center lg:text-left text-zinc-300'> Step into a world of words, where stories come alive and imagination knows no bounds. Find inspiration, recommendations, and a welcoming space for readers and writers alike.</p>
    <div className='mt-8'><Link to={"/all-books"} className='text-yellow-100 text-xl lg:text-2xl font-semibold border-yellow-100 px-10 py-3 hover:bg-zinc-800 rounded-full'>Enter The Loft</Link></div>
    </div>
    <div className='w-full lg:w-3/6 h-auto lh:h-[100%] flex items-center justify-center'>
    <img src="./room.jpg" alt="room" />
    </div>
    </div>
  )
}

export default Hero

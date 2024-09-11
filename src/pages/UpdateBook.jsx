import React ,{useState, useEffect} from 'react'
import axios from "axios";
import { useParams, useNavigate  } from 'react-router-dom';
const UpdateBook = () => {
  const navigate= useNavigate();
  const [data, setData] =useState({
    url: "",
    title:"",
    author:"",
    price:"",
    desc:"",
    language:"",
  });
  
  const {id}= useParams();
  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
    bookid:id
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`https://the-literary-loft-d64a.onrender.com/api/v1/get-book-by-id/${id}`);
      setData(response.data.data);
    };
    fetch();
  }, []);
  const change= (e) =>{
    const {name, value}= e.target;
    setData({...data,[name]:value});
  };
  const  submit= async()=> {
    try{
      if(data.url==="" ||
        data.title===""||
        data.author===""||
        data.price===""||
        data.language===""
      ){
        alert("All Fields are Required!")
      }else{
        const response= await axios.put("https://the-literary-loft-d64a.onrender.com/api/v1/update-book",data,{headers});
        setData({
          url:"",
          title:"",
          price:"",
          desc:"",
          language:"",
          author:"",
        });
        alert(response.data.message);
        navigate(`/view-book-details/${id}`);
      }
    }catch(error){
      alert(error.response.data.message);
    }
  };
  return (
    <div className=' bg-zinc-900 h-[100%] p-0 md:p-4 flex flex-col'>
      <h1 className='tetx-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
        Update Book
      </h1>
      <div className='  flex-grow p-4 bg-zinc-800 rounded'>
        <div>
          <label htmlFor='' className='text-zinc-400'>
            Image
          </label>
          <input
            type="text"
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            placeholder='url or image'
            name='url'
            value={data.url}
            onChange={change}/>
        </div>
        <div className='mt-4'>
          <label htmlFor='' className='text-zinc-400'>
            Title
          </label>
          <input
             type="text"
             className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
             placeholder='title of the book'
             name='title'
             required
             value={data.title}
             onChange={change}/>
        </div>
        <div className='mt-4'>
          <label htmlFor='' className='text-zinc-400'>
            Author 
          </label>
          <input
            type="text"
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            placeholder='author of the book'
            name='author' // This was missing
            required
            value={data.author}
            onChange={change}/>
        </div>
        <div className='mt-4 flex gap-4'>
          <div className='w-3/6'>
            <label htmlFor='' className='text-zinc-400'>
              Language 
            </label>
            <input
              type="text"
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='language of the book'
              name='language'
              required
              value={data.language}
              onChange={change}/>
          </div>
          <div className='w-3/6'>
          <label htmlFor='' className='text-zinc-400'>
              Price 
            </label>
            <input
              type="number"
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='price of the book'
              name='price'
              required
              value={data.price}
              onChange={change}/>
          </div>
        </div>
        <div className='mt-4'>
          <label htmlFor='' className='text-zinc-400'>
            Description 
          </label>
          <textarea
             type="text"
             className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
             rows={5}
             placeholder='description of the book'
             name='desc'
             required
             value={data.desc}
             onChange={change}/>
        </div>
        <button className='mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300'
        onClick={submit}>
          Update Book
        </button>
      </div> 
    </div>
  )
}

export default UpdateBook

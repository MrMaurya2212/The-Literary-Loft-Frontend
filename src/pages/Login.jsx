import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authActions } from '../store/auth';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const Login = () => {
  const [values, setValues] = useState({
    username: '',
    password: '',
    avatar: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({...values, [name]: value });
  };

  const submit = async () => {
    try {
      if (values.username === '' || values.password === '') {
        alert('All fields are required');
      } else {
        values.avatar = 'https://static-00.iconduck.com/assets.00/user-icon-1024x1024-dtzturco.png';
        const response = await axios.post('https://the-literary-loft-d64a.onrender.com/api/v1/sign-in', values);
        console.log(response.data);
        dispatch(
          authActions.login({
            token: response.data.token,
            id: response.data.id,
            role: response.data.role,
          })
        );
        localStorage.setItem('id', response.data.id);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);
        navigate('/profile');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert('Invalid username or password');
      } else {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className='h-screen bg-zinc-900 px-12 py-8 flex items-center justify-center'>
      <div className='bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
        <p className='text-zinc-200 text-xl'>Log In</p>
        <div className='mt-4'>
          <div>
            <label htmlFor='' className='text-zinc-400'>
              Username
            </label>
            <input
              type='text'
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='username'
              name='username'
              required
              value={values.username}
              onChange={change}
            />
          </div>
          <div className='mt-4'>
            <label htmlFor='' className='text-zinc-400'>
              Password
            </label>
            <input
              type='password'
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='password'
              name='password'
              required
              value={values.password}
              onChange={change}
            />
          </div>
          <div className='mt-4'>
            <button
              className='w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-700'
              onClick={submit}
            >
              Log In
            </button>
          </div>
          <p className='flex mt-4 items-center justify-center text-zinc-200 font-semibold'>OR</p>
          <p className='flex mt-4 items-center justify-center text-zinc-500 font-semibold'>
            Don't have an account?{' '}
            <Link className='hover:bg-blue-600' to={'/Signup'}>
              <u>SignUp</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
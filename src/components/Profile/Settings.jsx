import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Settings = () => {
  const [profile, setProfile] = useState();
  const [value, setValue] = useState({ address: '' });
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setValue({ ...value, [name]: value });
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get('https://the-literary-loft-d64a.onrender.com/api/v1/get-user-information/', { headers });
      setProfile(response.data);
      setValue({ address: response.data.address });
    };
    fetch();
  }, []);

  const submitAddress = async () => {
    try {
      const response = await axios.put('https://the-literary-loft-d64a.onrender.com/api/v1/update-address', { address: value.address }, { headers });
      alert(response.data.message);
      setProfile({ ...profile, address: value.address }); // Update the profile state with the new address
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {profile && (
        <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
            Settings
          </h1>
          <div className='flex gap-12'>
            <div className=''>
              <label htmlFor=''>Username</label>
              <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>
                {profile.username}
              </p>
            </div>
            <div className=''>
              <label htmlFor=''>Email</label>
              <p className='p-2 rounded bg-zinc-500 mt-2 font-semibold'>
                {profile.email}
              </p>
            </div>
          </div>
          <div className='mt-4 flex flex-col'>
            <label htmlFor=''>Address</label>
            <textarea
              className='p-2 rounded bg-zinc-800 w-full mt-2 font-semibold'
              rows={5}
              placeholder='Address'
              name='address'
              value={value.address}
              onChange={change}
            />
          </div>
          <div className='mt-4 flex justify-end'>
            <button
              className='bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400'
              onClick={submitAddress}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
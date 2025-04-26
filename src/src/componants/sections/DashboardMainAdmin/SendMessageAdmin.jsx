import React from 'react';
import SearchBar from '../../ui/SearchBar';

const SendMessageAdmin = () => {
  return (
    <div>
        <h1 className='text-xl lg:text-4xl font-bold text-primary'>Send message for users</h1>

        <div className='flex items-center my-10'>
            <SearchBar />
            <button className='bg-primary text-white px-4 py-2 rounded-lg ml-4'>Select All</button>
        </div>

        <main className='h-60'>
            ...
        </main>

        <div className='flex space-x-4 items-center my-5'>
            <input 
                type="text"
                placeholder="Enter your message here..."
                className="w-full p-3 text-secondaire border border-primary rounded-4xl  placeholder:text-secondaire"
            
            />
            <button className='bg-primary text-white px-4 py-2 rounded-lg'>Send</button>
        </div>
    </div>
  )
}

export default SendMessageAdmin
import React, { useEffect } from 'react'

import useStore from '../store';
import { useState } from 'react';


const Sidebar = () => {
  const [isLoading,setIsLoading]=useState(false)
  const {selectedCollection,setSelectedCollection,collections,isDarkTheme,fetchCollections,user} = useStore();
   useEffect(() => {
       setIsLoading(true)
       if (user) {
         fetchCollections()
         setIsLoading(false)
       }
     }, [user, fetchCollections])

     if(isLoading) return <p>Loading....</p>
  return (
    <div className={`w-64 p-4 dark:bg-gray-800 bg-gray-200 h-screen`}>
        <h2 className="text-xl font-semibold mb-4 dark:text-white text-black">Collections</h2>
        <ul>
          {collections?.length > 0 && collections?.map((col) => (
            <li
              key={col?._id}
              onClick={() => setSelectedCollection(col)}
              className={`p-2 rounded flex items-center space-x-2 ${
                col?._id === selectedCollection?._id
                  ? ' bg-pink-200 dark:bg-pink-600 text-black dark:text-white'
                  : 'text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 focus:ring-2 focus:ring-offset-pink-300'
              }`}
            >
              <span>{col?.icon}</span>
              <span>{col?.name}</span>
            </li>
          ))}
        </ul>
      </div>
  )
}

export default Sidebar
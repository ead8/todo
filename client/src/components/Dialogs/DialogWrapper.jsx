import React from 'react'

const DialogWrapper = ({ children }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="p-6 w-full max-w-lg sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl rounded-lg shadow-lg dark:bg-gray-800 dark:text-white bg-white text-black">
        {children}
      </div>
    </div>
  );
};



export default DialogWrapper
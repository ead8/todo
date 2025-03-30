import React, { useState } from 'react'

const Input = ({ value, onChange, placeholder }) => {
  const [error, setError] = useState("")
  const handleBlur = () => {
    if (!value.trim()) {
      setError("This field is required");
    } else {
      setError("");
    }
  };

  return (
    <div>
      <input
        type="text"
        required
        autoComplete="off"
        autoFocus
        onFocus={(e) => e.target.select()}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onBlur={handleBlur}
        className={`p-2 border rounded  focus:ring-2 focus:ring-pink-400 focus:outline-none hover:border-pink-400 transition-all duration-200 ease-in-out w-full mb-4 bg-white text-black border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600`}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}

export default Input
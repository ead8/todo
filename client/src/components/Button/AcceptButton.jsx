import React from 'react'

const AcceptButton = ({onClick, text}) => {
  return (
    <button
    onClick={onClick}
    className="px-4 py-2 rounded bg-pink-400 dark:bg-pink-500 dark:hover:bg-pink-600 text-white  hover:bg-pink-500 transition-colors ease-in-out"
  >
    {text}
  </button>
  )
}

export default AcceptButton
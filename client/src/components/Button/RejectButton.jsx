import React from 'react'

const RejectButton = ({ onClick, text }) => {
    return (
        <button
            onClick={onClick}
            className="px-4 py-2 bg-gray-200 dark:hover:bg-gray-600 dark:bg-gray-400 rounded hover:bg-gray-300 transition-colors ease-in-out"
        >
            {text}
        </button>
    )
}

export default RejectButton
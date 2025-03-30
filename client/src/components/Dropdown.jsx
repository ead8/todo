import React from 'react'

const Dropdown = ({ setEditTaskDialogOpen, setNewTaskDialogOpen, setIsEditing, setIsDeleteDialogOpen, setOpenDropdown }) => {
    return (
        <div className="absolute right-0 mt-2 top-3 w-40 bg-white dark:bg-[#1f1f1f] rounded-md shadow-lg z-10">
            <ul className="py-1 text-gray-700 dark:text-white">
                <li
                    onClick={() => {
                        setNewTaskDialogOpen(true);
                        setOpenDropdown(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#313131] cursor-pointer"
                >
                    Add Subtask
                </li>
                <li
                    onClick={() => {
                        setIsEditing(true);
                        setEditTaskDialogOpen((prev) => !prev);
                        // if (isEditTaskDialogOpen) {
                        setOpenDropdown(false);
                        // }
                    }}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#313131] cursor-pointer"
                >
                    Edit Task
                </li>
                <li
                    onClick={() => {
                        setIsDeleteDialogOpen(true)
                        setOpenDropdown(false);
                    }}
                    className="px-4 py-2 hover:bg-red-100 dark:hover:bg-[#313131] text-red-500 cursor-pointer"
                >
                    Delete Task
                </li>
            </ul>
        </div>
    )
}

export default Dropdown
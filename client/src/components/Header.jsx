import React, { useState } from 'react'
import useStore from '../store';
import { FaUser } from 'react-icons/fa';
import { IoMdAdd } from "react-icons/io";
import LogoutDialog from './Dialogs/LogoutDialog';
import NewTaskCreateDialog from './Dialogs/NewTaskDialog';
import { createTask } from '../api/task';
import { useAsyncFn } from '../hooks/useAsync';
import toast from 'react-hot-toast';

const Header = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false)
  const [newTask, setNewTask] = useState('');
  const { isDarkTheme, updateCollectionLocal,toggleTheme, createLocalTask,logout } = useStore();
  const { error,execute: createTaskFn } = useAsyncFn(createTask)
if(error) {
  toast.error(error || "Something went wrong")
}  const onSubTaskAdd = (title,date,collectionId) => {
    if (!title.trim()) return;
    return createTaskFn(collectionId, title, null,date).then((result) => {
      toast.success("Task created successfully")
        createLocalTask(result)
        updateCollectionLocal(collectionId, result)
        setNewTask('')
        setIsDialogOpen(false)
    })
}
  

  return (
    <header className={`flex justify-between items-center p-2 dark:bg-gray-800 bg-slate-200 shadow`}>
      <div className="flex items-center">
        <span className="text-xl font-bold">TODO</span>
      </div>
      <div className="flex relative space-x-3">
        <button
          onClick={() => setIsDialogOpen(true)}
          className="p-2 bg-pink-400 dark:bg-pink-600 text-white rounded-md"
        >
          <IoMdAdd size={20} />
        </button>
        <button className='p-2 bg-gray-200 border-none rounded-full' onClick={() => setIsLogoutDialogOpen(true)} >
          <FaUser />
          
        </button>
        
          {isLogoutDialogOpen && (
          <LogoutDialog isLogoutDialogOpen={isLogoutDialogOpen} setIsLogoutDialogOpen={setIsLogoutDialogOpen} logout={logout} />  
          )}
       
        <div
        className={`flex items-center px-2 rounded-full cursor-pointer ${
          isDarkTheme ? "bg-pink-600" : "bg-gray-300"
        }`}
        onClick={toggleTheme}
      >
        <span className={`text-white transition-transform ${ isDarkTheme ? "translate-x-0" : "translate-x-6"}`}>{isDarkTheme ? "Dark" : "Light"}</span>
        <div
          className={`w-4 h-4 ml-2 rounded-full bg-black transition-transform ${
            isDarkTheme ? "translate-x-0" : "-translate-x-12"
          }`}
        ></div>
      </div>
      </div>
     

      {isDialogOpen && (<NewTaskCreateDialog isTaskDialogOpen={isDialogOpen} setIsTaskDialogOpen={setIsDialogOpen} onTaskAdd={onSubTaskAdd} 
      />)}

    </header>
  )
}

export default Header
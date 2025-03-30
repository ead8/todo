import React, { useEffect, useState } from 'react';

import toast from 'react-hot-toast';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { HiDotsVertical } from "react-icons/hi";
import { IoMdAdd } from 'react-icons/io';
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate, useParams } from 'react-router-dom';
import { deleteCollectionApi, getSingleCollection, updateCollectionApi } from '../api/collection';
import { createTask } from '../api/task';
import DeleteCollectionDialog from '../components/Dialogs/DeleteCollectionDialog';
import EditCollectionDialog from '../components/Dialogs/EditCollection';
import NewTaskCreateDialog from '../components/Dialogs/NewTaskDialog';
import DropdownForCollection from '../components/DropdownForCollection';
import Loader from '../components/Loader';
import Sidebar from '../components/Sidebar';
import TodoList from '../components/TodoList';
import { useAsyncFn } from '../hooks/useAsync';
import useStore from '../store';
function CollectionDetail() {
  const { id } = useParams();
  const {
    selectedCollection,
    toggleFavoriteLocal,
    setSelectedCollection,
    getGroupedTasks,
    tasks, setTasks,
    deleteCollectionLocal,
    EditCollectionLocal

  } = useStore();
  const [newTask, setNewTask] = useState('');
  const [isLoading,setIsLoading] = useState(true)

  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const { loading: createTaskLoading, error: createTaskError, value, execute: createTaskFn } = useAsyncFn(createTask)
  const updateCollectionFn = useAsyncFn(updateCollectionApi)
  const deleteCollectionFn = useAsyncFn(deleteCollectionApi)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDropDownOpen, setIsDropdownOpen] = useState(false)
  const navigate = useNavigate();
  const rootTask = getGroupedTasks(null, false)
  const completedTasks = getGroupedTasks(null, true)
  const handleFavoriteToggle = () => {
    return updateCollectionFn.execute(selectedCollection._id, { isFavorite: !selectedCollection.isFavorite }).then((result) => {
    
      toggleFavoriteLocal(result)
    })
  }
  if (createTaskError) {
    toast.error(error || "Something went wrong")
  }
  const onTaskAdd = (title) => {
    if (!title.trim()) return;
    return createTaskFn(selectedCollection._id, title).then((result) => {
      setTasks([result, ...tasks])
      toast.success("Task created successfully")
      setNewTask('')
      setIsTaskDialogOpen(false)
    }
    )

  }
  useEffect(() => {
    if (id) {
      setIsLoading(true)
      getSingleCollection(id)
        .then((res) => {
          setSelectedCollection(res);
          setIsLoading(false)
        })
        .catch((error) => {
          console.log(error)
          setIsLoading(false)
          toast.error("Failed to fetch collection details")
        });
    }
  }, [id]);
  
  useEffect(() => {
    if (!selectedCollection?.tasks) return
    setTasks(selectedCollection?.tasks)

  }, [selectedCollection?.tasks]);


  const onBack = () => {
    setSelectedCollection(null);
    navigate('/');
  };
  const onCollectionEdit = (name) => {
    if (!name.trim()) return;
    return updateCollectionFn.execute(selectedCollection._id, { name }).then((result) => {
      setSelectedCollection(result)
      // Update the local store with the new collection name
      
      EditCollectionLocal(selectedCollection._id, result)
      toast.success("Collection updated successfully")
      setIsEditDialogOpen(false)
    })
  }
  const onCollectionDelete = () => {
    return deleteCollectionFn.execute(id).then((result) => {
      navigate('/')
      deleteCollectionLocal(id)
      setIsDeleteDialogOpen(false)
    })
  }

  if (!id || !selectedCollection) return 
  if (isLoading) return <Loader/>
  return (
    <div className="flex w-full h-screen">
      {/* Sidebar - Fixed Width */}
      <div className="w-64 h-screen flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content Wrapper */}
      <div className="flex flex-1 flex-col h-screen overflow-hidden dark:bg-[#0b0b0b] bg-slate-100 text-slate-400 dark:text-white">
  {/* Header - Sticks to Top */}
  <div className="p-2 bg-inherit sticky top-0 z-10">
    <div className="flex items-center justify-between space-x-2">
      <div className="flex items-center space-x-2">
        <button onClick={onBack} className="text-gray-400">
          <IoArrowBackSharp size={25} />
        </button>
        <h1 className="text-2xl font-semibold text-black dark:text-white">{selectedCollection?.name}</h1>
      </div>
      <div className="flex items-center space-x-2 relative">
        <button className="text-pink-500" onClick={handleFavoriteToggle}>
          {selectedCollection?.isFavorite ? <AiFillHeart size={25} /> : <AiOutlineHeart size={25} className="text-gray-400" />}
        </button>
        <button onClick={() => setIsDropdownOpen(!isDropDownOpen)}>
          <HiDotsVertical size={25} className="text-gray-400" />
        </button>
        {isDropDownOpen && (
          <DropdownForCollection 
            setEditDialogOpen={setIsEditDialogOpen} 
            setIsDeleteDialogOpen={setIsDeleteDialogOpen} 
            setOpenDropdown={setIsDropdownOpen} 
          />
        )}
      </div>
    </div>
  </div>

  
  <div className="flex-1 px-4 mt-4 pb-4 overflow-y-auto flex justify-center">
    <div className='w-full max-w-4xl'>
    <button
      onClick={() => setIsTaskDialogOpen(true)}
      className="flex items-center space-x-2 mb-4 p-2 text-white w-full dark:bg-black rounded-md shadow-sm shadow-slate-300 dark:shadow-slate-100"
    >
      <div className="text-xl bg-pink-500 p-2 rounded-md"><IoMdAdd size={20} /></div>
      <span className="dark:text-white text-black">Add a task</span>
    </button>

    {rootTask?.length > 0 && (
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Tasks - {rootTask?.length}</p>
    )}

    {(rootTask?.length === 0 && completedTasks?.length === 0) ? (
      <div className="flex flex-col items-center justify-center h-64">
        <span className="text-6xl mb-4">📭</span>
        <p className="text-gray-500 dark:text-gray-400">No tasks yet</p>
      </div>
    ) : rootTask?.length > 0 && (
      <div className="flex flex-col gap-y-3 dark:bg-[#0b0b0b] px-3 py-2 rounded-md">
        <TodoList tasks={rootTask} />
      </div>
    )}

    {completedTasks?.length > 0 && (
      <>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 mt-4">Completed - {completedTasks?.length}</p>
        <div className="flex flex-col gap-2 gap-y-3 dark:bg-[#0b0b0b] px-3 py-2 rounded-md">
          <TodoList tasks={completedTasks} level={1} />
        </div>
      </>
    )}
    </div>
  </div>
  
    {/* Task Creation Dialog */}
    {isTaskDialogOpen && (
      <NewTaskCreateDialog
        isTaskDialogOpen={isTaskDialogOpen}
        setIsTaskDialogOpen={setIsTaskDialogOpen}
        onTaskAdd={onTaskAdd}
      />
    )}

    {/* Edit Collection Dialog */}
    {isEditDialogOpen && (
      <EditCollectionDialog
        isEditDialogOpen={isEditDialogOpen}
        setEditDialogOpen={setIsEditDialogOpen}
        onCollectionEdit={onCollectionEdit}
        collectionName={selectedCollection?.name}
      />
    )}

    {/* Delete Collection Dialog */}
    {isDeleteDialogOpen && (
      <DeleteCollectionDialog
        collectionId={selectedCollection?._id}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        onCollectionDelete={onCollectionDelete}
      />
    )}
</div>
    </div>
  );
};

export default CollectionDetail;
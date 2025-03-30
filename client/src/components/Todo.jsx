import React, { useEffect, useState } from 'react'
import useStore from '../store';
const dateFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "short",
    timeStyle: "short",
})
import { CgCalendarDates } from "react-icons/cg";
import { MdOutlineEdit, MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowRight } from 'react-icons/md'
import TodoList from './TodoList';
import { createTask, updateTaskApi, deleteTaskApi } from '../api/task';
import { useAsyncFn } from '../hooks/useAsync';
import { IoIosList } from "react-icons/io";
import EditTaskDialog from './Dialogs/EditTaskDialog';
import DeleteTaskDialog from './Dialogs/DeleteTaskDialog';
import NewTaskCreateDialog from './Dialogs/NewTaskDialog';
import { getSubtaskCount, getTimeAgo } from '../lib/utils';
import Dropdown from './Dropdown';
const Todo = ({ task }) => {

    const { _id, title, createdAt, completed } = task;
    const { execute: createTaskFn } = useAsyncFn(createTask)
    const updateTaskFn = useAsyncFn(updateTaskApi)
    const deleteTaskFn = useAsyncFn(deleteTaskApi)

    const { getGroupedTasks, setTasks, selectedCollection, deleteTask, createLocalTask, updateTask } = useStore()

    const [areChildrenVisible, setAreChildrenVisible] = useState(false)
    const [openDropdown, setOpenDropdown] = useState(false)
    const [newTask, setNewTask] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const [editTask, setEditTask] = useState('')
    const [isEditTaskDialogOpen, setEditTaskDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [newTaskDialogOpen, setNewTaskDialogOpen] = useState(false);
    const subTasks = getGroupedTasks(_id, false)
    useEffect(() => {
        if (isEditing) {
            setEditTask(title); // Initialize with the task title
        }
    }, [isEditing]);


    const onSubTaskAdd = (title,date,collectionId=selectedCollection?._id) => {
        if (!title.trim()) return;
        return createTaskFn(collectionId, title, _id,date).then((result) => {
            createLocalTask(result)
            setNewTask('')
            setNewTaskDialogOpen(false)
        })
    }
    const onTaskEdit = (title) => {
        if (!title.trim()) return;
        return updateTaskFn.execute(_id, title).then((result) => {
            updateTask(_id, result)
            setEditTask('')
            setIsEditing(false)
            setEditTaskDialogOpen(false)
        })
    }

    const onTaskDelete = () => {
        return deleteTaskFn.execute(selectedCollection?._id, _id).then((result) => {
            deleteTask(_id)
            setEditTaskDialogOpen(false)
        })
    }
    const toggleTask = (completed) => {
        console.log("completed toggle", completed)
        return updateTaskFn.execute(_id, title, completed).then((result) => {
            updateTask(_id, result)
        })
    }
    return (
        <div className='flex flex-col  bg-[#f0f0f0] dark:bg-zinc-900 text-slate-400 dark:text-white  rounded-md p-2'>
            <div className="flex items-center justify-between p-2">
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={completed}
                        onChange={() => toggleTask(!completed)}
                        className={`h-5 w-5 `}
                      />
                     <span className={completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-black dark:text-white'}>
                        {title}
                    </span>

                </div>
                <div className="flex relative items-center space-x-2">
                    {areChildrenVisible ? <><MdOutlineEdit className='cursor-pointer' onClick={() => setOpenDropdown((prev) => !prev)} />
                        <MdOutlineKeyboardArrowDown className='cursor-pointer' onClick={() => setAreChildrenVisible((prev) => !prev)} /></>
                        :
                        <MdOutlineKeyboardArrowRight size={25} className='cursor-pointer' onClick={() => setAreChildrenVisible((prev) => !prev)} />
                    }
                   
                    {
                        openDropdown && <Dropdown setEditTaskDialogOpen={setEditTaskDialogOpen} setNewTaskDialogOpen={setNewTaskDialogOpen} setIsEditing={setIsEditing} setIsDeleteDialogOpen={setIsDeleteDialogOpen} setOpenDropdown={setOpenDropdown} />
                    }
                </div>
            </div>
            {
                areChildrenVisible &&

                <div className='flex flex-col dark:bg-[#0b0b0b] bg-gray-100 px-2 py-3 rounded-md'>
                    <div className='flex gap-2 items-center'>
                        {subTasks.length > 0 && (<> <IoIosList className='text-pink-500' />
                            <span className='text-xs font-light'>{getSubtaskCount(task, getGroupedTasks)}</span></>)}
                        <CgCalendarDates />
                        <span className='font-light text-xs'>{getTimeAgo(createdAt)}</span>
                    </div>
                    <div className='flex flex-col gap-2 dark:bg-[#1d1d1d] bg-[#e7e7e7] rounded-md'>
                        {
                            subTasks?.length > 0 && <TodoList tasks={subTasks} />
                        }
                    </div>
                </div>

            }<div>


                {newTaskDialogOpen && (<NewTaskCreateDialog isTaskDialogOpen={newTaskDialogOpen} setIsTaskDialogOpen={setNewTaskDialogOpen} onTaskAdd={onSubTaskAdd} parentId={_id} />)}

                {isEditTaskDialogOpen && (<EditTaskDialog isEditTaskDialogOpen={isEditTaskDialogOpen} setEditTaskDialogOpen={setEditTaskDialogOpen} isEditing={isEditing} editTask={editTask} setEditTask={setEditTask} onTaskEdit={onTaskEdit} />)}

                {isDeleteDialogOpen && (<DeleteTaskDialog isDeleteDialogOpen={isDeleteDialogOpen} setIsDeleteDialogOpen={setIsDeleteDialogOpen} onTaskDelete={onTaskDelete} />)}
            </div>
        </div>


    )
}

export default Todo
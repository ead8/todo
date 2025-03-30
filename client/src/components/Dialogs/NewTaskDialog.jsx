import React, { useEffect, useState } from 'react'
import useStore from '../../store';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import RejectButton from '../Button/RejectButton';
import AcceptButton from '../Button/AcceptButton';
import Input from '../Input';
import DialogWrapper from './DialogWrapper';
const CustomDatePickerInput = ({ value, onClick }) => (
  <button
    onClick={onClick}
    className="p-3 border rounded-lg flex-1 bg-white text-black border-gray-300 
      dark:bg-gray-700 dark:text-white dark:border-gray-600 
      focus:ring-2 focus:ring-pink-400 focus:outline-none hover:border-pink-400 transition"
  >
    {value || "Select a date"}
  </button>
);
const NewTaskCreateDialog = ({ isTaskDialogOpen, setIsTaskDialogOpen, onTaskAdd, parentId = null }) => {
  const [newTask, setNewTask] = useState('')
  const [startDate, setStartDate] = useState('');
  const { collections, selectedCollection } = useStore()
  const [selectValue, setSelectValue] = useState('');
  useEffect(() => {
    if (selectedCollection) {
      setSelectValue(selectedCollection._id);
    } else if (collections?.length > 0) {
      setSelectValue(collections[0]._id); // Default to the first collection if no selection exists
    }
  }, [selectedCollection, collections]);
  console.log("select value ->", selectValue)
  if (!isTaskDialogOpen) return null;
  return (
    <DialogWrapper>
      <h2 className="text-lg font-semibold mb-4">Add a new task</h2>
      <Input value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Task name" />
      <div className='flex gap-2 mb-2-'>
        {!parentId &&
          <div className='flex-1'>
            <select
              value={selectedCollection ? selectedCollection?._id : selectValue}
              defaultValue={selectedCollection?._id || (collections?.length > 0 ? collections[0]._id : "")}
              disabled={selectedCollection ? true : false}
              onChange={(e) => setSelectValue(e.target.value)}
              className='p-3 border rounded-lg w-full mb-4 bg-white text-black border-gray-300 
              dark:bg-gray-700 dark:text-white dark:border-gray-600 
                focus:ring-2 focus:ring-pink-400 focus:outline-none hover:border-pink-400 transition-all duration-200 ease-in-out'>
              <option value="" disabled>Select a collection</option>
              {collections?.map((collection) => (
                <option key={collection?._id} value={collection?._id}>
                  {collection.name}
                </option>

              ))}
            </select>

          </div>}
        <div className='flex-1'>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            customInput={<CustomDatePickerInput />}
            className="w-full"
          />
        </div>
      </div>
      <div className="flex justify-end space-x-2">

        <RejectButton onClick={() => setIsTaskDialogOpen(false)} text="Cancel" />

        <AcceptButton onClick={() => onTaskAdd(newTask, startDate, selectValue, parentId)} text="Add" />
      </div>
    </DialogWrapper>
  )
}




export default NewTaskCreateDialog
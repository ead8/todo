
import React from 'react'
import { FaRegCircle } from 'react-icons/fa';

const CollectionCard =({ collection, onClick })=> {
  const completedTasks = collection?.tasks?.filter((task) => !task.parent_id && task.completed).length;
  const totalTasks = collection?.tasks?.filter((task) => !task.parent_id).length;
  
    return (
      <div
        onClick={onClick}
        className="p-4 bg-slate-50 dark:bg-gray-800 rounded-lg shadow cursor-pointer hover:bg-slate-100 dark:hover:bg-gray-700"
      >
        <div className="flex flex-col space-y-4 p-2 ">
       
            <span className="text-3xl">{collection?.icon}</span>
            <div className='flex items-center justify-between w-full'>
            <div className="flex flex-col">
              <h2 className="text-xl font-medium text-black dark:text-white">{collection?.name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {completedTasks}/{totalTasks} done
              </p>
            </div>
            <FaRegCircle size={30} className={`${collection?.isFavorite ? 'text-pink-500' : 'text-gray-500'}`}/>
            </div>
          </div>

        </div>
      
    )
  
  }


export default CollectionCard
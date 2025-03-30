import React from 'react'
import DeleteButton from '../Button/DeleteButton'
import RejectButton from '../Button/RejectButton'

const DeleteTaskDialog = ({ isDeleteDialogOpen, setIsDeleteDialogOpen, onTaskDelete }) => {
    return (
        <>{isDeleteDialogOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className={`p-6 rounded-lg shadow-lg dark:bg-gray-800 dark:text-white bg-white text-black`}>
                    <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this task?</h2>
                    <div className="flex justify-end space-x-2">
                        <RejectButton onClick={() => setIsDeleteDialogOpen(false)} text="Cancel" />
                        <DeleteButton onClick={onTaskDelete} />
                    </div>
                </div>
            </div>
        )}</>
    )
}

export default DeleteTaskDialog
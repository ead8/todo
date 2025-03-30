import React from 'react'
import AcceptButton from '../Button/AcceptButton'
import RejectButton from '../Button/RejectButton'
import Input from '../Input'
import DialogWrapper from './DialogWrapper'

const EditTaskDialog = ({ isEditTaskDialogOpen, setEditTaskDialogOpen, isEditing, editTask, setEditTask, onTaskEdit }) => {
    return (<> {isEditTaskDialogOpen && isEditing && (
        <DialogWrapper>
            <h2 className="text-lg font-semibold mb-4">Edit Task</h2>
               
               <Input value={editTask} onChange={(e) => setEditTask(e.target.value)} placeholder="Task name" />
               <div className="flex justify-end space-x-2">
                   <RejectButton onClick={() => setEditTaskDialogOpen(false)} text="Cancel" />
                   <AcceptButton onClick={onTaskEdit} text="Save" />
               </div>
        </DialogWrapper>
    )}
    </>
    )
}

export default EditTaskDialog
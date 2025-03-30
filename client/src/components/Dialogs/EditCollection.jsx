import { useState } from "react";
import useStore from "../../store";
import Input from "../Input";
import RejectButton from "../Button/RejectButton";
import AcceptButton from "../Button/AcceptButton";
import DialogWrapper from "./DialogWrapper";

const EditCollectionDialog = ({ isEditDialogOpen, setEditDialogOpen, onCollectionEdit }) => {
    const { selectedCollection } = useStore()
    const [editCollection, setEditCollection] = useState(selectedCollection?.name || '')
    if (!isEditDialogOpen) return null;
    return (<DialogWrapper>
        <h2 className="text-lg font-semibold mb-4">Edit Collection</h2>
        <Input value={editCollection} onChange={(e) => setEditCollection(e.target.value)} placeholder="Collection name" />
        <div className="flex justify-end space-x-2">

            <RejectButton onClick={() => setEditDialogOpen(false)} text="Cancel" />

            <AcceptButton onClick={() => onCollectionEdit(editCollection)} text="Save" />
        </div>
    </DialogWrapper>
    )

}
export default EditCollectionDialog
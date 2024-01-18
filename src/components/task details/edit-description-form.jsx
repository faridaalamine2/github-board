import { useState } from "react";
import { useDispatch } from "react-redux";
import { editTask } from "../../redux/columnsSlice";

/* eslint-disable react/prop-types */

export default function EditDescription({ task, closeEditDescription }) {
    const dispatch = useDispatch();
    const [description, setDescription] = useState(task.description);
    const { index, columnIndex } = task;

    const handleChange = (e) => {
        setDescription(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        closeEditDescription();
        const editData = { index, columnIndex, description };
        dispatch(editTask(editData));
    };
    return (
        <form onSubmit={handleSubmit} className="description-form">
            <textarea value={description} onChange={handleChange}></textarea>

            <div className="buttons">
                <input type="submit" value="save" className="save" />
                <div onClick={closeEditDescription}>cancel</div>
            </div>
        </form>
    );
}

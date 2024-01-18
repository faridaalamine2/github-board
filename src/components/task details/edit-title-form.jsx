import { useState } from "react";
import { useDispatch } from "react-redux";
import { editTask } from "../../redux/columnsSlice";

/* eslint-disable react/prop-types */
export default function EditTitleForm({ task, closeEditTitle }) {
    const dispatch = useDispatch();

    const [title, setTitle] = useState(task.title);
    const { index, columnIndex } = task;

    const handleChange = (e) => {
        setTitle(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        closeEditTitle();
        const editData = { index, columnIndex, title };
        dispatch(editTask(editData));
    };

    return (
        <form onSubmit={handleSubmit} className="title-form">
            <input
                type="text"
                value={title}
                className="title-input"
                autoFocus
                onChange={handleChange}
            />
            <div className="buttons">
                <input type="submit" value="save" className="save" />
                <div onClick={closeEditTitle}>cancel</div>
            </div>
        </form>
    );
}

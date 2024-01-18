/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/columnsSlice";

export default function TaskInput({ index, setTaskInput }) {
    const [title, setTitle] = useState("");
    const dispatch = useDispatch();
    const formRef = useRef();

    const handleOnChange = (e) => {
        setTitle(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (title !== "") {
            setTitle("");
            dispatch(
                addTask({
                    taskData: {
                        title,
                    },
                    columnIndex: index,
                })
            );
        }
    };
    const handleClickOutside = (event) => {
        if (formRef.current && !formRef.current.contains(event.target)) {
            setTaskInput(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <form onSubmit={handleSubmit} ref={formRef}>
            <input
                className="task-input"
                type="text"
                value={title}
                autoFocus
                placeholder="Enter a task"
                onChange={handleOnChange}
            />
        </form>
    );
}

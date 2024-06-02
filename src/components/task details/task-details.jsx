/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectColumn, selectTask } from "../../redux/columnsSlice";
import { openDialog } from "../../redux/dialogSlice";
import EditTitleForm from "./edit-title-form";
import EditDescription from "./edit-description-form";
import xIcon from "../../icons/x-icon.png";
import "../../styling/task-details.scss";

export default function TaskDetailsPane({ taskData, closeTaskDetails }) {
    const { index, columnIndex } = taskData;
    const task = useSelector((state) => selectTask(state, columnIndex, index));
    const column = useSelector((state) => selectColumn(state, columnIndex));
    const dispatch = useDispatch();
    const [className, setClassName] = useState("task-details");
    const [closeState, setCloseState] = useState(false);
    const [editTitleOpen, setEditTitleOpen] = useState(false);
    useEffect(() => {
        console.log("effect");
        setClassName("task-details open");
        if (closeState) {
            setClassName("task-details");
            setTimeout(() => {
                closeTaskDetails();
            }, 700);
        }
    }, [closeState]);
    const openEditTitle = () => {
        setEditTitleOpen(true);
    };
    const closeEditTitle = () => {
        setEditTitleOpen(false);
    };

    const [editDescription, setEditDescription] = useState(false);
    const closeEditDescription = () => {
        setEditDescription(false);
    };
    const toggleEditDescription = () => {
        setEditDescription((prev) => !prev);
    };

    const overlayRef = useRef();

    const renderDescription = task.description
        ?.split("\n")
        .map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
        ));

    const handleOverlayClick = (e) => {
        if (e.target === overlayRef.current) {
            setCloseState(true);
        }
    };
    const handleDelete = () => {
        dispatch(
            openDialog({
                action: "delete",
                data: { columnIndex, taskIndex: index },
            })
        );
        setCloseState(true);
    };

    return (
        <div
            className="white-overlay"
            style={{
                background: closeState && "transparent",
            }}
            ref={overlayRef}
            onClick={handleOverlayClick}
        >
            <div className={className}>
                <div className="header">
                    <div className="close">
                        <img
                            src={xIcon}
                            className="x-icon"
                            onClick={() => {
                                setCloseState(true);
                            }}
                        ></img>
                    </div>
                    {editTitleOpen ? (
                        <EditTitleForm
                            task={{
                                title: task.title,
                                index,
                                columnIndex,
                            }}
                            closeEditTitle={closeEditTitle}
                        />
                    ) : (
                        <div className="title">
                            <div className="content">{task.title}</div>
                            <div
                                className="edit-button"
                                onClick={openEditTitle}
                            >
                                Edit title
                            </div>
                        </div>
                    )}
                    <div className="info">
                        <div className="status">
                            <div>Status</div>
                            <div className={`column-title ${column.color}`}>
                                {column.labelText}
                            </div>
                        </div>
                        <div className="delete-button" onClick={handleDelete}>
                            Delete from project
                        </div>
                    </div>
                </div>
                <div className="description">
                    <div
                        className="edit-button"
                        onClick={toggleEditDescription}
                    >
                        Edit
                    </div>
                    {editDescription ? (
                        <EditDescription
                            task={{
                                description: task.description,
                                index,
                                columnIndex,
                            }}
                            closeEditDescription={closeEditDescription}
                        />
                    ) : (
                        <div className="text">
                            {task.description ? (
                                renderDescription
                            ) : (
                                <div className="placeholder">
                                    add description here
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

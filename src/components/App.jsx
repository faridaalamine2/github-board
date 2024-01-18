import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Column from "./Column";
import Dialog from "./dialog/Dialog";
import { openDialog } from "../redux/dialogSlice";
import TaskInput from "./task-input";
import GhostElement from "./GhostElement";
import addIcon from "../icons/plus-icon.png";
import "../styling/app.scss";
import { drop } from "../redux/dragStateSlice";
import TaskDetailsPane from "./task details/task-details";

function App() {
    const columns = useSelector((state) => state.columns);
    const dialog = useSelector((state) => state.dialog);
    const dragState = useSelector((state) => state.dragState);
    const dispatch = useDispatch();

    const [taskInput, setTaskInput] = useState({ open: false });
    const [taskDetails, setTaskDetails] = useState({ open: false });
    const openTaskDetails = (state) => {
        setTaskDetails(state);
    };
    const closeTaskDetails = () => {
        setTaskDetails({ open: false });
    };

    useEffect(() => {
        const handleMouseUpEvent = () => {
            dispatch(drop());
        };

        if (dragState.dragging) {
            document.addEventListener("mouseup", handleMouseUpEvent);
        }
        return () => {
            document.removeEventListener("mouseup", handleMouseUpEvent);
        };
    }, [dragState, dispatch]);

    const handleOpenDialog = () => {
        dispatch(openDialog());
    };

    const renderColumns = columns.map((column, i) => {
        return (
            <Column
                index={i}
                setTaskInput={setTaskInput}
                openTaskDetails={openTaskDetails}
                key={i}
            />
        );
    });
    return (
        <>
            <div className="app">
                <div className="board">
                    <>{renderColumns}</>

                    <div
                        onClick={handleOpenDialog}
                        className="add-column-button"
                    >
                        <img src={addIcon} className="plus-icon"></img>
                    </div>
                </div>

                {dialog.open && <Dialog />}
                {taskDetails.open && (
                    <TaskDetailsPane
                        taskData={taskDetails.taskData}
                        closeTaskDetails={closeTaskDetails}
                    />
                )}
                {dragState.task && <GhostElement />}
                {taskInput.open && (
                    <TaskInput
                        index={taskInput.columnIndex}
                        setTaskInput={setTaskInput}
                    />
                )}
            </div>
        </>
    );
}

export default App;

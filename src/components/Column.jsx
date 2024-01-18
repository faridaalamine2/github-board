/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import DetailsDropDown from "./details-dropdown";
import Card from "./Card";
import { appendTask, selectColumn, swapColumns } from "../redux/columnsSlice";
import addIcon from "../icons/plus-icon.png";
import "../styling/column.scss";
import "../styling/card.scss";
import { drag } from "../redux/dragStateSlice";
import { truncateString } from "../functions";

function Column({ index, setTaskInput, openTaskDetails }) {
    const column = useSelector((state) => selectColumn(state, index));
    const dragState = useSelector((state) => state.dragState);
    const dispatch = useDispatch();

    const [dragTaskOver, setDragTaskOver] = useState(false);
    const [dragOverLeft, setDragOverLeft] = useState(false);
    const [dragOverRight, setDragOverRight] = useState(false);
    const handleDragOverLeft = (bool) => {
        setDragOverLeft(bool);
        setDragOverRight(!bool);
    };
    const handleDragOut = () => {
        setDragTaskOver(false);
        setDragOverLeft(false);
        setDragOverRight(false);
    };
    const columnRef = useRef();
    const cardsZoneRef = useRef();

    const openTaskInput = () => {
        setTaskInput({ open: true, columnIndex: index });
    };
    const handleMouseDown = (e) => {
        e.preventDefault();
        const payload = { draggedColumn: { ...column, index } };
        dispatch(drag(payload));
    };
    const handleMouseOver = (e) => {
        if (dragState.dragging) {
            if (dragState.task) {
                if (!cardsZoneRef.current.contains(e.target))
                    setDragTaskOver(true);
                else setDragTaskOver(false);
            }
        } else return;
    };
    const handleMouseMove = (e) => {
        if (dragState.column) {
            const boundRect = columnRef.current.getBoundingClientRect();
            const offsetLeft = e.clientX - boundRect.left;
            const width = columnRef.current.offsetWidth;

            if (offsetLeft <= width / 2) {
                //drag over left
                handleDragOverLeft(true);
            } else {
                //drag over right
                handleDragOverLeft(false);
            }
        } else return;
    };
    const handleMouseUp = () => {
        if (dragState.dragging) {
            handleDragOut();
            if (dragTaskOver && dragState.task) {
                //dragged task
                const draggedIndex = dragState.task.index;
                const draggedColumnIndex = dragState.task.columnIndex;
                const payload = {
                    draggedIndex,
                    draggedColumnIndex,
                    targetColumnIndex: index,
                };
                dispatch(appendTask(payload));
            } else if (dragState.column) {
                //dragged column
                const draggedIndex = dragState.column.index;
                const targetIndex = index;

                if (targetIndex > draggedIndex) {
                    if (dragOverLeft) {
                        const targetIndex = index - 1;
                        dispatch(swapColumns({ draggedIndex, targetIndex }));
                    } else if (dragOverRight) {
                        dispatch(swapColumns({ draggedIndex, targetIndex }));
                    }
                } else if (targetIndex < draggedIndex) {
                    if (dragOverLeft) {
                        dispatch(swapColumns({ draggedIndex, targetIndex }));
                    } else if (dragOverRight) {
                        const targetIndex = index + 1;
                        dispatch(swapColumns({ draggedIndex, targetIndex }));
                    }
                }
            } else return;
        } else return;
    };

    const renderCards = column.tasks.map((task, i) => {
        return (
            <Card
                task={task}
                index={i}
                columnIndex={index}
                openTaskDetails={openTaskDetails}
                key={i}
            />
        );
    });
    return (
        <div>
            <div
                className="column"
                onMouseOver={handleMouseOver}
                onMouseMove={handleMouseMove}
                onMouseOut={handleDragOut}
                onMouseUp={handleMouseUp}
                ref={columnRef}
            >
                <div className="top">
                    <div className="title" onMouseDown={handleMouseDown}>
                        <div className={`color ${column.color}`}></div>
                        <div className="text">
                            {truncateString(column.labelText, 24)}
                        </div>
                        <div className="tasks-num">
                            <span>{column.tasks.length}</span>
                        </div>
                    </div>

                    <DetailsDropDown column={{ ...column, index }} />
                </div>
                <div className="description">
                    {truncateString(column.description, 87)}
                </div>
                <div className="cards-container">
                    <div ref={cardsZoneRef}> {renderCards}</div>
                    {dragTaskOver && <div className="blue-line"></div>}
                </div>
                <div className="add-item-button" onClick={openTaskInput}>
                    <img src={addIcon} className="plus-icon"></img>
                    <span>Add item</span>
                </div>
                {dragOverRight && (
                    <div id="right" className="vertical-line"></div>
                )}
                {dragOverLeft && (
                    <div id="left" className="vertical-line"></div>
                )}
            </div>
        </div>
    );
}

export default Column;

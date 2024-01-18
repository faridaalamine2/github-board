/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef } from "react";
import { drag } from "../redux/dragStateSlice";
import { swapTasks } from "../redux/columnsSlice";

export default function Card({ task, index, columnIndex, openTaskDetails }) {
    const dragState = useSelector((state) => state.dragState);
    const dispatch = useDispatch();

    const [dragOverTop, setDragOverTop] = useState(false);
    const [dragOverBottom, setDragOverBottom] = useState(false);
    const handleDragOverTop = (bool) => {
        setDragOverTop(bool);
        setDragOverBottom(!bool);
    };
    const handleDragOut = () => {
        setDragOverTop(false);
        setDragOverBottom(false);
    };
    const cardRef = useRef();
    const openTaskRef = useRef();

    const handleMouseDown = (e) => {
        if (!openTaskRef.current.contains(e.target)) {
            e.preventDefault();
            const { x, y } = cardRef.current.getBoundingClientRect();
            const left = `${x}px`;
            const top = `${y}px`;
            const initialPosition = {
                draggedTask: { ...task, index, columnIndex },
                position: { left, top },
                offset: {
                    x: e.clientX - x,
                    y: e.clientY - y,
                },
            };

            dispatch(drag(initialPosition));
        } else
            openTaskDetails({
                open: true,
                taskData: { index, columnIndex },
            });
    };
    const handleMouseMove = (e) => {
        if (dragState.dragging) {
            const boundRect = cardRef.current.getBoundingClientRect();
            const offsetTop = e.clientY - boundRect.top;
            const height = cardRef.current.offsetHeight;

            if (offsetTop < height / 2) {
                handleDragOverTop(true);
            } else {
                handleDragOverTop(false);
            }
        } else return;
    };
    const handleMouseUp = () => {
        if (dragState.dragging) {
            handleDragOut();
            const draggedIndex = dragState.task.index;
            const targetIndex = index;

            const draggedColumnIndex = dragState.task.columnIndex;
            const targetColumnIndex = columnIndex;

            const payload = {
                draggedColumnIndex,
                targetColumnIndex,
                draggedIndex,
                targetIndex,
            };

            if (
                targetIndex >= draggedIndex &&
                draggedColumnIndex === targetColumnIndex
            ) {
                if (dragOverTop) {
                    payload.targetIndex = targetIndex - 1;
                    dispatch(swapTasks(payload));
                } else if (dragOverBottom) {
                    dispatch(swapTasks(payload));
                }
            } else {
                if (dragOverTop) {
                    dispatch(swapTasks(payload));
                } else if (dragOverBottom) {
                    payload.targetIndex = targetIndex + 1;
                    dispatch(swapTasks(payload));
                }
            }
        } else return;
    };
    return (
        <div
            className="card"
            ref={cardRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseOut={handleDragOut}
            onMouseUp={handleMouseUp}
        >
            {dragOverTop && <div className="blue-line" id="top"></div>}
            <a className="open-task" ref={openTaskRef}>
                {task.title}
            </a>
            {dragOverBottom && <div className="blue-line" id="bottom"></div>}
        </div>
    );
}

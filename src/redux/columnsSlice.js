/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
const initialData = localStorage.getItem("columns");
const initial = [
    {
        labelText: "todo",
        color: "green",
        description: "This item hasn't been started",
        limit: 8,
        tasks: [],
    },
    {
        labelText: "in progress",
        color: "yellow",
        description: "This is actively being worked on",
        limit: 8,
        tasks: [],
    },
    {
        labelText: "done",
        color: "violet",
        description: "This has been completed",
        limit: 8,
        tasks: [],
    },
];
const initialState = initialData ? JSON.parse(initialData) : initial;

function updateStorage(state) {
    localStorage.setItem("columns", JSON.stringify(state));
}
const columnsSlice = createSlice({
    name: "columns",
    initialState,
    reducers: {
        addColumn: (state, action) => {
            const data = action.payload;
            const newColumn = { ...data, limit: 8, tasks: [] };
            state.push(newColumn);
            //updateStorage(state);
        },
        editColumn: (state, action) => {
            const editedData = action.payload.columnData;
            const index = action.payload.columnIndex;
            const prevColumn = state[index];
            const newColumn = { ...prevColumn, ...editedData };
            state[index] = newColumn;
            //updateStorage(state);
        },
        deleteColumn: (state, action) => {
            const deleteIndex = action.payload.columnIndex;
            const newState = state.filter((_, index) => index !== deleteIndex);
            //updateStorage(newState);
            return newState;
        },
        updateLimit: (state, action) => {
            const index = action.payload.columnIndex;
            const column = state[index];
            const limit = action.payload.limit;
            column.limit = limit;
            //updateStorage(state);
        },
        addTask: (state, action) => {
            const index = action.payload.columnIndex;
            const data = action.payload.taskData;

            const column = state[index];
            if (column.limit > column.tasks.length) column.tasks.push(data);
            //updateStorage(state);
        },
        editTask: (state, action) => {
            const { index, columnIndex, title, description } = action.payload;
            const column = state[columnIndex];
            const task = column.tasks[index];
            if (title) task.title = title;
            if (description) task.description = description;
        },
        deleteTask: (state, action) => {
            const { taskIndex, columnIndex } = action.payload;
            const column = state[columnIndex];
            column.tasks = column.tasks.filter(
                (_, index) => index !== taskIndex
            );
            //updateStorage(state);
        },
        swapColumns: (state, action) => {
            const { draggedIndex, targetIndex } = action.payload;
            if (draggedIndex !== targetIndex) {
                const draggedColumn = state[draggedIndex];
                state.splice(draggedIndex, 1);
                state.splice(targetIndex, 0, draggedColumn);
                //updateStorage(state);
            }
        },
        swapTasks: (state, action) => {
            const {
                draggedColumnIndex,
                targetColumnIndex,
                draggedIndex,
                targetIndex,
            } = action.payload;
            const draggedColumn = state[draggedColumnIndex];
            const draggedItem = draggedColumn.tasks[draggedIndex];

            if (draggedColumnIndex === targetColumnIndex) {
                if (draggedIndex !== targetIndex) {
                    const tasks = draggedColumn.tasks;
                    tasks.splice(draggedIndex, 1);
                    tasks.splice(targetIndex, 0, draggedItem);
                }
            } else {
                const targetColumn = state[targetColumnIndex];
                draggedColumn.tasks.splice(draggedIndex, 1);
                targetColumn.tasks.splice(targetIndex, 0, draggedItem);
            }
            //updateStorage(state);
        },
        appendTask: (state, action) => {
            const { draggedIndex, draggedColumnIndex, targetColumnIndex } =
                action.payload;
            const draggedColumn = state[draggedColumnIndex];
            const targetColumn = state[targetColumnIndex];
            const draggedItem = draggedColumn.tasks[draggedIndex];
            draggedColumn.tasks.splice(draggedIndex, 1);
            targetColumn.tasks.push(draggedItem);
            //updateStorage(state);
        },
    },
});
export const selectColumn = (state, columnIndex) => state.columns[columnIndex];
export const selectTask = (state, columnIndex, taskIndex) =>
    state.columns[columnIndex].tasks[taskIndex];

export const {
    addColumn,
    editColumn,
    deleteColumn,
    swapColumns,
    updateLimit,
    addTask,
    editTask,
    deleteTask,
    swapTasks,
    appendTask,
} = columnsSlice.actions;
export default columnsSlice.reducer;

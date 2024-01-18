import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dragging: false,
    task: undefined,
    column: undefined,
    position: { left: 0, top: 0 },
    offset: { x: 0, y: 0 },
};
const dragStateSlice = createSlice({
    name: "dialog",
    initialState,
    reducers: {
        drag: (state, action) => {
            const draggedTask = action.payload.draggedTask;
            const draggedColumn = action.payload.draggedColumn;

            if (draggedTask) {
                const position = action.payload.position;
                const offset = action.payload.offset;

                return {
                    dragging: true,
                    task: draggedTask,
                    position,
                    offset,
                };
            } else if (draggedColumn) {
                return {
                    dragging: true,
                    column: draggedColumn,
                };
            }
        },
        drop: () => {
            return initialState;
        },
    },
});
export const { drag, drop } = dragStateSlice.actions;
export default dragStateSlice.reducer;

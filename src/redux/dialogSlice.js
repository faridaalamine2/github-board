import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    open: false,
    action: "New",
    data: undefined,
};
const dialogSlice = createSlice({
    name: "dialog",
    initialState: initialState,
    reducers: {
        openDialog: (state, action) => {
            if (action.payload) {
                return {
                    open: true,
                    action: action.payload.action,
                    data: action.payload.data,
                };
            } else
                return {
                    open: true,
                    action: "New",
                };
        },
        closeDialog: () => {
            return initialState;
        },
    },
});
export const { openDialog, closeDialog } = dialogSlice.actions;
export default dialogSlice.reducer;

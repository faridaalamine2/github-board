import { configureStore } from "@reduxjs/toolkit";
import columnsReducer from "./columnsSlice";
import dialogReducer from "./dialogSlice";
import dragStateReducer from "./dragStateSlice";
const store = configureStore({
    reducer: {
        columns: columnsReducer,
        dialog: dialogReducer,
        dragState: dragStateReducer,
    },
});

export default store;

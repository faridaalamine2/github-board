import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import ColumnDetailsForm from "./column-details-form";
import DeleteItem from "./delete-item";
import SetLimit from "./set-limit";
import { closeDialog } from "../../redux/dialogSlice";
import "../../styling/dialog.scss";

export default function Dialog() {
    const dialog = useSelector((state) => state.dialog);
    const dispatch = useDispatch();
    const overlayRef = useRef();
    const column = dialog.data?.column;
    const action = dialog.action;

    const handleCloseDialog = (e) => {
        if (overlayRef.current === e.target) {
            dispatch(closeDialog());
        }
    };
    return (
        <div className="overlay" ref={overlayRef} onClick={handleCloseDialog}>
            <div className="dialog">
                {action === "New" || action === "Edit" ? (
                    <ColumnDetailsForm column={column} action={action} />
                ) : action === "delete" ? (
                    <DeleteItem data={dialog.data} />
                ) : (
                    <SetLimit
                        columnIndex={column.index}
                        defaultLimit={column.limit}
                    />
                )}
            </div>
        </div>
    );
}

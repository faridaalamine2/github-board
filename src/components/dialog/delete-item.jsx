/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import xIcon from "../../icons/x-icon.png";
import { closeDialog } from "../../redux/dialogSlice";
import { deleteColumn, deleteTask } from "../../redux/columnsSlice";
export default function DeleteItem({ data }) {
    const dispatch = useDispatch();
    const { taskIndex, columnIndex } = data;

    const handleCLoseDialog = () => {
        dispatch(closeDialog());
    };
    const handleDelete = () => {
        if (taskIndex !== undefined)
            dispatch(deleteTask({ columnIndex, taskIndex }));
        else dispatch(deleteColumn({ columnIndex }));
        handleCLoseDialog();
    };
    return (
        <>
            <div className="title">
                <div>Delete Item</div>

                <img
                    src={xIcon}
                    className="x-icon"
                    onClick={handleCLoseDialog}
                ></img>
            </div>
            <div className="delete-message">
                This will permanently delete this item. This cannot be undone.
                <div className="red-message">
                    The item will be permanently deleted from this project.
                </div>
            </div>

            <div className="buttons">
                <div onClick={handleCLoseDialog}>Cancel</div>
                <div className="delete" onClick={handleDelete}>
                    Delete
                </div>
            </div>
        </>
    );
}

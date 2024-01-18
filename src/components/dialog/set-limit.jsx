/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import xIcon from "../../icons/x-icon.png";
import { closeDialog } from "../../redux/dialogSlice";
import { updateLimit } from "../../redux/columnsSlice";
export default function SetLimit({ columnIndex, defaultLimit }) {
    const [limit, setLimit] = useState(defaultLimit);
    const dispatch = useDispatch();

    const handleCLoseDialog = () => {
        dispatch(closeDialog());
    };
    const handleChange = (e) => {
        const value = e.target.value;
        if (Number(value) || value === "") {
            setLimit(value);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (limit != "") dispatch(updateLimit({ columnIndex, limit }));
        handleCLoseDialog();
    };
    return (
        <>
            <div className="title">
                <div>Set column limit</div>

                <img
                    src={xIcon}
                    className="x-icon"
                    onClick={handleCLoseDialog}
                ></img>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        <label>Column limit</label>
                        <input
                            type="text"
                            value={limit}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="placeholder">
                        A limit on the number of items in a column
                    </div>
                </div>

                <div className="buttons">
                    <div className="cancel" onClick={handleCLoseDialog}>
                        Cancel
                    </div>
                    <input type="submit" value="Save" className="save" />
                </div>
            </form>
        </>
    );
}

/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addColumn, editColumn } from "../../redux/columnsSlice";
import ColorInput from "./Color-input";
import { closeDialog } from "../../redux/dialogSlice";
import xIcon from "../../icons/x-icon.png";
import { truncateString } from "../../functions";

export default function ColumnDetailsForm({ column, action }) {
    const dispatch = useDispatch();

    const [labelText, setLabelText] = useState(() => {
        if (column) return column.labelText;
        else return "";
    });
    const [description, setDescription] = useState(() => {
        if (column) return column.description;
        else return "";
    });
    const [color, setColor] = useState(() => {
        if (column) return column.color;
        else return "gray";
    });
    const [error, setError] = useState(false);

    const handleLabelChange = (e) => {
        setLabelText(e.target.value);
        if (e.target.value === "") setError(true);
        else setError(false);
    };
    const handleDescChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (labelText === "") {
            setError(true);
            return;
        }
        if (!error) {
            const payload = { labelText, description, color };
            switch (action) {
                case "New":
                    dispatch(addColumn(payload));
                    break;
                case "Edit": {
                    const columnIndex = column.index;
                    dispatch(editColumn({ columnData: payload, columnIndex }));
                }
            }
            handleCLoseDialog();
        }
    };
    const handleCLoseDialog = () => {
        dispatch(closeDialog());
    };

    return (
        <>
            <div className="title">
                <div>{action} option</div>

                <img
                    src={xIcon}
                    className="x-icon"
                    onClick={handleCLoseDialog}
                ></img>
            </div>

            <div className="result">
                <div className={`${color} text`}>
                    {truncateString(labelText, 40)}
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        <label htmlFor="label">Label text</label>
                        <input
                            type="text"
                            id="label"
                            value={labelText}
                            onChange={handleLabelChange}
                        />
                        {error && (
                            <div className="error-message">
                                !Label text is required
                            </div>
                        )}
                    </div>
                    <ColorInput
                        defaultColor={color}
                        setColorInForm={setColor}
                    />
                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={handleDescChange}
                        ></textarea>
                    </div>
                </div>
                <div className="buttons">
                    <div onClick={handleCLoseDialog}>Cancel</div>
                    <input type="submit" value="Save" className="save" />
                </div>
            </form>
        </>
    );
}

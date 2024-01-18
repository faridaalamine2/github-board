/* eslint-disable react/prop-types */
import "../styling/dropdown.scss";
import dotsIcon from "../icons/three-dots.png";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { openDialog } from "../redux/dialogSlice";

export default function DetailsDropDown({ column }) {
    const dispatch = useDispatch();

    const [contentOpen, setContentOpen] = useState(false);
    const dropdownRef = useRef();

    const toggleContent = () => {
        setContentOpen((prev) => !prev);
    };

    const handleOpenDialog = (action) => {
        dispatch(
            openDialog({ action, data: { column, columnIndex: column.index } })
        );
        setContentOpen(false);
    };

    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setContentOpen(false);
        }
    };

    useEffect(() => {
        if (contentOpen)
            document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [contentOpen]);

    return (
        <div ref={dropdownRef}>
            <div
                className={`details${contentOpen ? " active" : ""}`}
                onClick={toggleContent}
            >
                <img src={dotsIcon} className="dots-icon"></img>
            </div>
            {contentOpen && (
                <div className="dropdown-content">
                    <p>Column</p>
                    <div
                        onClick={() => {
                            handleOpenDialog("Set limit");
                        }}
                    >
                        Set limit
                    </div>
                    <div
                        onClick={() => {
                            handleOpenDialog("Edit");
                        }}
                    >
                        edit details
                    </div>
                    <div
                        className="delete"
                        onClick={() => {
                            handleOpenDialog("delete");
                        }}
                    >
                        delete
                    </div>
                </div>
            )}
        </div>
    );
}

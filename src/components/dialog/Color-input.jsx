/* eslint-disable react/prop-types */
import { useState } from "react";
import "../../styling/color-input.scss";
const colors = [
    "gray",
    "blue",
    "green",
    "yellow",
    "orange",
    "red",
    "pink",
    "violet",
];
export default function ColorInput({ defaultColor, setColorInForm }) {
    const [colorSelected, setColorSelected] = useState(defaultColor);

    const selectColor = (color) => {
        setColorSelected(color);
        setColorInForm(color);
    };
    const renderColors = colors.map((color) => {
        return (
            <div
                className={`color ${color} ${
                    colorSelected === color && "selected"
                }`}
                onClick={() => {
                    selectColor(color);
                }}
                key={color}
            >
                <div className="checkbox"></div>
            </div>
        );
    });
    return (
        <div>
            <label>Color</label>
            <div className="color-input">{renderColors}</div>
        </div>
    );
}

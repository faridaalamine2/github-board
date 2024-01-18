/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function GhostElement() {
    const dragState = useSelector((state) => state.dragState);

    const [position, setPosition] = useState(dragState.position);
    const offsetX = dragState.offset.x;
    const offsetY = dragState.offset.y;
    const task = dragState.task;

    const handleMouseMove = (e) => {
        e.preventDefault();
        const left = `${e.clientX - offsetX}px`;
        const top = `${e.clientY - offsetY}px`;

        setPosition({ left, top });
    };

    useEffect(() => {
        document.addEventListener("mousemove", handleMouseMove);
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div style={position} className="ghost-element">
            {task.title}
        </div>
    );
}

"use client"
import {FC, MouseEventHandler} from "react";

type ButtonProps = {
    onClick:  MouseEventHandler<HTMLButtonElement>;
    children: React.ReactNode;
}

export const Button: FC<ButtonProps> = ({ onClick, children}) => (
    <button className="border border-blue-500 px-4 py-1 rounded cursor-pointer bg-blue-500 hover:bg-blue-900"
            onClick={onClick}
    >
        {children}
    </button>

);
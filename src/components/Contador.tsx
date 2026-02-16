"use client"
import {useState} from "react";

export const Counter = () => {
    const [counter] = useState<number>(0);

    return (
        <div>
            <h2 className="text-2xl">Contador</h2>
            <p>Número Atual: {counter}</p>
        </div>
    );
}
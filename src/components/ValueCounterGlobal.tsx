"use client"

import {CounterContext} from "@/context/CounterContext";
import {useContext} from "react";

export const ValueCounterGlobal = () => {
        const { counter } = useContext(CounterContext);
    return (
        <div>
            <p>Valor do meu contador Global: {counter}</p>
        </div>
    );
};
"use client"

import {useContext} from "react";
import {CounterContext} from "@/context/CounterContext";

export const CounterGlobal = () => {
    const { counter } = useContext(CounterContext);

    return <>{counter}</>;
};
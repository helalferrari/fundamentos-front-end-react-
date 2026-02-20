"use client";

import {createContext, Dispatch, ReactNode, SetStateAction, useState} from "react";

type CounterContextType = {
    counter: number;
    setCounter: Dispatch<SetStateAction<number>>;
}

export const CounterContext = createContext<CounterContextType>({
    counter: 0,
    setCounter: () => {},
});

export default function CounterProvider({
        children,
    }: {
        children: ReactNode;
    }) {
    const [counter, setCounter] = useState(0);

    return (
    <CounterContext.Provider value={{counter: 0, setCounter }}>
        {children}
    </CounterContext.Provider>
    );
}
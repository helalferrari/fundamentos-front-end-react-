"use client"
import {createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState} from "react";
type CounterContextType = {
    counter: number,
    setCounter: Dispatch<SetStateAction<number>>,
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

    useEffect(() => {
        const counterSessionStorage = sessionStorage.getItem("counter");

        if (counterSessionStorage) {
           // setCounter(+counterSessionStorage);
        }
    }, []);

    useEffect(() => {
        sessionStorage.setItem('Counter', counter.toString());
    }, [counter]);

    return (
        <CounterContext.Provider value={{ counter: counter, setCounter }}>
            {children}
        </CounterContext.Provider>
    );
}
"use client"
import {useContext} from "react";
import {CounterContext} from "@/context/CounterContext";
import {Button} from "./Button";

export const CounterGlobal = () => {
        const { counter, setCounter } = useContext(CounterContext);
    return (
        <div>
            <h2 className="text-2xl">Contador Global</h2>
            <p>Número Atual: {counter}</p>
            <div className="flex gap-x-2">
                <Button
                    onClick={() =>
                        setCounter(counter+1)
                    }>
                    +1
                </Button>
                <button className="border border-blue-500 px-4 py-1 rounded cursor-pointer bg-blue-500 hover:bg-blue-900"
                        onClick={() => {
                            setCounter((c) => (c ?? 0) + 3); //melhor pratica ẽ dessa forma
                        }}>
                    +3
                </button>
                <button className="border border-blue-500 px-4 py-1 rounded cursor-pointer bg-blue-500 hover:bg-blue-900"
                        onClick={() => {
                            setCounter((c) => (c ?? 0) - 3); //melhor pratica ẽ dessa forma
                        }}>
                    -3
                </button>
            </div>
        </div>
    );
};
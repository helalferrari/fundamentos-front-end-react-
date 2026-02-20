"use client"
import {useEffect, useState} from "react";
import {Button} from "@/components/Button";

export const Counter = () => {
    const [counter, setCounter] = useState<number>(0);
    const [coisa, setCoisa] = useState<number>("");

    useEffect(() => {
        console.log("contador atualizado");
    }, [counter])

    useEffect(() => {
        console.log("coisa atualizado");
    }, [coisa])

    useEffect(() => {
        console.log("contador e coisa atualizado");
    }, [counter, coisa])


    return (
        <div>
            <h2 className="text-2xl">Contador</h2>
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
                    setCounter((c) => c + 3); //melhor pratica ẽ dessa forma
                }}>
                +3
                </button>
                <button className="border border-blue-500 px-4 py-1 rounded cursor-pointer bg-blue-500 hover:bg-blue-900"
                        onClick={() => {
                            setCounter((c) => c - 3); //melhor pratica ẽ dessa forma
                        }}>
                    -3
                </button>
                <div>
                    <input className="px-4 py-1 border border-red-600"
                           value={coisa}
                           onChange={(e) => {
                               setCoisa(e.target.value)
                           }}/>
                </div>
                <Button
                    onClick={() =>
                        setCoisa("")
                    }>
                    Limpar
                </Button>
            </div>
        </div>
    );
}
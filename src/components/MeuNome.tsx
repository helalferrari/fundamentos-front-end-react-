import {FC} from "react";

export const MeuNome: FC<{ name: string }> = (props) => {
    return <p>{props.name}</p>;
};
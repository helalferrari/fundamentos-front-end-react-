import {CounterGlobal} from "@/components/CounterGlobal";
import {ValueCounterGlobal} from "@/components/ValueCounterGlobal";

const Page = () => {
    return (
    <div>
        <h1 className="text-4xl font-bold">Página Nível 2</h1>
        <CounterGlobal />
        <ValueCounterGlobal />
    </div>
    );
};

export default Page;
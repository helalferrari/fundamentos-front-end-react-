// export default function Page() {
//   return <div>Page</div>;
// }
import { MeuNome } from "@/components/MeuNome";
import {Hobbies} from "@/components/Hobbies";
import {Imagem} from "@/components/Imagem";
import Link from "next/link";

type PageProps = {
    params: Promise<{
        name: string;
    }>
}

const Page = async ({ params }: PageProps) => {
    const { name } = await params;

    return (
    <div className="p-4 grid gap-y-4">
        <MeuNome name={name} age={42} birthDate={new Date(1983, 9, 15)} />
        <Hobbies />
        <div>
            <p>Gosto de:</p>
            <Imagem />
        </div>
        <Link className="underline" href="/nivel-0">Voltar</Link>
    </div>
    );
};

export default Page;
import CounterProvider, {CounterContext} from "@/context/CounterContext";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <CounterProvider>{children}</CounterProvider>
  );
}

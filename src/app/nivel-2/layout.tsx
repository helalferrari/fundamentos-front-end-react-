import CounterProvider from "@/context/CounterContext";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <CounterProvider>{children}</CounterProvider>
  );
}

import Image, { type ImageProps } from "next/image";
import Header from "@/common/headers/basic";
import Nav from "@/common/nav/basic";

export default function Home() {
  return (
    <>
      <Header />
      <Nav />
      <main className="h-1000"></main>
    </>
  );
}

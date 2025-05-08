import Header from "@/common/headers/basic";
import Nav from "@/common/nav/basic";

export default function Home() {
  return (
    <>
      <div className="sticky top-0 z-50">
        <Header />
        <Nav />
      </div>

      <main className="h-1000"></main>
    </>
  );
}

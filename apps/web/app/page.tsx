import * as motion from "motion/react-client";

import Header from "@/common/headers/basic";
import Nav from "@/common/nav/basic";

export default function Home() {
  return (
    <>
      <div className="sticky top-0 z-50">
        <Header />
        <Nav />
      </div>

      <main className="h-1000">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            scale: { type: "spring", visualDuration: 0.8, bounce: 0.5 },
          }}
        >
          <div className="flex flex-col items-center justify-center mt-10 lg:mt-20">
            <h1 className="xl:w-7xl text-2xl md:text-5xl/15 lg:text-6xl/20 block text-center font-semibold">
              Transforming Small Businesses <br /> With A Single Smart Platform
            </h1>
          </div>
        </motion.div>
      </main>
    </>
  );
}

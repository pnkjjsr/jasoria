import * as motion from "motion/react-client";

import { home as locale } from "@repo/shared/locale/index";

import Header from "@/layout/headers/basic";
import Nav from "@/layout/nav/basic";

export default function Home() {
  return (
    <>
      <div className="sticky top-0 z-50">
        <Header />
        <Nav />
      </div>

      <main className="">
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
              {locale.h1.first}
              <br />
              {locale.h1.second}
            </h1>
          </div>
        </motion.div>
      </main>
    </>
  );
}

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
          initial={{ opacity: 0, scale: .8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
          }}
        >
          <div className="flex h-screen items-center justify-center">
            <h1 className="text-4xl font-bold">Welcome to Jasoria</h1>
          </div>
        </motion.div>
      </main>
    </>
  );
}

import React from "react";
import * as motion from "motion/react-client";

export default function PageHeader(props: { title: string; sub: string }) {
  const { title, sub } = props;
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-8">
        <h1 className="text-2xl sm:text-4xl/13 font-medium sm:font-normal  mb-2 sm:mb-0">
          {title}
        </h1>
        <span className="text-base/5 sm:text-xl font-normal">{sub}</span>
      </div>
    </motion.div>
  );
}

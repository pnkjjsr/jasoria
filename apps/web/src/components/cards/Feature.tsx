"use client";

import React from "react";
import * as motion from "motion/react-client";
import { NotebookPen } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

export default function Feature() {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      // whileHover={{ scale: 1.03 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="max-w-lg mx-2 sm:mx-auto text-center gap-0 shadow-2xl opacity-90">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">Home Help Book</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center my-4">
          <NotebookPen size={80} strokeWidth={0.5} />
        </CardContent>
        <CardFooter>
          <p className="">
            <span className="text-base sm:text-xl font-semibold">
              Keep Your Support Contact Just a Tap Away
            </span>
            <br />
            <span className="text-sm sm:text-base">
              Store and share essential support contacts when it matters most.
            </span>
          </p>
        </CardFooter>
        {/* <div className="mt-2">
          <Button className="hover:cursor-pointer ">Lets Start</Button>
        </div> */}
      </Card>
    </motion.div>
  );
}

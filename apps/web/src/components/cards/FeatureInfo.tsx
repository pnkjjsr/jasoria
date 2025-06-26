"use client";

import React from "react";
import Link from "next/link";
import * as motion from "motion/react-client";

import { FeatureInfoType } from "@repo/shared/types/common";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function FeatureInfo(props: FeatureInfoType) {
  const { icon, title, heading, sub, cta, href } = props;
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="max-w-lg mx-2 sm:mx-auto text-center gap-0 shadow-2xl opacity-90">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center my-4">
          {icon}
        </CardContent>
        <CardFooter>
          <p className="">
            <span className="text-base sm:text-xl font-semibold">
              {heading}
            </span>
            <br />
            <span className="text-sm sm:text-base">{sub}</span>
          </p>
        </CardFooter>
        <div className="mt-2">
          <Link href={href} passHref>
            <Button className="hover:cursor-pointer">{cta}</Button>
          </Link>
        </div>
      </Card>
    </motion.div>
  );
}

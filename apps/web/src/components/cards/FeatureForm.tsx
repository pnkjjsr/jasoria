import React from "react";
import * as motion from "motion/react-client";

import { FeatureFormType } from "@repo/shared/types/common";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import FeatureCard from "@/components/forms/FeatureCard";

export default function FeatureForm(props: FeatureFormType) {
  const { icon, heading, sub, cta } = props;
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="max-w-sm text-center gap-0 shadow-2xl opacity-90 relative">
        <i className="absolute top-4 right-4">{icon}</i>

        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl text-left leading-6">
            <h2 className="leading-5 font-semibold">{heading}</h2>
            <small className="leading-auto text-base font-normal">{sub}</small>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center justify-center mt-2">
          <FeatureCard cta={cta} />
        </CardContent>
      </Card>
    </motion.div>
  );
}

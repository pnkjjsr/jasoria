import React from "react";
import { Wrench } from "lucide-react";

import PageHeader from "@/layout/headers/page";
import FeatureForm from "@/components/cards/FeatureForm";

import { en as locale } from "@repo/shared/locale/index";

export default function HHB() {
  return (
    <div className="container w-auto lg:w-5xl mx-4 xl:mx-auto my-5 md:my-10 leading-0">
      <PageHeader
        title={locale.feature_hhb.title}
        sub={locale.feature_hhb.sub}
      />

      <FeatureForm
        icon={<Wrench size={80} strokeWidth={0.5} />}
        heading={locale.form_hhb.heading}
        sub={locale.form_hhb.sub}
        cta={locale.form_hhb.cta}
      />
    </div>
  );
}

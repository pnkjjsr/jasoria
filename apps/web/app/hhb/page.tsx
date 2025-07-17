import React from "react";
import { Wrench } from "lucide-react";
import { PlugZap } from "lucide-react";
import { AirVent } from "lucide-react";
import { Armchair } from "lucide-react";
import { GlassWater } from "lucide-react";
import { ShowerHead } from "lucide-react";
import { Flower } from "lucide-react";

import { locale } from "@repo/shared/locale/index";
import { HHB_TYPE } from "@repo/shared/const/hhb";

import PageHeader from "@/layout/headers/page";
import FeatureForm from "@/components/cards/HHB_Feature/FeatureForm";

export default function HHB() {
  return (
    <div className="container w-auto lg:w-5xl mx-4 xl:mx-auto my-5 md:my-10 leading-0">
      <PageHeader
        title={locale.feature_hhb.title}
        sub={locale.feature_hhb.sub}
      />

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureForm
          icon={<AirVent size={80} strokeWidth={0.5} />}
          heading={locale.hhb_maid.heading}
          sub={locale.hhb_maid.sub}
          cta={locale.hhb_maid.cta}
          type={HHB_TYPE.MAID}
        />

        <FeatureForm
          icon={<Wrench size={80} strokeWidth={0.5} />}
          heading={locale.hhb_plumber.heading}
          sub={locale.hhb_plumber.sub}
          cta={locale.hhb_plumber.cta}
          type={HHB_TYPE.PLUMBER}
        />

        <FeatureForm
          icon={<PlugZap size={80} strokeWidth={0.5} />}
          heading={locale.hhb_electrician.heading}
          sub={locale.hhb_electrician.sub}
          cta={locale.hhb_electrician.cta}
          type={HHB_TYPE.ELECTRICIAN}
        />

        <FeatureForm
          icon={<AirVent size={80} strokeWidth={0.5} />}
          heading={locale.hhb_acservice.heading}
          sub={locale.hhb_acservice.sub}
          cta={locale.hhb_acservice.cta}
          type={HHB_TYPE.AC_SERVICE}
        />

        <FeatureForm
          icon={<Armchair size={80} strokeWidth={0.5} />}
          heading={locale.hhb_carpenter.heading}
          sub={locale.hhb_carpenter.sub}
          cta={locale.hhb_carpenter.cta}
          type={HHB_TYPE.CARPENTER}
        />

        <FeatureForm
          icon={<GlassWater size={80} strokeWidth={0.5} />}
          heading={locale.hhb_roservice.heading}
          sub={locale.hhb_roservice.sub}
          cta={locale.hhb_roservice.cta}
          type={HHB_TYPE.RO_SERVICE}
        />

        <FeatureForm
          icon={<ShowerHead size={80} strokeWidth={0.5} />}
          heading={locale.hhb_geyser.heading}
          sub={locale.hhb_geyser.sub}
          cta={locale.hhb_geyser.cta}
          type={HHB_TYPE.GEYSER}
        />

        <FeatureForm
          icon={<Flower size={80} strokeWidth={0.5} />}
          heading={locale.hhb_gardener.heading}
          sub={locale.hhb_gardener.sub}
          cta={locale.hhb_gardener.cta}
          type={HHB_TYPE.GARDENER}
        />
      </div>
    </div>
  );
}

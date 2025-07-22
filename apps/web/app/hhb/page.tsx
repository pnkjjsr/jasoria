import React from "react";
import { useTranslations } from "next-intl";
import { Wrench } from "lucide-react";
import { PlugZap } from "lucide-react";
import { AirVent } from "lucide-react";
import { Armchair } from "lucide-react";
import { GlassWater } from "lucide-react";
import { ShowerHead } from "lucide-react";
import { Flower } from "lucide-react";

import { HHB_TYPE } from "@repo/shared/const/hhb";

import PageHeader from "@/layout/headers/page";
import FeatureForm from "@/components/cards/HHB_Feature/FeatureForm";
import ImportHHB from "@/components/cards/HHB_Feature/Import";

export default function HHB() {
  const t = useTranslations();
  return (
    <div className="container w-auto lg:w-5xl mx-4 xl:mx-auto my-5 md:my-10 leading-0">
      <PageHeader title={t("feature_hhb.title")} sub={t("feature_hhb.sub")} />

      <ImportHHB />

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureForm
          icon={<AirVent size={80} strokeWidth={0.5} />}
          heading={t("hhb_maid.heading")}
          sub={t("hhb_maid.sub")}
          cta={t("hhb_maid.cta")}
          type={HHB_TYPE.MAID}
        />

        <FeatureForm
          icon={<Wrench size={80} strokeWidth={0.5} />}
          heading={t("hhb_plumber.heading")}
          sub={t("hhb_plumber.sub")}
          cta={t("hhb_plumber.cta")}
          type={HHB_TYPE.PLUMBER}
        />

        <FeatureForm
          icon={<PlugZap size={80} strokeWidth={0.5} />}
          heading={t("hhb_electrician.heading")}
          sub={t("hhb_electrician.sub")}
          cta={t("hhb_electrician.cta")}
          type={HHB_TYPE.ELECTRICIAN}
        />

        <FeatureForm
          icon={<AirVent size={80} strokeWidth={0.5} />}
          heading={t("hhb_acservice.heading")}
          sub={t("hhb_acservice.sub")}
          cta={t("hhb_acservice.cta")}
          type={HHB_TYPE.AC_SERVICE}
        />

        <FeatureForm
          icon={<Armchair size={80} strokeWidth={0.5} />}
          heading={t("hhb_carpenter.heading")}
          sub={t("hhb_carpenter.sub")}
          cta={t("hhb_carpenter.cta")}
          type={HHB_TYPE.CARPENTER}
        />

        <FeatureForm
          icon={<GlassWater size={80} strokeWidth={0.5} />}
          heading={t("hhb_roservice.heading")}
          sub={t("hhb_roservice.sub")}
          cta={t("hhb_roservice.cta")}
          type={HHB_TYPE.RO_SERVICE}
        />

        <FeatureForm
          icon={<ShowerHead size={80} strokeWidth={0.5} />}
          heading={t("hhb_geyser.heading")}
          sub={t("hhb_geyser.sub")}
          cta={t("hhb_geyser.cta")}
          type={HHB_TYPE.GEYSER}
        />

        <FeatureForm
          icon={<Flower size={80} strokeWidth={0.5} />}
          heading={t("hhb_gardener.heading")}
          sub={t("hhb_gardener.sub")}
          cta={t("hhb_gardener.cta")}
          type={HHB_TYPE.GARDENER}
        />
      </div>
    </div>
  );
}

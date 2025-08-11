"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import * as motion from "motion/react-client";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import {
  Wrench,
  PlugZap,
  AirVent,
  Armchair,
  GlassWater,
  ShowerHead,
  Flower,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { HHB_TYPE } from "@repo/shared/const/hhb";
import { useAppSelector } from "@repo/shared/redux/hooks";
import { selectUser } from "@repo/shared/redux/slices/user/userSlice";
import { userSupaType } from "@repo/shared/types/auth";
import { postHHB } from "@repo/shared/lib/superbase/tables/hhb";

import PageHeader from "@/layout/headers/page";
import FeatureForm from "@/components/cards/HHB_Feature/FeatureForm";
import PreviewHHB from "@/components/cards/HHB_Feature/Preview";

export default function HHB() {
  const t = useTranslations();
  const router = useRouter();
  const user = useAppSelector(selectUser);

  const searchParams = useSearchParams();
  const sharedBy = searchParams?.get("user_id");
  const type = searchParams?.get("type");
  const firstname = searchParams?.get("firstname");
  const lastname = searchParams?.get("lastname");
  const phonenumber = searchParams?.get("phonenumber");

  const renderHHBForm = () => {
    return (
      <>
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
      </>
    );
  };

  const renderHHBPreivew = () => {
    let helpData = { sharedBy, type, firstname, lastname, phonenumber };

    const handleSaveContact = async () => {
      const message = t("toast.login_required");
      if (user === null) return toast.error(message);

      const payload = {
        user_id: (user as userSupaType)?.id,
        type: type,
        phonenumber: phonenumber,
        firstname: firstname,
        lastname: lastname,
        sharedby: sharedBy,
      };

      const error = await postHHB(payload);
      if (error)
        return toast.error(t("toast.failed_to_submit") + error.message);
      toast.success(t("toast.shared_contact_saved"));

      router.push("/hhb");
    };

    return (
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="max-w-sm text-center gap-0 shadow-2xl opacity-90 relative">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl text-left leading-6">
              <h2 className="leading-5 font-semibold">{t("hhb_open.title")}</h2>
              <small className="leading-auto text-base font-normal">
                {t("hhb_open.sub")}
              </small>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center mt-2 mb-4">
            <PreviewHHB data={helpData} view="open" />
          </CardContent>

          <CardFooter>
            <Button className="cursor-pointer" onClick={handleSaveContact}>
              {t("buttons.save_contact")}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="container w-auto lg:w-5xl mx-4 xl:mx-auto my-5 md:my-10 leading-0">
      <PageHeader title={t("feature_hhb.title")} sub={t("feature_hhb.sub")} />

      {/* <ImportHHB /> */}

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        {type !== null ? renderHHBPreivew() : renderHHBForm()}
      </div>
    </div>
  );
}

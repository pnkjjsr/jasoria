import * as motion from "motion/react-client";
import { NotebookPen } from "lucide-react";
import { useTranslations } from "next-intl";

import { locale } from "@repo/shared/locale/index";

import FeatureInfo from "@/components/cards/HHB_Feature/FeatureInfo";

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-col items-center justify-center my-10 lg:my-20">
          <h1 className="xl:w-7xl text-2xl md:text-5xl/15 lg:text-6xl/20 block text-center font-semibold">
            {locale.home.h1.first}
            <br />
            {locale.home.h1.second}
          </h1>
        </div>
      </motion.div>

      <FeatureInfo
        icon={<NotebookPen size={80} strokeWidth={0.5} />}
        title={locale.feature_hhb.title}
        heading={locale.feature_hhb.heading}
        sub={locale.feature_hhb.sub}
        cta={locale.buttons.lets_start}
        href="/hhb"
      />
    </>
  );
}

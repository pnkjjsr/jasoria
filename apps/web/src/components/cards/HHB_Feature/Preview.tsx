import React from "react";
import { useTranslations } from "next-intl";
import { Pencil } from "lucide-react";
import { Trash } from "lucide-react";
import { Share2 } from "lucide-react";

import { supabase } from "@repo/shared/lib/superbase/supabaseClient";
import { useAppSelector } from "@repo/shared/redux/hooks";
import { selectUser } from "@repo/shared/redux/slices/user/userSlice";
import { userSupaType } from "@repo/shared/types/auth";
import { webShare } from "@repo/shared/utils/common";

import { Button } from "@/components/ui/button";

export default function PreviewHHB(props: any) {
  const user = useAppSelector(selectUser);
  const t = useTranslations();
  const { editToggle, view } = props;
  const { user_id, type, firstname, lastname, phonenumber } = props.data;

  const handleEdit = () => {
    editToggle();
  };

  const handleDelete = async () => {
    await supabase
      .from("home_helps")
      .delete()
      .eq("user_id", user_id)
      .eq("type", type);

    editToggle();
  };

  const handleShare = async () => {
    const { name } = user as userSupaType;

    const data = {
      text: `Hi, ${name} is sharing his ${type}'s contact details with you.`,
      url: `${window.location.origin}/hhb?type=${type}&firstname=${firstname}&lastname=${lastname}&phonenumber=${phonenumber}&user_id=${user_id}`,
    };

    webShare(data);
  };

  return (
    <div className="w-full text-left">
      <h2 className="text-3xl">
        {firstname} {lastname}
      </h2>
      <p className="text-3xl">{phonenumber}</p>

      {view !== "open" && (
        <div className="flex mt-8 gap-3">
          <Button
            className="cursor-pointer"
            variant="secondary"
            onClick={handleDelete}
          >
            <Trash /> {t("buttons.delete")}
          </Button>

          <Button
            className="cursor-pointer"
            variant="outline"
            onClick={handleEdit}
          >
            <Pencil /> {t("buttons.edit")}
          </Button>

          <Button
            className="cursor-pointer"
            variant="outline"
            onClick={handleShare}
          >
            <Share2 /> {t("buttons.share")}
          </Button>
        </div>
      )}
    </div>
  );
}

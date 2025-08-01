"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import * as motion from "motion/react-client";
import { Pencil } from "lucide-react";
import { Trash } from "lucide-react";

import { supabase } from "@repo/shared/lib/superbase/supabaseClient";
import { useAppSelector } from "@repo/shared/redux/hooks";
import { selectUser } from "@repo/shared/redux/slices/user/userSlice";
import { FeatureFormType } from "@repo/shared/types/common";
import { userSupaType } from "@repo/shared/types/auth";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

import HHBCard from "@/components/forms/HHBCard";

export default function FeatureForm(props: FeatureFormType) {
  const user = useAppSelector(selectUser);

  const { icon, heading, sub, cta, type } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [helpData, setHelpData] = useState(null);
  const [edit, setEdit] = useState(false);

  const handleEdit = () => setEdit((prev) => !prev);

  const getService = async () => {
    if (user !== null) {
      const { id } = user as userSupaType;

      const { data: help_data } = await supabase
        .from("home_helps")
        .select("*")
        .eq("user_id", id)
        .eq("type", type);

      if (help_data) {
        setIsLoading(true);

        if (help_data?.length > 0) {
          setHelpData(help_data[0]);
        }
      }
    }
  };

  useEffect(() => {
    if (user === null) return setIsLoading(true);
    getService();
  }, [user]);

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
          {!isLoading ? (
            <Skelton />
          ) : helpData && !edit ? (
            <Preview data={helpData} editToggle={handleEdit} />
          ) : (
            <HHBCard
              cta={cta}
              type={type}
              helpData={helpData}
              setHelpData={setHelpData}
              editStatus={edit}
              editToggle={handleEdit}
            />
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

function Skelton() {
  return (
    <div className="w-full text-left space-y-5">
      <div className="w-2/3">
        <Skeleton className="h-[32px] w-full rounded-full" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-[32px] w-full rounded-full" />
        <Skeleton className="h-[32px] w-full rounded-full" />
      </div>

      <Skeleton className="h-[36px] w-full rounded-full" />
    </div>
  );
}

function Preview(props: any) {
  const t = useTranslations();
  const { editToggle } = props;
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

  return (
    <div className="w-full text-left">
      <h2 className="text-3xl">
        {firstname} {lastname}
      </h2>
      <p className="text-3xl">{phonenumber}</p>

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
      </div>
    </div>
  );
}

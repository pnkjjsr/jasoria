"use client";

import React, { useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import { locale } from "@repo/shared/locale/index";
import { useAppSelector, useAppDispatch } from "@repo/shared/redux/hooks";
import {
  selectUser,
  selectProfile,
  addProfile,
  updateProfile,
} from "@repo/shared/redux/slices/user/userSlice";
import { userType, UIdType } from "@repo/shared/types/user";
import { userSupaType } from "@repo/shared/types/auth";

interface DrawerDialogProfileProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DrawerDialogProfile({
  open,
  setOpen,
}: DrawerDialogProfileProps) {
  const t = useTranslations();
  const isDesktop = useMediaQuery("(min-width: 640px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t("profile_heading")}</DialogTitle>
            <DialogDescription>{t("profile_sub")}</DialogDescription>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DialogTitle>{t("profile_heading")}</DialogTitle>
          <DialogDescription>{t("profile_sub")}</DialogDescription>
        </DrawerHeader>
        <ProfileForm />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">{t("buttons.cancel")}</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

const FormSchema = z.object({
  email: z
    .string()
    .min(5, {
      message: "Minimum 5 characters.",
    })
    .email({ message: "Invalid email address" }),
  mobile: z
    .string({ message: "Invalid mobile number" })
    .min(10, {
      message: "Minimum 10 characters.",
    })
    .max(10, {
      message: "Maximum 10 characters.",
    }),
  firstname: z.string().min(1, {
    message: "First name is required.",
  }),
  lastname: z.string().min(1, {
    message: "Last name is required.",
  }),
});

function ProfileForm() {
  const t = useTranslations();
  const user = useAppSelector(selectUser);
  const profile = useAppSelector(selectProfile) as userType | null;
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema as any),
    mode: "onChange",
    defaultValues: {
      email: profile?.email || "",
      mobile: profile?.mobile || "",
      firstname: profile?.firstname || "",
      lastname: profile?.lastname || "",
    },
  });

  const onSubmit = useCallback(async (data: z.infer<typeof FormSchema>) => {
    const { id } = user as userSupaType;
    const payload = {
      user_id: id,
      ...data,
    };

    await dispatch(addProfile(payload));
    toast.success("Profile updated successfully");
  }, []);

  useEffect(() => {
    const uid = (user as UIdType).uid;
    if (profile === null) dispatch(updateProfile({ uid }));

    form.setValue("email", profile?.email ?? "");
    form.setValue("mobile", profile?.mobile ?? "");
    form.setValue("firstname", profile?.firstname ?? "");
    form.setValue("lastname", profile?.lastname ?? "");
  }, [profile]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("grid items-start gap-6")}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[310px] px-4 sm:px-1 pb-1  overflow-y-auto">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex align-baseline flex-col">
                <FormLabel>{t("profile_form.email")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("profile_form.email")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem className="flex align-baseline flex-col">
                <FormLabel>{t("profile_form.mobile")}</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder={t("profile_form.mobile")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem className="flex align-baseline flex-col">
                <FormLabel>{t("profile_form.firstname")}</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder={t("profile_form.firstname")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem className="flex align-baseline flex-col">
                <FormLabel>{t("profile_form.lastname")}</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder={t("profile_form.lastname")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid w-full px-4 sm:px-0">
          <Button type="submit">{t("buttons.save")}</Button>
        </div>
      </form>
    </Form>
  );
}

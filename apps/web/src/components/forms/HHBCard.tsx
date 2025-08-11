"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  isNavigatorContacts,
  getNavigatorContacts,
  getFirstWord,
  parseFullName,
} from "@repo/shared/utils/common";
import { useAppSelector } from "@repo/shared/redux/hooks";
import { selectUser } from "@repo/shared/redux/slices/user/userSlice";
import { userSupaType } from "@repo/shared/types/auth";
import { postHHB, updateHHB } from "@repo/shared/lib/superbase/tables/hhb";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  phonenumber: z
    .string({ message: "Invalid mobile number" })
    .min(10, {
      message: "Minimum 10 characters.",
    })
    .max(10, {
      message: "Maximum 10 characters.",
    }),
  firstname: z.string().min(1, {
    message: "Is required.",
  }),
  lastname: z.string().min(1, {
    message: "Is required.",
  }),
});

export default function HHBCard(props: any) {
  const t = useTranslations();
  const user = useAppSelector(selectUser);
  const { cta, type, helpData, setHelpData, editStatus, editToggle } = props;
  const [isSupported, setIsSupported] = useState(false);
  const [contacts, setContacts] = useState([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phonenumber: helpData?.phonenumber || "",
      firstname: helpData?.firstname || "",
      lastname: helpData?.lastname || "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const message = t("toast.login_required");
    if (user === null) return toast.error(message);

    if (
      data.firstname === helpData?.firstname &&
      data.lastname === helpData?.lastname &&
      data.phonenumber === helpData?.phonenumber
    )
      return toast.error("No change detected.");

    const { id } = user as userSupaType;
    const payload = {
      user_id: id,
      type: type,
      phonenumber: data.phonenumber,
      firstname: data.firstname,
      lastname: data.lastname,
    };

    let errHelp;

    if (editStatus) {
      const error = await updateHHB(payload);
      errHelp = error;
    } else {
      const error = await postHHB(payload);
      errHelp = error;
    }

    if (errHelp) toast.error(t("toast.failed_to_submit") + errHelp.message);
    else {
      setHelpData(payload);
      toast.success(t("toast.form_submitted"));
      // form.reset();
    }
  }

  const handleImport = async () => {
    const props = ["name", "tel"];
    const opts = false;
    const contact = await getNavigatorContacts(props, opts);
    setContacts(contact);

    const firstContact = contact[0];
    const { firstName, lastName } = parseFullName(firstContact.name[0]);
    if (firstContact) {
      form.setValue("firstname", firstName);
      form.setValue("lastname", lastName);
      form.setValue("phonenumber", getFirstWord(firstContact.tel[0]));
    }
  };

  useEffect(() => {
    const navigator = isNavigatorContacts();
    if (navigator) {
      setIsSupported(true);
      return;
    }
  }, []);

  return (
    <Form {...form}>
      <form
        className="w-full text-left space-y-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="w-2/3">
          <FormField
            control={form.control}
            name="phonenumber"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="h-8 text-sm"
                    placeholder={t("profile_form.mobile")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="h-8 text-sm"
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
              <FormItem>
                <FormControl>
                  <Input
                    className="h-8 text-sm"
                    placeholder={t("profile_form.lastname")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-[1fr_1fr_1fr]  grid-template gap-4">
          {editStatus && (
            <Button variant="secondary" className="w-full" onClick={editToggle}>
              {t("buttons.cancel")}
            </Button>
          )}

          <Button className="w-full" type="submit">
            {cta}
          </Button>

          {!editStatus && isSupported && (
            <Button
              className="w-full"
              type="button"
              variant="outline"
              onClick={handleImport}
            >
              Import
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}

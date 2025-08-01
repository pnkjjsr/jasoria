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
} from "@repo/shared/utils/common";
import { supabase } from "@repo/shared/lib/superbase/supabaseClient";
import { useAppSelector } from "@repo/shared/redux/hooks";
import { selectUser } from "@repo/shared/redux/slices/user/userSlice";
import { userSupaType } from "@repo/shared/types/auth";

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
    if (user === null) return toast.error(`Please login to save your ${type}.`);
    const { id } = user as userSupaType;

    if (
      data.firstname === helpData?.firstname &&
      data.lastname === helpData?.lastname &&
      data.phonenumber === helpData?.phonenumber
    )
      return toast.error("No change detected.");

    const payload = {
      user_id: id,
      type: type,
      phonenumber: data.phonenumber,
      firstname: data.firstname,
      lastname: data.lastname,
    };

    let errHelp;

    if (editStatus) {
      const { error } = await supabase
        .from("home_helps")
        .update(payload)
        .eq("type", type)
        .eq("user_id", id);

      errHelp = error;
    } else {
      const { error } = await supabase.from("home_helps").upsert(payload);
      errHelp = error;
    }

    if (errHelp) {
      toast.error("Failed to submit: " + errHelp.message);
    } else {
      setHelpData(payload);
      toast.success("Form submitted and saved to Supabase!");
      // form.reset();
    }
  }

  const handleImport = async () => {
    const props = ["name", "tel"];
    const opts = false;
    const contact = await getNavigatorContacts(props, opts);
    setContacts(contact);

    form.setValue("firstname", contact[0].name[0]);
    form.setValue("lastname", contact[0].name[1]);
    form.setValue("phonenumber", contact[0].tel);
  };

  useEffect(() => {
    const navigator = isNavigatorContacts();
    if (navigator) {
      setIsSupported(true);
      return;
    }
  }, []);

  const renderContacts = () => {
    return contacts.map((contact: any) => {
      return (
        <div key={contact.id}>
          <p>{contact.name}</p>
          <p>{contact.name[0]}</p>
          <p>{contact.name[1]}</p>
          <p>{contact.tel}</p>
        </div>
      );
    });
  };

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

        <div className="mt-4">
          <h3 className="text-xl font-semibold">Contacts</h3>
          {renderContacts()}
        </div>
      </form>
    </Form>
  );
}

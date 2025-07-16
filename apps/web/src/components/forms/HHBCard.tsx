"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { supabase } from "@repo/shared/lib/superbase/supabaseClient";
import { useAppSelector } from "@repo/shared/redux/hooks";
import { selectUser } from "@repo/shared/redux/slices/user/userSlice";
import { userSupaType } from "@repo/shared/types/auth";
import { en as locale } from "@repo/shared/locale/index";

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
    message: "First name is required.",
  }),
  lastname: z.string().min(1, {
    message: "Last name is required.",
  }),
});

export default function HHBCard(props: any) {
  const { cta, type, helpData, setHelpData, editStatus, editToggle } = props;
  const user = useAppSelector(selectUser);

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
                    placeholder="Phone Number"
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
                    placeholder="First Name"
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
                    placeholder="Last Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-[1fr_3fr]  grid-template gap-4">
          {editStatus && (
            <Button variant="secondary" className="w-full" onClick={editToggle}>
              {locale.buttons.cancel}
            </Button>
          )}

          <Button className="w-full" type="submit">
            {cta}
          </Button>
        </div>
      </form>
    </Form>
  );
}

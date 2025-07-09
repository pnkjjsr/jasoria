"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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
    message: "First name is required.",
  }),
  lastname: z.string().min(1, {
    message: "Last name is required.",
  }),
});

export default function HHBCard(props: {
  cta: string;
  type: string;
  setHelpData: any;
}) {
  const { cta, type, setHelpData } = props;
  const user = useAppSelector(selectUser);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phonenumber: "",
      firstname: "",
      lastname: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { id } = user as userSupaType;

    const payload = {
      type: type,
      user_id: id,
      phonenumber: data.phonenumber,
      firstname: data.firstname,
      lastname: data.lastname,
    };

    const { error } = await supabase
      .from("home_helps")
      .upsert(payload)
      .select();

    if (error) {
      toast.error("Failed to submit: " + error.message);
    } else {
      setHelpData(payload);
      toast.success("Form submitted and saved to Supabase!");
      form.reset();
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

        <Button className="w-full" type="submit">
          {cta}
        </Button>
      </form>
    </Form>
  );
}

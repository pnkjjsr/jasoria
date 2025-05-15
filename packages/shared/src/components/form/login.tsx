import React from "react";

import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function LoginForm(props: { className?: string }) {
  const { className } = props;

  return (
    <>
      <form className={cn("grid items-start gap-4", className)}>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" defaultValue="" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="username">Password</Label>
          <Input type="password" id="passwords" defaultValue="" />
        </div>
        <Button type="submit">Save changes</Button>
      </form>
    </>
  );
}

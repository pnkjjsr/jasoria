import React from "react";
import { useTranslations } from "next-intl";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { DrawerDialogProfile } from "@/components/modals/profile";

import { userSupaType } from "@repo/shared/types/auth";
import { getInitials } from "@repo/shared/utils/common";

interface propsData {
  user: userSupaType;
  logout: VoidFunction;
}

export default function UserMenu(props: propsData) {
  const t = useTranslations();
  const { user, logout } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage
              className="cursor-pointer"
              src={user.picture}
              alt={user.name}
            />
            <AvatarFallback className="cursor-pointer">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>{t("account_menu.heading")}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setOpen(true)}
            >
              {t("account_menu.profile")}
            </DropdownMenuItem>
            {/* <DropdownMenuItem>Settings</DropdownMenuItem> */}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={logout}>
            {t("account_menu.logout")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DrawerDialogProfile open={open} setOpen={setOpen} />
    </>
  );
}

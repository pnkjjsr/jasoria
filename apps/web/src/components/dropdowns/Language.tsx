"use client";

import { useState, useEffect } from "react";
import { Locale, defaultLocale } from "@/lib/i18n/config";
import { setUserLocale, getUserLocale } from "@/lib/i18n/services/locale";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { LOCALES } from "@repo/shared/const/common";

export default function DropdownLanguage() {
  const [selected, setSelected] = useState(defaultLocale);

  const handleChange = (value: string) => {
    const locale = value as Locale;
    setUserLocale(locale);
    setSelected(locale);
  };

  const RenderLanguage = () => {
    return LOCALES.map((item, i) => {
      return (
        <SelectItem className="capitalize" key={i} value={item.lng}>
          {item.name}
        </SelectItem>
      );
    });
  };

  const getCookieLocale = async () => {
    const locale = await getUserLocale();
    setSelected(locale as Locale);
  };

  useEffect(() => {
    getCookieLocale();
  }, []);

  return (
    <Select value={selected} onValueChange={handleChange}>
      <SelectTrigger className="text-current font-semibold capitalize transition-none p-0 border-none shadow-none focus-visible:ring-0">
        <SelectValue placeholder="English" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Language</SelectLabel>
          {RenderLanguage()}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

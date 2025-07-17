import { getRequestConfig } from "next-intl/server";
import { getUserLocale } from "@/lib/i18n/services/locale";

import { en, hi } from "@repo/shared/locale/index";

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const locale = await getUserLocale();

  switch (locale) {
    case "en":
      return {
        locale,
        messages: en,
      };
    case "hi":
      return {
        locale,
        messages: hi,
      };
    default:
      return {
        locale: "en",
        messages: en,
      };
  }
});

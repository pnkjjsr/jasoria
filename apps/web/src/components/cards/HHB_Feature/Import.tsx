"use client";

import React, { useEffect } from "react";
import { useTranslations } from "next-intl";
import * as motion from "motion/react-client";
import { Download } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ImportHHB() {
  const t = useTranslations("hhb_import");
  const [isSupported, setIsSupported] = React.useState(false);

  const handleImport = async () => {
    try {
      if (!("contacts" in navigator) || !("ContactsManager" in window)) {
        alert("Contact Picker API is not supported on this browser.");
        return;
      }
      const props = ["name", "tel", "email"]; // You can include 'address', 'icon' etc.
      const opts = { multiple: true };

      const contacts = await (navigator.contacts as any).select(props, opts);

      console.log("Imported Contacts:", contacts);
      // You can now save or display these contacts
    } catch (err) {
      console.error("Failed to fetch contacts:", err);
    }
  };

  useEffect(() => {
    if (!("contacts" in navigator) || !("ContactsManager" in window)) {
      setIsSupported(false);
      return;
    }
  }, []);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="max-w-sm text-center gap-0 mb-4 shadow-2xl opacity-90 relative">
        <CardHeader>
          <CardTitle className="text-3xl sm:text-2xl font-semibold text-left leading-6">
            <h2 className="flex items-center justify-center gap-2 leading-5">
              <Download />
              {t("heading")}
            </h2>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center justify-center mt-2 mb-4 leading-6">
          <p>{t("sub")}</p>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          {!isSupported ? (
            <Alert variant="destructive" className="text-left">
              <AlertCircleIcon />
              <AlertTitle>{t("error_title")}</AlertTitle>
              <AlertDescription>
                <p>{t("error_text")}</p>
              </AlertDescription>
            </Alert>
          ) : (
            <Button onClick={handleImport}>{t("cta")}</Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}

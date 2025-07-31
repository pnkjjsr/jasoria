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

import {
  isNavigatorContacts,
  getNavigatorContacts,
} from "@repo/shared/utils/common";

export default function ImportHHB() {
  const t = useTranslations("hhb_import");
  const [isSupported, setIsSupported] = React.useState(false);
  const [contacts, setContacts] = React.useState([]);

  const handleImport = async () => {
    const contacts = await getNavigatorContacts();
    setContacts(contacts);
  };

  const renderContacts = () => {
    return contacts.map((contact: any) => {
      return (
        <div key={contact.id}>
          <p>{contact.name}</p>
          <p>{contact.tel}</p>
          <p>{contact.email}</p>
        </div>
      );
    });
  };

  useEffect(() => {
    const navigator = isNavigatorContacts();
    if (navigator) {
      setIsSupported(true);
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
          {contacts.length > 0 && (
            <div className="mt-4">
              <h3 className="text-xl font-semibold">Contacts</h3>
              {renderContacts()}
            </div>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}

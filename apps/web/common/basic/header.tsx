import React from "react";
import Logo from "@repo/shared/components/logos/header";

export default function header() {
  return (
    <header className="flex justify-center pt-2">
      <Logo path="/logo-jasoria.svg" width={310} height={55} alt="Jasoria" />
    </header>
  );
}

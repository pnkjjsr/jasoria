import React from "react";
import Image from "next/image";

import { ImageProps } from "@repo/shared/types/common";

export default function logo(props: ImageProps) {
  const { path, width, height, alt } = props;
  return <Image priority src={path} width={width} height={height} alt={alt} />;
}

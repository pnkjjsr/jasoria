import React from "react";
import Image from "next/image";

interface LogoProps {
  path: string;
  width: number;
  height: number;
  alt: string;
}

export default function logo(props: LogoProps) {
  const { path, width, height, alt } = props;
  return <Image src={path} width={width} height={height} alt={alt} />;
}

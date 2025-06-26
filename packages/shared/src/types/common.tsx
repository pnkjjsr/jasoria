export interface ImageProps {
  path: string;
  width: number;
  height: number;
  alt: string;
}

export interface FeatureInfoType {
  icon: React.ReactNode;
  title: string;
  heading: string;
  sub: string;
  cta: string;
  href: string;
}


export interface FeatureFormType {
  icon: React.ReactNode;
  heading: string;
  sub: string;
  cta: string;
}
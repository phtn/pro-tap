import { type IconName } from "@/lib/icons";

export interface FeatureItem {
  title: string;
  description: string;
  status: string;
  icon: IconName;
}

export interface DetailHeaderProps {
  onPrev: VoidFunction;
  onNext: VoidFunction;
  label: string;
}

export interface GenericList {
  id: string | number;
  label: string;
  value?: string | number;
}

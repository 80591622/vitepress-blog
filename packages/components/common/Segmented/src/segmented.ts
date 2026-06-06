import type { TkIconProps } from "@teek/components/common/icon";

export type ModelType = string | number | object | boolean | undefined;

export interface SegmentedProps {
  options: SegmentedOption[];
  disabled?: boolean;
}
export interface SegmentedEmits {
  change: [model: any];
}

export interface SegmentedOption extends SegmentedBase {
  ariaLabel?: string;
  disabled?: boolean;
}

export interface SegmentedItemProps extends SegmentedBase {
  disabled?: boolean;
}

export interface SegmentedBase {
  value: ModelType;
  label?: string;
  icon?: TkIconProps["icon"];
  title?: string;
  name?: string;
}

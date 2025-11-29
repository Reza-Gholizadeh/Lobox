import type { MultiSelectItem } from "../multiSelect/MultiSelect.type";

export interface ChipProps {
  item: MultiSelectItem;
  onRemove: (id: string) => void;
}

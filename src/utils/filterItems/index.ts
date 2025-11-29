import { MultiSelectItem } from "@/components/multiSelect/MultiSelect.type";

/**
 * Filters items based on selected items and input text
 * @param items - all available items
 * @param selected - currently selected items
 * @param input - input value for filtering
 * @returns filtered items
 */


export const filterItems = (
  items: MultiSelectItem[],
  selected: MultiSelectItem[],
  input: string
): MultiSelectItem[] => {
  const lowerInput = input.toLowerCase();
  return items.filter(
    (item) =>
      !selected.find((selectedItem) => selectedItem.id === item.id) &&
      item.label.toLowerCase().includes(lowerInput)
  );
};

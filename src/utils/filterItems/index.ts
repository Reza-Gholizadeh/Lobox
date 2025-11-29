import { MultiSelectItem } from "@/components/multiSelect/MultiSelect.type";
/**
 * Filters items based ONLY on the search input.
 * Selected items are NOT filtered out — they are shown with a checkmark in the dropdown.
 */
export const filterItems = (
  items: MultiSelectItem[],
  input: string
): MultiSelectItem[] => {
  const query = input.trim().toLowerCase();

  if (!query) {
    return items;
  }

  return items.filter((item) => item.label.toLowerCase().includes(query));
};

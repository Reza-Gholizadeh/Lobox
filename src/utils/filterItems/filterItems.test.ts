import { describe, expect, it } from "vitest";
import { filterItems } from ".";
import { MultiSelectItem } from "@/components/multiSelect/MultiSelect.type";

const items: MultiSelectItem[] = [
  { id: "1", label: "Apple" },
  { id: "2", label: "Banana" },
  { id: "3", label: "Orange" },
];

const selected: MultiSelectItem[] = [{ id: "2", label: "Banana" }];

describe("filterItems", () => {
  it("should remove selected items", () => {
    const result = filterItems(items, selected, "");
    expect(result).toEqual([
      { id: "1", label: "Apple" },
      { id: "3", label: "Orange" },
    ]);
  });

  it("should filter by input text case-insensitively", () => {
    const result = filterItems(items, [], "an");
    expect(result).toEqual([
      { id: "2", label: "Banana" },
      { id: "3", label: "Orange" },
    ]);
  });

  it("should return empty array if no match", () => {
    const result = filterItems(items, [], "zzz");
    expect(result).toEqual([]);
  });

  it("should remove selected items and filter by input", () => {
    const result = filterItems(items, selected, "ap");
    expect(result).toEqual([{ id: "1", label: "Apple" }]);
  });
});

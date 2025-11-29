import { describe, expect, it } from "vitest";
import { filterItems } from ".";
import { MultiSelectItem } from "@/components/multiSelect/MultiSelect.type";

describe("filterItems", () => {
  const items: MultiSelectItem[] = [
    { id: "1", label: "Apple" },
    { id: "2", label: "Banana" },
    { id: "3", label: "Orange" },
  ];

  it("should return all items when input is empty (regardless of selection)", () => {
    const result = filterItems(items, "");
    expect(result).toEqual(items);
  });

  it("should filter items case-insensitively based on input", () => {
    const result = filterItems(items, "an");
    expect(result).toEqual([
      { id: "2", label: "Banana" },
      { id: "3", label: "Orange" },
    ]);
  });

  it("should return empty array when no items match the query", () => {
    const result = filterItems(items, "xyz");
    expect(result).toEqual([]);
  });

  it("should be case insensitive", () => {
    const result = filterItems(items, "AP");
    expect(result).toEqual([{ id: "1", label: "Apple" }]);
  });
});

import { renderHook, act } from "@testing-library/react";
import { useMultiSelect } from "./useMultiSelect";
import { describe, expect, it } from "vitest";

describe("useMultiSelect hook", () => {
  it("should initialize correctly", () => {
    const { result } = renderHook(() => useMultiSelect());
    expect(result.current.state.selected).toEqual([]);
    expect(result.current.state.items).toEqual([]);
    expect(result.current.state.isOpen).toBe(false);
    expect(result.current.state.highlightedIndex).toBe(-1);
  });

  it("should add new item", () => {
    const { result } = renderHook(() => useMultiSelect());
    const newItem = { id: "1", label: "Apple" };

    act(() => {
      result.current.dispatch({ type: "ADD_ITEM", payload: newItem });
    });

    expect(result.current.state.items).toContainEqual(newItem);
    expect(result.current.state.selected).toContainEqual(newItem);
    expect(result.current.state.inputValue).toBe("");
  });

  it("should select an existing item", () => {
    const { result } = renderHook(() => useMultiSelect());
    const item = { id: "2", label: "Banana" };

    act(() => {
      result.current.dispatch({ type: "SELECT_ITEM", payload: item });
    });

    expect(result.current.state.selected).toContainEqual(item);
  });

  it("should remove an item", () => {
    const { result } = renderHook(() => useMultiSelect());
    const item = { id: "3", label: "Orange" };

    act(() => {
      result.current.dispatch({ type: "ADD_ITEM", payload: item });
    });

    act(() => {
      result.current.dispatch({ type: "REMOVE_ITEM", payload: item.id });
    });

    expect(result.current.state.selected).not.toContainEqual(item);
  });

  it("should handle open/close", () => {
    const { result } = renderHook(() => useMultiSelect());

    act(() => {
      result.current.dispatch({ type: "SET_OPEN", payload: true });
    });
    expect(result.current.state.isOpen).toBe(true);

    act(() => {
      result.current.dispatch({ type: "SET_OPEN", payload: false });
    });
    expect(result.current.state.isOpen).toBe(false);
  });
});

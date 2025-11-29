import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import useDebounce from ".";

describe("useDebounce", () => {
  vi.useFakeTimers();

  it("should update value after delay", () => {
    const wrapper = ({ children }: any) => children;

    let value = "a";
    const { result, rerender } = renderHook(() => useDebounce(value, 200), {
      wrapper,
    });

    expect(result.current).toBe("a");

    value = "b";
    rerender();

    expect(result.current).toBe("a");

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(result.current).toBe("b");
  });
});

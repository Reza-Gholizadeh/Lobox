import type {
  Action,
  MultiSelectItem,
  State,
} from "@/components/multiSelect/MultiSelect.type";

export const handleArrowKeys = (
  key: "ArrowUp" | "ArrowDown",
  state: State,
  dispatch: (action: Action) => void
) => {
  const visibleItems = state.items.filter(
    (item) => !state.selected.find((s) => s.id === item.id)
  );
  const maxIndex = visibleItems.length - 1;

  if (key === "ArrowDown") {
    dispatch({
      type: "SET_HIGHLIGHT",
      payload: Math.min(state.highlightedIndex + 1, maxIndex),
    });
  } else if (key === "ArrowUp") {
    dispatch({
      type: "SET_HIGHLIGHT",
      payload: Math.max(state.highlightedIndex - 1, 0),
    });
  }
};

export const handleEnterKey = (
  state: State,
  dispatch: (action: Action) => void
) => {
  const visibleItems = state.items.filter(
    (item) => !state.selected.find((s) => s.id === item.id)
  );

  if (state.highlightedIndex >= 0) {
    const selectedItem = visibleItems[state.highlightedIndex];
    dispatch({ type: "SELECT_ITEM", payload: selectedItem });
    dispatch({ type: "RESET_HIGHLIGHT" });
  } else if (state.inputValue.trim() !== "") {
    const newItem: MultiSelectItem = {
      id: crypto.randomUUID(),
      label: state.inputValue.trim(),
    };
    dispatch({ type: "ADD_ITEM", payload: newItem });
  }
};

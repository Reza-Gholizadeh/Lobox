import React, { KeyboardEvent, ChangeEvent } from "react";
import { filterItems } from "@/utils";
import useDebounce from "@/hooks/useDebounce";
import styles from "./MultiSelect.module.scss";
import { useMultiSelect } from "./useMultiSelect";
import type { MultiSelectItem } from "./MultiSelect.type";
import { Chip } from "../chip";
import { handleArrowKeys, handleEnterKey } from "@/utils/keyboard";

export const MultiSelect: React.FC = () => {
  const { state, dispatch, containerRef } = useMultiSelect();

  const debouncedInput = useDebounce(state.inputValue);

  const filteredItems = filterItems(
    state.items,
    state.selected,
    debouncedInput
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_INPUT", payload: event.target.value });
    dispatch({ type: "SET_OPEN", payload: true });
  };

  const handleSelectItem = (item: MultiSelectItem) => {
    dispatch({ type: "SELECT_ITEM", payload: item });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
  switch (e.key) {
    case "ArrowDown":
    case "ArrowUp":
      e.preventDefault();
      handleArrowKeys(e.key as "ArrowUp" | "ArrowDown", state, dispatch);
      break;
    case "Enter":
      e.preventDefault();
      handleEnterKey(state, dispatch);
      break;
    case "Escape":
      dispatch({ type: "SET_OPEN", payload: false });
      dispatch({ type: "RESET_HIGHLIGHT" });
      break;
    case "Backspace":
      if (state.inputValue === "" && state.selected.length) {
        const last = state.selected[state.selected.length - 1];
        dispatch({ type: "REMOVE_ITEM", payload: last.id });
      }
      break;
  }
};

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.inputWrapper}>
        {state.selected.map((item) => (
          <Chip
            key={item.id}
            item={item}
            onRemove={(id) => dispatch({ type: "REMOVE_ITEM", payload: id })}
          />
        ))}

        <input
          className={styles.input}
          value={state.inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type and press Enter..."
          onFocus={() => dispatch({ type: "SET_OPEN", payload: true })}
        />
      </div>

      {state.isOpen && (
        <div className={styles.dropdown} role="listbox">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className={`${styles.dropdownItem} ${
                index === state.highlightedIndex ? styles.highlighted : ""
              }`}
              onClick={() => handleSelectItem(item)}
              role="option"
              aria-selected={state.selected.some((s) => s.id === item.id)}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;

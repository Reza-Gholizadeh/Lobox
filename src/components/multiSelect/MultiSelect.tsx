import React, { KeyboardEvent, ChangeEvent, useRef } from "react";
import styles from "./MultiSelect.module.scss";
import { Chip } from "../chip";
import { useMultiSelect } from "./useMultiSelect";
import { filterItems } from "@/utils/filterItems";
import { MultiSelectItem } from "./MultiSelect.type";
import { Check, ChevronIcon } from "@/assets/icon";

export const MultiSelect: React.FC = () => {
  const { state, dispatch, containerRef } = useMultiSelect();
  const inputRef = useRef<HTMLInputElement>(null);
  const displayItems = filterItems(state.items, state.inputValue);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_INPUT", payload: e.target.value });
    dispatch({ type: "SET_OPEN", payload: true });
  };

  const handleSelectItem = (item: MultiSelectItem) => {
    const isSelected = state.selected.some((s) => s.id === item.id);
    if (isSelected) {
      dispatch({ type: "REMOVE_ITEM", payload: item.id });
    } else {
      dispatch({ type: "SELECT_ITEM", payload: item });
    }
    dispatch({ type: "CLEAR_INPUT" });
    dispatch({ type: "RESET_HIGHLIGHT" });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!state.isOpen && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      dispatch({ type: "SET_OPEN", payload: true });
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (displayItems.length === 0) return;

        const next = state.highlightedIndex + 1;
        dispatch({
          type: "SET_HIGHLIGHT",
          payload: next >= displayItems.length ? 0 : next,
        });
        break;

      case "ArrowUp":
        e.preventDefault();
        if (displayItems.length === 0) return;

        const prev = state.highlightedIndex - 1;
        dispatch({
          type: "SET_HIGHLIGHT",
          payload: prev < 0 ? displayItems.length - 1 : prev,
        });
        break;

      case "Enter":
        e.preventDefault();

        if (
          state.highlightedIndex >= 0 &&
          displayItems[state.highlightedIndex]
        ) {
          handleSelectItem(displayItems[state.highlightedIndex]);
        } else if (state.inputValue.trim() && displayItems.length === 0) {
          const newItem: MultiSelectItem = {
            id: Date.now().toString(),
            label: state.inputValue.trim(),
          };
          dispatch({ type: "ADD_ITEM", payload: newItem });
          dispatch({ type: "CLEAR_INPUT" });
        }
        break;

      case "Escape":
        dispatch({ type: "SET_OPEN", payload: false });
        dispatch({ type: "RESET_HIGHLIGHT" });
        break;

      case "Backspace":
        if (state.inputValue === "" && state.selected.length > 0) {
          const last = state.selected[state.selected.length - 1];
          dispatch({ type: "REMOVE_ITEM", payload: last.id });
        }
        break;
    }
  };

  return (
    <div className={styles.container} ref={containerRef}>
      {state.selected.length > 0 && (
        <div className={styles.chipsWrapper}>
          {state.selected.map((item) => (
            <Chip
              key={item.id}
              item={item}
              onRemove={() =>
                dispatch({ type: "REMOVE_ITEM", payload: item.id })
              }
            />
          ))}
        </div>
      )}

      <div
        className={styles.inputBox}
        onClick={() => inputRef.current?.focus()}
      >
        <input
          ref={inputRef}
          className={styles.input}
          value={state.inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => dispatch({ type: "SET_OPEN", payload: true })}
          placeholder={
            state.selected.length === 0 ? "Search or create new..." : ""
          }
        />
        <ChevronIcon isOpen={state.isOpen} className={styles.chevron} />
      </div>

      {state.isOpen && displayItems.length > 0 && (
        <div className={styles.dropdown}>
          {displayItems.map((item, index) => {
            const isSelected = state.selected.some((s) => s.id === item.id);

            return (
              <div
                key={item.id}
                className={`
                  ${styles.dropdownItem}
                  ${index === state.highlightedIndex ? styles.highlighted : ""}
                `}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelectItem(item)}
              >
                <span className={styles.itemLabel}>{item.label}</span>
                {isSelected && <Check />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;

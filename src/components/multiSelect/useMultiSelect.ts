import { useReducer, useRef, useEffect } from "react";
import type { Action, State } from "./MultiSelect.type";

const initialState: State = {
  items: [],
  selected: [],
  inputValue: "",
  isOpen: false,
  highlightedIndex: -1,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_INPUT":
      return { ...state, inputValue: action.payload };
    case "ADD_ITEM":
      return {
        ...state,
        items: [...state.items, action.payload],
        selected: [...state.selected, action.payload],
        inputValue: "",
      };
    case "SELECT_ITEM":
      if (state.selected.find((s) => s.id === action.payload.id)) return state;
      return { ...state, selected: [...state.selected, action.payload] };
    case "REMOVE_ITEM":
      return {
        ...state,
        selected: state.selected.filter((s) => s.id !== action.payload),
      };
    case "SET_OPEN":
      return { ...state, isOpen: action.payload };
    case "CLEAR_INPUT":
      return { ...state, inputValue: "" };
    case "SET_HIGHLIGHT":
      return { ...state, highlightedIndex: action.payload };
    case "RESET_HIGHLIGHT":
      return { ...state, highlightedIndex: -1 };
    default:
      return state;
  }
}

export const useMultiSelect = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        dispatch({ type: "SET_OPEN", payload: false });
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return {
    state,
    containerRef,
    dispatch,
  };
};

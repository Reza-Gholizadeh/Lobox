export interface MultiSelectItem {
  id: string;
  label: string;
}

export interface State {
  items: MultiSelectItem[];
  selected: MultiSelectItem[];
  inputValue: string;
  isOpen: boolean;
  highlightedIndex: number;
}

export type Action =
  | { type: "SET_HIGHLIGHT"; payload: number }
  | { type: "RESET_HIGHLIGHT" }
  | { type: "SET_INPUT"; payload: string }
  | { type: "ADD_ITEM"; payload: MultiSelectItem }
  | { type: "SELECT_ITEM"; payload: MultiSelectItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "SET_OPEN"; payload: boolean }
  | { type: "CLEAR_INPUT" };

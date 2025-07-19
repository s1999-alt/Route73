import { Product } from "@/components/productcards/ProductCard";

interface FilterState {
  price: [number, number];
  inStock: boolean | null; 
  color: string | "All";
  size: string | "All";
  activeFilterOnSale: boolean;
  filtered: Product[];
  sorted: Product[];
  sortingOption: string;
  currentPage: number;
  itemPerPage: number;
}

export const initialState: FilterState = {
 price: [0, 2000],
   inStock: null, 
  color: "All",
  size: "All",
  activeFilterOnSale: false,
  filtered: [],
  sorted: [],
  sortingOption: "Sort by (Default)",
  currentPage: 1,
  itemPerPage: 6,
};

// Action Types
export type Action =
  | { type: "SET_PRICE"; payload: [number, number] }
  | { type: "SET_COLOR"; payload: string }
  | { type: "SET_SIZE"; payload: string }
  | { type: "SET_AVAILABILITY"; payload: boolean | null } // Updated to accept null
  | { type: "SET_FILTERED"; payload: Product[] }
  | { type: "SET_SORTING_OPTION"; payload: string }
  | { type: "SET_SORTED"; payload: Product[] }
  | { type: "SET_CURRENT_PAGE"; payload: number }
  | { type: "TOGGLE_FILTER_ON_SALE" }
  | { type: "SET_ITEM_PER_PAGE"; payload: number }
  | { type: "CLEAR_FILTER"; payload: Product[] };

export function reducer(state: FilterState, action: Action): FilterState {
  switch (action.type) {
    case "SET_PRICE":
      return { ...state, price: action.payload };
    case "SET_COLOR":
      return { ...state, color: action.payload };
    case "SET_SIZE":
      return { ...state, size: action.payload };
    case "SET_AVAILABILITY":
      return { ...state, inStock: action.payload };
    case "SET_FILTERED":
      return { ...state, filtered: action.payload };
    case "SET_SORTING_OPTION":
      return { ...state, sortingOption: action.payload };
    case "SET_SORTED":
      return { ...state, sorted: action.payload };
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload };
    case "TOGGLE_FILTER_ON_SALE":
      return { ...state, activeFilterOnSale: !state.activeFilterOnSale };
    case "SET_ITEM_PER_PAGE":
      return { ...state, itemPerPage: action.payload };
    case "CLEAR_FILTER":
      return {
        ...initialState,
        filtered: action.payload,
        sorted: action.payload,
      };
    default:
      return state;
  }
}

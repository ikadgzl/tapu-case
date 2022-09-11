import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';

export type CartItem = {
  id: number;
  title: string;
  description: string;
  rate: number;
  price: number;
  distance: number;
  img: string;
};

type CartState = {
  items: CartItem[];
};

type CartContextActions = {
  add: (item: CartItem) => void;
  remove: (id: number) => void;
};

type CartContextType = CartState & {
  actions: CartContextActions;
};

const initialContext: CartContextType = {
  items: [],
  actions: {
    add: () => {},
    remove: () => {},
  },
};

const CartContext = createContext<CartContextType>(initialContext);

type ReducerActions =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: number };

const reducer = (state: CartState, action: ReducerActions) => {
  switch (action.type) {
    case 'ADD_ITEM':
      console.log(state, action);

      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    default:
      return state;
  }
};

type CartContextManagerProps = {
  children: ReactNode;
};
export const CartContextManager = ({ children }: CartContextManagerProps) => {
  const [state, dispatch] = useReducer(reducer, initialContext);

  const add = useCallback((item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  }, []);

  const remove = useCallback((id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  }, []);

  const actions = useMemo(() => ({ add, remove }), [add, remove]);

  const api: CartContextType = {
    items: state.items,
    actions,
  };

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
};

export const useCartContext = () => useContext(CartContext);

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';

export type Account = {
  email: string;
  password: string;
  locale: string;
  isLoggedIn?: boolean;
};

type AccountContextActions = {
  login: (credentials: Account) => void;
  logout: () => void;
  setLocale: (locale: string) => void;
};

type AccountContextType = Account & {
  actions: AccountContextActions;
};

const initialContext: AccountContextType = {
  email: '',
  password: '',
  locale: 'en',
  isLoggedIn: false,
  actions: {
    login: () => {},
    logout: () => {},
    setLocale: () => {},
  },
};

const CartContext = createContext<AccountContextType>(initialContext);

type ReducerActions =
  | { type: 'LOGIN'; payload: Account }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOCALE'; payload: string };

const reducer = (state: Account, action: ReducerActions) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...action.payload,
        isLoggedIn: true,
      };

    case 'LOGOUT':
      return {
        ...initialContext,
      };

    case 'SET_LOCALE':
      return {
        ...state,
        locale: action.payload,
      };

    default:
      return state;
  }
};

type AccountContextManagerProps = {
  children: ReactNode;
};
export const AccountContextManager = ({
  children,
}: AccountContextManagerProps) => {
  const [state, dispatch] = useReducer(reducer, initialContext);

  const login = useCallback((credentials: Account) => {
    dispatch({ type: 'LOGIN', payload: credentials });
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
  }, []);

  const setLocale = useCallback((locale: string) => {
    dispatch({ type: 'SET_LOCALE', payload: locale });
  }, []);

  const actions = useMemo(
    () => ({ login, logout, setLocale }),
    [login, logout, setLocale]
  );

  const api: AccountContextType = {
    ...state,
    actions,
  };

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
};

export const useAccountContext = () => useContext(CartContext);

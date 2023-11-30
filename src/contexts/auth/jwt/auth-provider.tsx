import type { FC, ReactNode } from 'react';
import { useCallback, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';

import { authApi } from 'src/api/auth';
import type { User } from 'src/types/user';
import { Issuer } from 'src/utils/auth';

import type { State } from './auth-context';
import { AuthContext, initialState } from './auth-context';

const STORAGE_KEY = 'accessToken';

enum ActionType {
  INITIALIZE = 'INITIALIZE',
  SIGN_IN = 'SIGN_IN',
  SIGN_UP = 'SIGN_UP',
  SIGN_OUT = 'SIGN_OUT',
}

type InitializeAction = {
  type: ActionType.INITIALIZE;
  payload: {
    isAuthenticated: boolean;
    accessToken:Object | null
    // user: User | null;
  };
};

type SignInAction = {
  type: ActionType.SIGN_IN;
  payload: {
    accessToken:Object
  };
};

type SignUpAction = {
  type: ActionType.SIGN_UP;
  payload: {
    user: User;
  };
};

type SignOutAction = {
  type: ActionType.SIGN_OUT;
};

type Action = InitializeAction | SignInAction | SignUpAction | SignOutAction;

type Handler = (state: State, action: any) => State;

const handlers: Record<ActionType, Handler> = {
  INITIALIZE: (state: State, action: InitializeAction): State => {
    const { isAuthenticated, accessToken } = action.payload;
    console.log("isAuthenticated",isAuthenticated)
    console.log("accessToken",accessToken)
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
     accessToken
    };
  },
  SIGN_IN: (state: State, action: SignInAction): State => {
    const { accessToken } = action.payload;
    console.log("payload==", accessToken)
    return {
      ...state,
      isAuthenticated: true,
      accessToken
      // user,
    };
  },
  SIGN_UP: (state: State, action: SignUpAction): State => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      // user,
    };
  },
  SIGN_OUT: (state: State): State => ({
    ...state,
    isAuthenticated: false,
    accessToken: null,
  }),
};

const reducer = (state: State, action: Action): State =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async (): Promise<void> => {
    try {
      const accessToken = window.sessionStorage.getItem(STORAGE_KEY);
      console.log("session token==", accessToken)
      if (accessToken) {
        // const user = await authApi.me({ accessToken });
        console.log("iam in if")
        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: true,
           accessToken
          },
        });
      } else {
        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: false,
           accessToken:null
          },
        });
      }
    } catch (err) {
      console.error(err);
      dispatch({
        type: ActionType.INITIALIZE,
        payload: {
          isAuthenticated: false,
         accessToken: null
        },
      });
    }
  }, [dispatch]);

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const signIn = useCallback(
    async (email: string, password: string): Promise<void> => {
      const  {accessToken}:any  = await authApi.signIn({ email, password });
      console.log("auth provider token", accessToken)
      // const user = await authApi.me({ accessToken });

      sessionStorage.setItem(STORAGE_KEY, accessToken);

      dispatch({
        type: ActionType.SIGN_IN,
        payload: {
          accessToken
        },
      });
    },
    [dispatch]
  );

  const signUp = useCallback(
    async (email: string, name: string, password: string): Promise<void> => {
      const { accessToken } = await authApi.signUp({ email, name, password });
      const user = await authApi.me({ accessToken });

      sessionStorage.setItem(STORAGE_KEY, accessToken);

      dispatch({
        type: ActionType.SIGN_UP,
        payload: {
          user,
        },
      });
    },
    [dispatch]
  );

  const signOut = useCallback(async (): Promise<void> => {
    sessionStorage.removeItem(STORAGE_KEY);
    dispatch({ type: ActionType.SIGN_OUT });
  }, [dispatch]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        issuer: Issuer.JWT,
        signIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

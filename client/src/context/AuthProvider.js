import { createContext, useReducer } from 'react';
import AuthReducer from './AuthReducer';

const initialState = {
    user: localStorage.getItem('USER'),
    isFetching: false,
    error: null,
};

export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);
    const store = {
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
    };

    return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
};

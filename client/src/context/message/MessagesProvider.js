import { createContext, useReducer } from 'react';
import MessagesReducer from './MessagesReducer';

const initialState = '';
// JSON.parse(localStorage.getItem('CONVERSATIONS')) ||
export const MessagesContext = createContext(initialState);

export const MessagesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(MessagesReducer, initialState);
    const store = {
        data: state,
        dispatch,
    };

    return <MessagesContext.Provider value={store}>{children}</MessagesContext.Provider>;
};

import { createContext, useReducer } from 'react';
import ConversationsReducer from './ConversationsReducer';

const initialState = JSON.parse(localStorage.getItem('CONVERSATIONS')) || [];
// JSON.parse(localStorage.getItem('CONVERSATIONS')) ||
export const ConversationsContext = createContext(initialState);

export const ConversationsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ConversationsReducer, initialState);
    const store = {
        data: state,
        dispatch,
    };

    return <ConversationsContext.Provider value={store}>{children}</ConversationsContext.Provider>;
};

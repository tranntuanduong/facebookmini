export const openConversation = (data, dispatch) => {
    dispatch({ type: 'OPEN_CONVERSATION', payload: data });
};

export const toggleConversation = (data, dispatch) => {
    //conversationIdLocal: id in localStorage
    dispatch({ type: 'TOGGLE_CONVERSATION', payload: data });
};

export const messageChatArrival = (data, dispatch) => {
    dispatch({ type: 'MESSAGE_CHAT_ARRIVAL', payload: data });
};

export const messsageSocketArrival = (data, dispatch) => {
    dispatch({ type: 'MESSAGE_SOCKET_ARRIVAL', payload: data });
};

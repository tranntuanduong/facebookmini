const MessagesReducer = (state, action) => {
    switch (action.type) {
        case 'MESSAGE_CHAT_ARRIVAL': {
            return action.payload;
        }

        default: {
            return state;
        }
    }
};

export default MessagesReducer;

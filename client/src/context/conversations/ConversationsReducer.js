const ConversationsReducer = (state, action) => {
    switch (action.type) {
        case 'OPEN_CONVERSATION':
            const conversations = JSON.parse(localStorage.getItem('CONVERSATIONS')) || [];
            if (conversations.length > 3) {
                conversations.shift();
            }
            const newConversation = {
                key: action.payload.key,
                isZoomOut: false,
                receiver: action.payload.receiver,
                sender: action.payload.sender,
            };

            if (
                conversations.every((conv) => conv.receiver._id !== newConversation.receiver._id) ||
                conversations.length === 0
            ) {
                conversations.push(newConversation);
                localStorage.setItem('CONVERSATIONS', JSON.stringify(conversations));
            }

            return conversations;
        case 'TOGGLE_CONVERSATION': {
            localStorage.setItem('CONVERSATIONS', JSON.stringify(action.payload));
            return action.payload;
        }

        case 'SEND_MESSAGE': {
            return action.payload;
        }

        default: {
            return state;
        }
    }
};

export default ConversationsReducer;

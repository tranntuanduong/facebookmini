import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { NO_AVARTAR, PF } from '../../constants';
import { ConversationsContext } from '../../context/conversations/ConversationsProvider';
import { toggleConversation } from '../../context/conversations/useConversations';
import './Chat.css';
import ConversationItem from './ConversationItem';
import { io } from 'socket.io-client';
import { AuthContext } from '../../context/AuthProvider';

Chat.propTypes = {
    zoomOutState: PropTypes.func,
};

function Chat(props) {
    const { user: currentUser } = useContext(AuthContext);

    const { data: conversationsStore, dispatch } = useContext(ConversationsContext);
    const [conversations, setConversations] = useState([]);
    const zoomInConversations = conversations.filter((cov) => cov.isZoomOut === false);
    const zoomOutConversations = conversations.filter((cov) => cov.isZoomOut === true);
    const [currentConverastionKey, setCurrentConversationKey] = useState();

    const [arrivalMessage, setArrivalMessage] = useState(null);

    // socket
    const socket = useRef();
    useEffect(() => {
        socket.current = io('ws://localhost:8900');
        // console.log('render: ', socket.current);
        socket.current.on('getMessage', (data) => {
            // console.log('data', data);
            setArrivalMessage({
                senderId: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        socket.current.emit('addUser', currentUser._id);
        // socket.current.on('getUsers', (users) => {
        //     console.log('socket users:', users);
        // });
    }, [currentUser]);

    useEffect(() => {
        setConversations(conversationsStore);
    }, [conversationsStore]);

    const handleZoomOutState = (conversationKey, zoomState) => {
        const conversationIndex = conversations.findIndex(
            (conversation) => conversation.key === conversationKey
        );
        const updatedConversation = conversations.splice(conversationIndex, 1)[0];
        updatedConversation.isZoomOut = zoomState;

        const newConversation = [...conversations, updatedConversation];
        toggleConversation(newConversation, dispatch);
    };

    const emitSendMessageHandler = (event, sendMessage) => {
        socket.current.emit('sendMessage', sendMessage);
    };

    return (
        <>
            {zoomInConversations.map((conversation, index) => (
                <ConversationItem
                    setCurrentConversationKey={setCurrentConversationKey}
                    currentConverastionKey={currentConverastionKey}
                    key={index}
                    conversation={conversation}
                    index={index}
                    changeZoomState={handleZoomOutState}
                    arrivalMessage={arrivalMessage}
                    emitSendMessage={emitSendMessageHandler}
                />
            ))}
            {zoomOutConversations.map((conversation, index) => (
                <div
                    key={conversation.key}
                    className="chatZoomOut"
                    style={{ bottom: `${index * (40 + 20) + 40}px` }}
                    onClick={() => handleZoomOutState(conversation.key, false)}
                >
                    <img
                        src={`${PF}/${
                            conversation.receiver.avatar
                                ? `person/${conversation.receiver.avatar}`
                                : NO_AVARTAR
                        }`}
                        alt=""
                        className="chatZoomOutImg"
                    />
                    <div className="chatZoomOutBadge"></div>
                    <div className="chatZoomOutClose">
                        <CloseIcon style={{ fontSize: 'inherit' }} />
                    </div>
                </div>
            ))}
        </>
    );
}

export default Chat;

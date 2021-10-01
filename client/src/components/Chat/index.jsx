import React, { useContext, useEffect, useState } from 'react';
import './Chat.css';
import Message from '../Message';
import PhoneIcon from '@mui/icons-material/Phone';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import PropTypes from 'prop-types';
import { NO_AVARTAR, PF } from '../../constants';
import axios from 'axios';
import ConversationItem from './ConversationItem';
import { ConversationsContext } from '../../context/conversations/ConversationsProvider';
import { toggleConversation } from '../../context/conversations/useConversations';

Chat.propTypes = {
    zoomOutState: PropTypes.func,
};

function Chat(props) {
    const { conversations: conversationsStore, dispatch } = useContext(ConversationsContext);
    const [conversations, setConversations] = useState([]);
    const zoomInConversations = conversations.filter((cov) => cov.isZoomOut === false);
    const zoomOutConversations = conversations.filter((cov) => cov.isZoomOut === true);

    useEffect(() => {
        setConversations(conversationsStore);
    }, [conversationsStore]);

    const handleZoomOutState = (conversationLocalId, zoomState) => {
        const conversationIndex = conversations.findIndex(
            (conversation) => conversation.id === conversationLocalId
        );
        const updatedConversation = conversations.splice(conversationIndex, 1)[0];
        updatedConversation.isZoomOut = zoomState;

        const newConversation = [...conversations, updatedConversation];
        toggleConversation(newConversation, dispatch);
    };

    return (
        <>
            {zoomInConversations.map((conversation, index) => (
                <ConversationItem
                    key={index}
                    conversation={conversation}
                    index={index}
                    changeZoomState={handleZoomOutState}
                />
            ))}
            {zoomOutConversations.map((conversation, index) => (
                <div
                    key={conversation.id}
                    className="chatZoomOut"
                    style={{ bottom: `${index * (40 + 20) + 40}px` }}
                    onClick={() => handleZoomOutState(conversation.id, false)}
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

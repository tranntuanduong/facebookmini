import React, { useEffect, useRef } from 'react';
import { NO_AVARTAR, PF } from '../../constants';
import './Message.css';
import { format } from 'timeago.js';

Message.propTypes = {};

function Message({ own, conversation, message }) {
    const scrollRef = useRef();

    useEffect(() => {
        scrollRef.current?.scrollIntoView({
            behavior: 'smooth',
        });
    }, [message]);

    return (
        <>
            {own ? (
                <div className="message own" ref={scrollRef}>
                    <div className="messageContent">
                        <div className="messageContentText">{message.text}</div>
                        <div className="messageContentTime">{format(message.createdAt)}</div>
                    </div>
                </div>
            ) : (
                <div className="message" ref={scrollRef}>
                    <img
                        src={`${PF}/${
                            conversation.receiver.avatar
                                ? `person/${conversation.receiver.avatar}`
                                : NO_AVARTAR
                        }`}
                        alt=""
                        className="messageAvatar"
                    />
                    <div className="messageContent">
                        <div className="messageContentText">{message.text}</div>
                        <div className="messageContentTime">{format(message.createdAt)}</div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Message;

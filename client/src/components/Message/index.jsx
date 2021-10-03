import React, { useEffect, useRef } from 'react';
import { NO_AVARTAR, PF } from '../../constants';
import './Message.css';
import { format } from 'timeago.js';

Message.propTypes = {};

// show message: very hard: *****************
function Message({ own, conversation, message, wrap, period }) {
    const scrollRef = useRef();

    useEffect(() => {
        scrollRef.current?.scrollIntoView({
            behavior: 'smooth',
        });
    }, [message]);

    return (
        <>
            {own ? (
                <>
                    {period >= 20 && (
                        <div className="messageContentTime">{format(message.createdAt)}</div>
                    )}
                    {/* {period} */}
                    {/* <div className="messageContentTime">{format(message.createdAt)}</div> */}
                    <div className="message own" ref={scrollRef}>
                        {wrap ? (
                            <div className="messageContentText">{message.text}</div>
                        ) : (
                            <div className="messageWrapFirst">
                                <div className="messageContentText">{message.text}</div>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <>
                    {period >= 20 && (
                        <div className="messageContentTime">{format(message.createdAt)}</div>
                    )}
                    <div className="message" ref={scrollRef}>
                        {wrap ? (
                            <>
                                <div className="messageWrapUser"></div>
                                <div className="messageContentText">{message.text}</div>
                            </>
                        ) : (
                            <div className="messageWrapFirst">
                                <img
                                    src={`${PF}/${
                                        conversation.receiver.avatar
                                            ? `person/${conversation.receiver.avatar}`
                                            : NO_AVARTAR
                                    }`}
                                    alt=""
                                    className="messageAvatar"
                                />
                                <div className="messageContentText">{message.text}</div>
                            </div>
                        )}
                    </div>
                </>
            )}
        </>
    );
}

export default Message;

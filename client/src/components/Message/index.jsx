import React from 'react';
import { NO_AVARTAR, PF } from '../../constants';
import './Message.css';

Message.propTypes = {};

function Message({ own, conversation }) {
    return (
        <>
            {own ? (
                <div className="message">
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
                        <div className="messageContentText">
                            hôm trc sàng lọc F0 chọc 1 phát rồi
                        </div>
                        <div className="messageContentTime">32 phút</div>
                    </div>
                </div>
            ) : (
                <div className="message own">
                    <div className="messageContent">
                        <div className="messageContentText">
                            hôm trc sàng lọc F0 chọc 1 phát rồi
                        </div>
                        <div className="messageContentTime">32 phút</div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Message;

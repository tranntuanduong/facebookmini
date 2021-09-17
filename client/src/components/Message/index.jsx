import React from 'react';
import './Message.css';

Message.propTypes = {};

function Message({ own }) {
    return (
        <>
            {own ? (
                <div className="message">
                    <img src="./assets/person/3.jpeg" alt="" className="messageAvatar" />
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

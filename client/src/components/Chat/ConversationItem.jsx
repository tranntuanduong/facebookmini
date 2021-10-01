import CloseIcon from '@mui/icons-material/Close';
import PhoneIcon from '@mui/icons-material/Phone';
import RemoveIcon from '@mui/icons-material/Remove';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { NO_AVARTAR, PF } from '../../constants';
import { AuthContext } from '../../context/AuthProvider';
import Message from '../Message';
ConversationItem.propTypes = {
    changeZoomState: PropTypes.func,
};

function ConversationItem({ conversation, index, changeZoomState = null }) {
    const { user: currentUser } = useContext(AuthContext);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        (async () => {
            const conversationRes = await axios.put('/conversations', {
                senderId: conversation.sender._id,
                receiverId: conversation.receiver._id,
            });
            if (conversationRes.data) {
                const messagesRes = await axios.get(`/messages/${conversationRes.data._id}`);
                setMessages(messagesRes.data);
            }
        })();
    }, [conversation]);

    const handleChangeZoomState = (conversationId, flag) => {
        if (changeZoomState) changeZoomState(conversationId, flag);
    };

    console.log(currentUser._id);
    return (
        <div className="chat" style={{ right: `${index * (330 + 12) + 90}px` }}>
            <div className="chatTop">
                <div className="chatTopUser">
                    <div className="chatTopUserAvatar">
                        <img
                            src={`${PF}/${
                                conversation.receiver.avatar
                                    ? `person/${conversation.receiver.avatar}`
                                    : NO_AVARTAR
                            }`}
                            alt=""
                        />
                        <div className="chatTopUserAvatarBadge"></div>
                    </div>

                    <div className="chatTopUserInfo">
                        <div className="chatTopUserInfoName">
                            {conversation.receiver.firstName} {conversation.receiver.lastName}
                        </div>
                        <div className="chatTopUserInfoState">Đang hoạt động</div>
                    </div>
                </div>
                <div className="chatTopAction">
                    <div className="chatTopActionItem">
                        <PhoneIcon />
                    </div>
                    <div
                        className="chatTopActionItem"
                        onClick={() => handleChangeZoomState(conversation.id, true)}
                    >
                        <RemoveIcon />
                    </div>
                    <div className="chatTopActionItem">
                        <CloseIcon />
                    </div>
                </div>
            </div>
            <div className="chatContent">
                {messages.map((message) => (
                    <Message
                        key={message._id}
                        conversation={conversation}
                        message={message}
                        own={message.senderId === currentUser._id}
                    />
                ))}
                {/* <Message conversation={conversation} own={true} />
                <Message conversation={conversation} />
                <Message conversation={conversation} own={true} />
                <Message conversation={conversation} own={true} />
                <Message conversation={conversation} />
                <Message conversation={conversation} />
                <Message conversation={conversation} /> */}
            </div>
            <div className="chatBottom">
                <div className="chatBottomInput">
                    <input type="text" placeholder="Aa" />
                    <div className="chatBottomInputIcon">
                        <div
                            className="chatBottomInputIconBg"
                            style={{
                                backgroundImage: `url("/assets/feed/imgAction.png")`,
                                backgroundPosition: '0 -50px',
                            }}
                        ></div>
                    </div>
                </div>
                <div className="chatBottomLikeIcon">
                    <ThumbUpIcon style={{ fontSize: 'inherit' }} />
                </div>
            </div>
        </div>
    );
}

export default ConversationItem;

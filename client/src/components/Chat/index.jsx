import React, { useContext } from 'react';
import './Chat.css';
import Message from '../Message';
import PhoneIcon from '@mui/icons-material/Phone';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import PropTypes from 'prop-types';
import { NO_AVARTAR, PF } from '../../constants';

Chat.propTypes = {
    zoomOutState: PropTypes.func,
};

function Chat({ conversations, zoomOutState = null }) {
    const zoomInConversations = conversations.filter((cov) => cov.isZoomOut === false);
    const zoomOutConversations = conversations.filter((cov) => cov.isZoomOut === true);
    // const { dispatch } = useContext(ConversationsContext);

    const handleChangeZoomState = (conversationIdLocal, zoomState) => {
        if (zoomOutState) zoomOutState(conversationIdLocal, zoomState);
        // toggleConversation(conversationIdLocal, dispatch);
    };

    return (
        <>
            {zoomInConversations.map((conversation, index) => (
                <div
                    key={conversation.id}
                    className="chat"
                    style={{ right: `${index * (330 + 12) + 90}px` }}
                >
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
                                    {conversation.receiver.firstName}{' '}
                                    {conversation.receiver.lastName}
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
                        <Message conversation={conversation} own={true} />
                        <Message conversation={conversation} />
                        <Message conversation={conversation} own={true} />
                        <Message conversation={conversation} own={true} />
                        <Message conversation={conversation} />
                        <Message conversation={conversation} />
                        <Message conversation={conversation} />
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
            ))}
            {zoomOutConversations.map((conversation, index) => (
                <div
                    key={conversation.id}
                    className="chatZoomOut"
                    style={{ bottom: `${index * (40 + 20) + 40}px` }}
                    onClick={() => handleChangeZoomState(conversation.id, false)}
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

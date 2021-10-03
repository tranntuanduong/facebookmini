import React, { useContext } from 'react';
import './OnlineFriend.css';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { NO_AVARTAR, PF } from '../../constants';
import { ConversationsContext } from '../../context/conversations/ConversationsProvider';
import { openConversation, toggleConversation } from '../../context/conversations/useConversations';
import { AuthContext } from '../../context/AuthProvider';

OnlineFriend.propTypes = {};

function OnlineFriend({ friends }) {
    const { data, dispatch } = useContext(ConversationsContext);
    const { user: currentUser } = useContext(AuthContext);

    const openConversationHandler = (friendInfo) => {
        const conversation = {
            key: `${currentUser._id}_${friendInfo._id}`,
            receiver: friendInfo,
            sender: currentUser,
        };

        // check if conversation is open [CHECK IN LOCALSTORAGE]
        if (data.some((item) => item.key === conversation.key)) {
            const conversationIndex = data.findIndex((item) => item.id === conversation.id);
            const updatedConversation = data.splice(conversationIndex, 1)[0];
            updatedConversation.isZoomOut = !updatedConversation.isZoomOut;

            const newConversation = [...data, updatedConversation];
            toggleConversation(newConversation, dispatch);
        } else {
            openConversation(conversation, dispatch);
        }
    };

    return (
        <div className="onlineFriend">
            <div className="onlineFriendTop">
                <div className="onlineFriendTopTitle">Người liên hệ</div>
                <div className="onlineFriendTopAction">
                    <div className="onlineFriendTopActionItem">
                        <VideoCallIcon />
                    </div>
                    <div className="onlineFriendTopActionItem">
                        <SearchIcon />
                    </div>
                    <div className="onlineFriendTopActionItem">
                        <MoreHorizIcon />
                    </div>
                </div>
            </div>
            <ul className="onlineFriendList">
                {friends.map((friend) => (
                    <li
                        key={friend._id}
                        className="onlineFirendItem"
                        onClick={() => openConversationHandler(friend)}
                    >
                        <div className="onlineFriendItemAvatarWrap">
                            <img
                                src={`${PF}/${
                                    friend.avatar ? `person/${friend.avatar}` : NO_AVARTAR
                                }`}
                                alt=""
                                className="onlineFriendItemAvatar"
                            />
                            <div className="onlineFriendItemBadge"></div>
                        </div>
                        <span className="onlineFriendItemName">
                            {friend.firstName} {friend.lastName}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default OnlineFriend;

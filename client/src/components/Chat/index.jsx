import React from 'react';
import './Chat.css';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Message from '../Message';

Chat.propTypes = {};

function Chat(props) {
    return (
        <div className="chat">
            <div className="chatTop">
                <div className="chatTopUser">
                    <div className="chatTopUserAvatar">
                        <img src="./assets/person/1.jpeg" alt="" />
                        <div className="chatTopUserAvatarBadge"></div>
                    </div>

                    <div className="chatTopUserInfo">
                        <div className="chatTopUserInfoName">Lương Văn Đức</div>
                        <div className="chatTopUserInfoState">Đang hoạt động</div>
                    </div>
                </div>
                <div className="chatTopAction">
                    <div className="chatTopActionItem">
                        <NotificationsIcon />
                    </div>
                    <div className="chatTopActionItem">
                        <NotificationsIcon />
                    </div>
                    <div className="chatTopActionItem">
                        <NotificationsIcon />
                    </div>
                </div>
            </div>
            <div className="chatContent">
                <Message own={true} />
                <Message />
                <Message own={true} />
                <Message own={true} />
                <Message />
                <Message />
                <Message />
            </div>
            <div className="chatBottom">
                <div className="chatBottomInput">
                    <input type="text" placeholder="Aa" />
                    <div
                        className="chatBottomInputIconBg"
                        style={{
                            backgroundImage: `url("/assets/feed/imgAction.png")`,
                            backgroundPosition: '0 -50px',
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
}

export default Chat;

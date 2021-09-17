import React from 'react';
import './FriendRequest.css';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

FriendRequest.propTypes = {};

function FriendRequest(props) {
    return (
        <div className="friendRequest">
            <div className="friendRequestTop">
                <div className="friendRequestTitle">
                    <img
                        src="./assets/sidebar/friend.png"
                        alt=""
                        className="friendRequestTitleImg"
                    />
                    <span className="friendRequestTitleText">Lời mời kết bạn</span>
                </div>
                <div className="friendRequestTopAction">
                    <MoreHorizIcon />
                </div>
            </div>
            <div className="friendRequestContent">
                <img src="./assets/person/4.jpeg" alt="" className="friendRequestAvatar" />
                <div className="friendRequestContentBody">
                    <span className="friendRequestContentBodyName">Thái Đình Thỏa</span>
                    <div className="friendRequestContentBodyBtn">
                        <div className="friendRequestContentBodyAccept">Xác nhận</div>
                        <div className="friendRequestContentBodyDeny">Xóa</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FriendRequest;

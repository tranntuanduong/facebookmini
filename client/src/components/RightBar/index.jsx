import React from 'react';
import Ads from '../Ads';
import FriendRequest from '../FriendRequest';
import OnlineFriend from '../OnlineFriend';
import './RightBar.css';

RightBar.propTypes = {};

function RightBar(props) {
    return (
        <div className="rightBar">
            <FriendRequest />
            <hr className="rightBarHr" />
            <Ads />
            <hr className="rightBarHr" />
            <OnlineFriend />
        </div>
    );
}

export default RightBar;

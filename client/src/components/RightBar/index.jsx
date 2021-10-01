import React, { useEffect, useState } from 'react';
import Ads from '../Ads';
import FriendRequest from '../FriendRequest';
import OnlineFriend from '../OnlineFriend';
import './RightBar.css';
import axios from 'axios';

RightBar.propTypes = {};

function RightBar({ currentUser }) {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        (async () => {
            const friendsRes = await axios.get(`/users/${currentUser._id}/friends`);
            setFriends(friendsRes.data);
        })();
    }, [currentUser]);

    return (
        <div className="rightBar">
            <FriendRequest />
            <hr className="rightBarHr" />
            <Ads />
            <hr className="rightBarHr" />
            <OnlineFriend friends={friends} />
        </div>
    );
}

export default RightBar;

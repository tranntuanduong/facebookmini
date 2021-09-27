import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import { NO_AVARTAR, PF } from '../../constants';
import axios from 'axios';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

ListStory.propTypes = {};

function ListStory(props) {
    const { user: currentUser } = useContext(AuthContext);
    const [stories, setStories] = useState(); /* total story */

    /* index of storyUser: [story1, story2, story3]*/
    const [showStoryIndex, setShowStoryIndex] = useState(0);
    const [followingUsers, setFollowingUsers] = useState([]);
    const [storyViewer, setStoryViewer] = useState([]); /*story will show inside class right */
    const [storyAuthor, setStoryAuthor] = useState(currentUser);

    // get stories and get user from stories
    useEffect(() => {
        try {
            (async () => {
                // get stories
                const StoriesRes = await axios.get(`/stories/${currentUser._id}`);

                setStories(StoriesRes.data);

                const tempArray = [];
                StoriesRes.data.forEach((storyUser) => {
                    if (storyUser[0].userId === currentUser._id) {
                        setStoryViewer(storyUser);
                    } else {
                        tempArray.push(storyUser);
                    }
                });

                // get following from stories
                const followingUserIds = tempArray.map(
                    (followingStory) => followingStory[0].userId
                );

                const followingUsersRes = await axios.put('/users/list', {
                    /*get method ko co body*/ userIds: followingUserIds,
                });
                setFollowingUsers(followingUsersRes.data);
            })();
        } catch (error) {
            console.log(error);
        }
    }, [currentUser]);

    const changeStoryViewerHandler = (followingUser) => {
        // get story by userId field

        const sViewer = stories.filter((storyUser) => storyUser[0].userId === followingUser._id);
        setStoryViewer(...sViewer);
        setStoryAuthor(followingUser);
        setShowStoryIndex(0);
    };

    return (
        <div className="stories">
            <div className="left">
                <div className="storyLeftTop">
                    <div className="storyLeftTopTitle">Tin</div>
                </div>
                <div className="storySubTitle">Tin của bạn</div>
                <div className="storyUser" onClick={() => changeStoryViewerHandler(currentUser)}>
                    <div className="storyUserInfo">
                        <img
                            src={`${PF}/${
                                currentUser.avatar ? `person/${currentUser.avatar}` : NO_AVARTAR
                            }`}
                            alt=""
                            className="storyUserInfoAvatar"
                        />
                        <div className="storyUserInfoText">
                            <div className="storyUserInfoTextUsername">{`${currentUser.firstName} ${currentUser.lastName}`}</div>
                            <div className="storyUserInfoTextTime">7 phút</div>
                        </div>
                    </div>
                    <Link to="/stories/create" className="storyUserBtnLink">
                        <div className="storyUserBtn">+</div>
                    </Link>
                </div>
                <div className="storySubTitle">Tất cả tin</div>
                <ul className="storyUserList">
                    {followingUsers.map((followingUser) => (
                        <li
                            key={followingUser._id}
                            className="storyUser"
                            onClick={() => changeStoryViewerHandler(followingUser)}
                        >
                            <div className="storyUserInfo">
                                <img
                                    src={`${PF}/${
                                        followingUser.avatar
                                            ? `person/${followingUser.avatar}`
                                            : NO_AVARTAR
                                    }`}
                                    alt=""
                                    className="storyUserInfoAvatar"
                                />
                                <div className="storyUserInfoText">
                                    <div className="storyUserInfoTextUsername">{`${followingUser.firstName} ${followingUser.lastName}`}</div>
                                    <div className="storyUserInfoTextTime">7 phút</div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="right">
                <div
                    className="storyItem"
                    style={{ background: storyViewer[showStoryIndex]?.style?.background }}
                >
                    <ul className="storyProgessList">
                        {Array.from(new Array(storyViewer.length)).map((x, index) => (
                            <li key={index} className="storyProgessItem">
                                <div
                                    className="storyProgessItemProgress"
                                    style={{ width: index === showStoryIndex ? '100%' : '0%' }}
                                ></div>
                            </li>
                        ))}
                    </ul>
                    <div className="storyItemUser">
                        <img
                            src={`${PF}/${
                                storyAuthor.avatar ? `person/${storyAuthor.avatar}` : NO_AVARTAR
                            }`}
                            alt=""
                            className="storyItemUserAvatar"
                        />
                        <div className="storyItemUserText">
                            <div className="storyItemTextTop">
                                <div className="storyItemTextTopUsername">{`${storyAuthor.firstName} ${storyAuthor.lastName}`}</div>
                                <div className="storyItemTextTopText">16 phút</div>
                            </div>
                            <div className="storyItemTextBottm">Cavendish music</div>
                        </div>
                    </div>
                    <div className="storyItemContent">{storyViewer[showStoryIndex]?.desc}</div>
                    <div
                        className="storyPrevBtn"
                        onClick={() => setShowStoryIndex(showStoryIndex - 1)}
                    >
                        <KeyboardArrowLeftIcon style={{ fontSize: 'inherit' }} />
                    </div>
                    <div
                        className="storyNextBtn"
                        onClick={() => setShowStoryIndex(showStoryIndex + 1)}
                    >
                        <KeyboardArrowRightIcon style={{ fontSize: 'inherit' }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListStory;

import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { NO_AVARTAR, PF } from '../../constants';
import { AuthContext } from '../../context/AuthProvider';
import { sortDateUtils } from '../../utils/utils';
import StoryViewer from './components/StoryViewer';
import UserItem from './components/UserItem';

StoryDetail.propTypes = {};

// code ngu, khong ngoi phan tich tu dau, gio tach component kho !!!!!!!!!!!!!!
function StoryDetail(props) {
    const { user: currentUser } = useContext(AuthContext);
    const [stories, setStories] = useState(); /* total story */

    /* index of storyUser: [story1, story2, story3]*/
    const [showStoryIndex, setShowStoryIndex] = useState(0);
    const [followingUsers, setFollowingUsers] = useState([]);
    const [storyViewer, setStoryViewer] = useState([]); /*story will show inside class right */
    const [storyAuthor, setStoryAuthor] = useState({});
    const [allUser, setAllUser] = useState([]);
    const storyTimeOutRef = useRef(null);
    const pauseFlagMouse = useRef(false); /*flag of mouse event */
    const [myStories, setMyStories] = useState();

    // why: to hidden btn next and prev
    const [firstStory, setFirstStory] = useState();
    const [lastStory, setLastStory] = useState();

    /*flag of btn pause */
    // const [pauseState, setPauseState] = useState(false); will re-render if use state in this case
    const pauseFlagBtn = useRef(false);

    const { storyId } = useParams();

    // get stories and get user from stories

    useEffect(() => {
        try {
            (async () => {
                // get stories

                const storiesRes = await axios.get(`/stories/${currentUser._id}`);

                setStories(storiesRes.data);

                const storyList = storiesRes.data;
                setFirstStory(sortDateUtils(storyList[0])[0]);
                const lastStoryUser = sortDateUtils(storyList[storyList.length - 1]);
                setLastStory(lastStoryUser[lastStoryUser.length - 1]);

                const tempArray = []; /*following story */
                let userId;

                sortDateUtils(storiesRes.data).forEach((storyUser) => {
                    // display story viewer
                    if (storyUser.some((aStoryUser) => aStoryUser._id === storyId)) {
                        setStoryViewer(sortDateUtils(storyUser));
                        userId = storyUser[0].userId;
                    }

                    // display friendlist
                    if (storyUser[0].userId !== currentUser._id) {
                        tempArray.push(storyUser);
                    } else {
                        setMyStories(storyUser);
                    }
                });

                // get author from story viewer
                const authorRes = await axios.get(`/users?userId=${userId}`);
                setStoryAuthor(authorRes.data);

                // get following user from stories

                const followingUserIds = tempArray.map(
                    (followingStory) => followingStory[0].userId
                );

                const followingUsersRes = await axios.put('/users/list', {
                    /*get method ko co body*/ userIds: followingUserIds,
                });
                setFollowingUsers(followingUsersRes.data);
                setAllUser([currentUser, ...followingUsersRes.data]);
            })();
        } catch (error) {
            console.log(error);
        }
    }, [currentUser, storyId]);

    // debounce with ref
    useEffect(() => {
        // console.log('fla', pauseFlagMouse.current);
        if (storyViewer.length > 0) {
            let time = 0;
            storyTimeOutRef.current = setInterval(() => {
                // console.log(time);
                // 5s
                if (!pauseFlagMouse.current) {
                    time++;
                    if (time === 20) {
                        time = 0;
                        changeStoryIndexHandler(1);
                    }
                }
            }, 25000);
        }

        return () => {
            clearInterval(storyTimeOutRef.current);
        };
    });

    const changeStoryViewerHandler = (user) => {
        // get story by userId field

        const sViewer = sortDateUtils(
            stories.filter((storyUser) => storyUser[0].userId === user._id)
        );
        setStoryViewer(...sViewer);
        setStoryAuthor(user);
        setShowStoryIndex(0);

        pauseFlagMouse.current = false;
        pauseFlagBtn.current = false;
    };

    const changeStoryIndexHandler = (number) => {
        if (showStoryIndex + number >= storyViewer.length || showStoryIndex + number < 0) {
            console.log('change story view');

            if (lastStory._id === storyViewer[showStoryIndex]._id && number === 1) {
                console.log('rediarect to home');
                window.location.href = 'http://localhost:3000';
            } else {
                const currentIndex = allUser.findIndex((user) => user._id === storyAuthor._id);
                const tempStoryAuthor = allUser[currentIndex + number];
                setStoryAuthor(tempStoryAuthor);

                const sViewer = stories.filter(
                    (storyUser) => storyUser[0].userId === allUser[currentIndex + number]._id
                );

                setStoryViewer(...sViewer);
                setShowStoryIndex(0);
            }
        } else {
            setShowStoryIndex(showStoryIndex + number);
        }
    };

    // console.log('render');
    return (
        <div className="stories">
            <div className="left">
                <div className="storyLeftTop">
                    <div className="storyLeftTopTitle">Tin</div>
                </div>
                <div className="storySubTitle">Tin của bạn</div>
                {myStories ? (
                    <div
                        className={
                            storyAuthor._id === currentUser._id ? 'storyUser active' : 'storyUser'
                        }
                        onClick={() => changeStoryViewerHandler(currentUser)}
                    >
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
                ) : (
                    <Link to="/stories/create" className="storyUserBtnLink">
                        <div className="addStory">
                            <div className="storyUserBtn">+</div>
                            <div className="addStoryText">
                                <div className="addStoryTextTitle">Tạo tin</div>
                                <div className="addStoryTextDesc">
                                    Bạn có thể chia sẻ ảnh hoặc viết gì đó
                                </div>
                            </div>
                        </div>
                    </Link>
                )}

                <div className="storySubTitle">Tất cả tin</div>
                <ul className="storyUserList">
                    {followingUsers.map((followingUser, index) => (
                        <UserItem
                            key={index}
                            followingUser={followingUser}
                            storyAuthor={storyAuthor}
                            changeStoryView={changeStoryViewerHandler}
                            stories={stories}
                            currentUser={currentUser}
                        />
                    ))}
                </ul>
            </div>
            <div className="right">
                <StoryViewer
                    storyViewer={storyViewer}
                    showStoryIndex={showStoryIndex}
                    pauseFlagBtn={pauseFlagBtn}
                    pauseFlagMouse={pauseFlagMouse}
                    storyAuthor={storyAuthor}
                    changeStoryIndex={changeStoryIndexHandler}
                    currentUser={currentUser}
                    firstStory={firstStory}
                    lastStory={lastStory}
                />
            </div>
        </div>
    );
}

export default StoryDetail;

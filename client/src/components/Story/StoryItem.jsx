import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NO_AVARTAR, PF } from '../../constants';
import { sortDateUtils } from '../../utils/utils';
import './Story.css';

StoryItem.propTypes = {};

function StoryItem({ currentUser, story }) {
    const [user, setUser] = useState({});
    const storyViewer = sortDateUtils(story)[0]; //lay story moi nhat de hien thi ra trang home
    const [isWatched, setIsWatched] = useState(false);

    useEffect(() => {
        (async () => {
            const res = await axios.get(`users?userId=${storyViewer.userId}`);
            setUser(res.data);
        })();
    }, [storyViewer]);

    useEffect(() => {
        setIsWatched(story.every((aStory) => aStory.viewerIds.includes(currentUser._id)));
    }, [story, currentUser]);

    return (
        <li key={storyViewer._id} className="friendStory">
            <Link to={`/stories/${storyViewer._id}`}>
                {storyViewer.img ? (
                    <>
                        <img
                            src={`${PF}/story/${storyViewer.img}`}
                            alt=""
                            className="friendStoryImg"
                        />
                        <div
                            className="friendStoryDesc"
                            style={{
                                top: storyViewer.style?.top || '50%',
                                left: storyViewer.style?.left || '50%',
                                color: storyViewer.style?.color || '#fff',
                                transform: `rotateZ(${storyViewer?.style?.rotateZ})` || '',
                            }}
                        >
                            {storyViewer.desc}
                        </div>
                    </>
                ) : (
                    <div
                        className="friendStoryBgTextMode"
                        style={{ background: storyViewer.style?.background }}
                    >
                        <div className="friendStoryDesc ">{storyViewer.desc}</div>
                    </div>
                )}

                <div className={isWatched ? 'friendStoryAvatar watched' : 'friendStoryAvatar'}>
                    <img
                        src={`${PF}/${user.avatar ? `person/${user.avatar}` : NO_AVARTAR}`}
                        alt=""
                    />
                </div>
                <span className="friendStoryText">{`${user.firstName} ${user.lastName}`}</span>
            </Link>
        </li>
    );
}

export default StoryItem;

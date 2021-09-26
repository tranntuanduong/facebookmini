import React, { useEffect, useRef, useState } from 'react';
import './Story.css';
import axios from 'axios';
import { NO_AVARTAR, PF } from '../../constants';
import { Link } from 'react-router-dom';

StoryItem.propTypes = {};

function StoryItem({ currentUser, story }) {
    const [user, setUser] = useState({});
    const storyViewer = story[0];

    useEffect(() => {
        (async () => {
            const res = await axios.get(`users?userId=${storyViewer.userId}`);
            setUser(res.data);
        })();
    }, [storyViewer]);

    console.log(storyViewer);

    return (
        <li key={storyViewer._id} className="friendStory">
            <Link to="/stories">
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

                <div className="friendStoryAvatar ">
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

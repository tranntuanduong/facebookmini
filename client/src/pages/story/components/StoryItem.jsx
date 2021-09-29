import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { NO_AVARTAR, PF } from '../../../constants';
import axios from 'axios';
import { sortDateUtils } from '../../../utils/utils';

StoryItem.propTypes = {};

function StoryItem({ story, currentUser }) {
    const storyViewer = sortDateUtils(story)[0]; //hien thi story moi nhat cua tung user
    const [user, setUser] = useState({});
    const [isWatched, setIsWatched] = useState(true);

    console.log(storyViewer);
    useEffect(() => {
        (async () => {
            const res = await axios.get(`users?userId=${storyViewer.userId}`);
            setUser(res.data);
        })();
    }, [storyViewer]);

    useEffect(() => {
        setIsWatched(story.every((aStory) => aStory.viewerIds.includes(currentUser._id)));
    }, [story, currentUser]);

    console.log(storyViewer);
    return (
        <div className="pageStoryRow">
            <div className="pageStoryItem">
                <Link to={`/stories/${storyViewer._id}`} className="pageStoryItemLink">
                    {storyViewer.img ? (
                        <>
                            <img
                                src={`${PF}/story/${storyViewer.img}`}
                                alt=""
                                className="pageStoryItemImg"
                            />
                            <div
                                className="pageStoryItemDesc"
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
                            className="pageStoryItemBgTextMode"
                            style={{ background: storyViewer.style?.background }}
                        >
                            <div className="pageStoryItemDesc ">{storyViewer.desc}</div>
                        </div>
                    )}

                    <div
                        className={
                            isWatched ? 'pageStoryItemAvatar watched' : 'pageStoryItemAvatar'
                        }
                    >
                        <img
                            src={`${PF}/${user.avatar ? `person/${user.avatar}` : NO_AVARTAR}`}
                            alt=""
                        />
                    </div>
                    <span className="pageStoryItemUsername">{`${user.firstName} ${user.lastName}`}</span>
                </Link>
            </div>
        </div>
    );
}

export default StoryItem;

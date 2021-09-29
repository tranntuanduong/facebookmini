import AddCircleIcon from '@material-ui/icons/AddCircle';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NO_AVARTAR, PF } from '../../constants';
import './Story.css';
import StoryItem from './StoryItem';

Stories.propTypes = {};

function Stories({ currentUser, stories }) {
    return (
        <div className="story">
            <ul className="storyList">
                <li className="myStory">
                    <Link to="/stories/create">
                        <div className="myStoryImg">
                            <img
                                src={`${PF}/${
                                    currentUser.avatar ? `person/${currentUser.avatar}` : NO_AVARTAR
                                }`}
                                alt=""
                            />
                        </div>
                        <div className="myStoryIcon">
                            <AddCircleIcon style={{ fontSize: 'inherit', zIndex: 1 }} />
                        </div>
                        <div className="myStoryText">Tạo tin</div>
                    </Link>
                </li>
                {stories.map((story) => (
                    <StoryItem key={story[0]._id} story={story} currentUser={currentUser} />
                ))}
            </ul>
            <Link to="/stories" className="storyBtn">
                <ArrowForwardIcon />
            </Link>
        </div>
    );
}

export default Stories;

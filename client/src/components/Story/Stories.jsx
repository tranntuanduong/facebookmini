import React, { useContext } from 'react';
import './Story.css';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { NO_AVARTAR, PF } from '../../constants';
import { AuthContext } from '../../context/AuthProvider';
import StoryItem from './StoryItem';
import { Link } from 'react-router-dom';

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
                    <StoryItem key={story._id} story={story} />
                ))}
            </ul>
            <div className="storyBtn">
                <ArrowForwardIcon />
            </div>
        </div>
    );
}

export default Stories;

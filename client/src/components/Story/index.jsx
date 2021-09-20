import React, { useContext } from 'react';
import './Story.css';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { NO_AVARTAR, PF } from '../../constants';
import { AuthContext } from '../../context/AuthProvider';

Story.propTypes = {};

function Story({ currentUser }) {
    return (
        <div className="story">
            <ul className="storyList">
                <li className="myStory">
                    <div className="myStoryImg">
                        <img src={`${PF}/${currentUser.avatar ? currentUser.avatar : NO_AVARTAR}`} alt="" />
                    </div>
                    <div className="myStoryIcon">
                        <AddCircleIcon style={{ fontSize: 'inherit', zIndex: 1 }} />
                    </div>
                    <div className="myStoryText">Tạo tin</div>
                </li>
                <li className="friendStory">
                    <img src="./assets/person/1.jpeg" alt="" className="friendStoryImg" />
                    <div className="friendStoryAvatar ">
                        <img src="./assets/person/2.jpeg" alt="" />
                    </div>

                    <span className="friendStoryText">Min cute</span>
                </li>
                <li className="friendStory">
                    <img src="./assets/person/1.jpeg" alt="" className="friendStoryImg" />
                    <div className="friendStoryAvatar ">
                        <img src="./assets/person/2.jpeg" alt="" />
                    </div>

                    <span className="friendStoryText">Meoz meoz</span>
                </li>
                <li className="friendStory">
                    <img src="./assets/person/1.jpeg" alt="" className="friendStoryImg" />
                    <div className="friendStoryAvatar friendStoryAvatarOnline">
                        <img src="./assets/person/2.jpeg" alt="" />
                    </div>

                    <span className="friendStoryText">Trần Tuấn Dương</span>
                </li>
                <li className="friendStory">
                    <img src="./assets/person/1.jpeg" alt="" className="friendStoryImg" />
                    <div className="friendStoryAvatar friendStoryAvatarOnline">
                        <img src="./assets/person/2.jpeg" alt="" />
                    </div>

                    <span className="friendStoryText">Jun</span>
                </li>
                <li className="friendStory">
                    <img src="./assets/person/1.jpeg" alt="" className="friendStoryImg" />
                    <div className="friendStoryAvatar friendStoryAvatarOnline">
                        <img src="./assets/person/2.jpeg" alt="" />
                    </div>

                    <span className="friendStoryText">love story</span>
                </li>
            </ul>
            <div className="storyBtn">
                <ArrowForwardIcon />
            </div>
        </div>
    );
}

export default Story;

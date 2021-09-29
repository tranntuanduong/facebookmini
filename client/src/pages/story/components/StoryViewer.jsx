import React, { useEffect } from 'react';
import { NO_AVARTAR, PF } from '../../../constants';
import ProgressTimeOut from './ProgressTimeOut';
import StoryAction from './StoryAction';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { PropTypes } from 'prop-types';
import { format } from 'timeago.js';
import axios from 'axios';

StoryViewer.propTypes = {
    changeStoryIndex: PropTypes.func,
};

function StoryViewer(props) {
    const {
        storyViewer,
        showStoryIndex,
        pauseFlagBtn,
        pauseFlagMouse,
        storyAuthor,
        changeStoryIndex,
        currentUser,
    } = props;

    const mouseMoveHandler = () => {
        if (pauseFlagBtn.current) return; /*cancel mouse event when click btn pause */

        pauseFlagMouse.current = false;
    };

    const mouseOutHandler = () => {
        if (pauseFlagBtn.current) return; /*cancel mouse event when click btn pause */

        pauseFlagMouse.current = true;
    };

    const changeStoryIndexHandler = (number) => {
        if (!changeStoryIndex) return;

        changeStoryIndex(number);
    };

    // update viewerIds in DB
    useEffect(() => {
        (async () => {
            // update story viewerIds
            //  await axios.put(`/stories/`)
            if (storyViewer[showStoryIndex]?._id) {
                console.log(
                    'update:',
                    storyViewer[showStoryIndex]?._id,
                    'userId:',
                    currentUser._id
                );
            }
            await axios.put(`/stories/${storyViewer[showStoryIndex]?._id}`, {
                userId: currentUser._id,
            });
        })();
    }, [storyViewer, showStoryIndex, currentUser]);

    return (
        <div
            className="storyItem"
            style={{ background: storyViewer[showStoryIndex]?.style?.background }}
            onMouseMove={mouseMoveHandler}
            onMouseOut={mouseOutHandler}
        >
            <ProgressTimeOut
                storyViewer={storyViewer}
                showStoryIndex={showStoryIndex}
                pauseFlagMouse={pauseFlagMouse}
            />

            <div className="storyItemWrap">
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
                            <div className="storyItemTextTopText">
                                {format(storyViewer[showStoryIndex]?.createdAt)}
                            </div>
                        </div>
                        <div className="storyItemTextBottm">Cavendish music</div>
                    </div>
                </div>

                <StoryAction pauseFlagBtn={pauseFlagBtn} pauseFlagMouse={pauseFlagMouse} />
            </div>

            <div className="storyItemContent">{storyViewer[showStoryIndex]?.desc}</div>
            <div id="storyPrevBtn" onClick={() => changeStoryIndexHandler(-1)}>
                <KeyboardArrowLeftIcon style={{ fontSize: 'inherit' }} />
            </div>
            <div id="storyNextBtn" onClick={() => changeStoryIndexHandler(1)}>
                <KeyboardArrowRightIcon style={{ fontSize: 'inherit' }} />
            </div>
        </div>
    );
}

export default StoryViewer;

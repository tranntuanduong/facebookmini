import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PauseIcon from '@mui/icons-material/Pause';

StoryAction.propTypes = {};

function StoryAction({ pauseFlagMouse, pauseFlagBtn }) {
    const [flag, setFlag] = useState(pauseFlagMouse);
    const changeStateStoryHandler = () => {
        pauseFlagMouse.current = !pauseFlagMouse.current;
        pauseFlagBtn.current = !pauseFlagBtn.current;
        setFlag(!flag);
    };
    return (
        <div className="storyItemAction">
            <div className="storyItemActionIcon" onClick={changeStateStoryHandler}>
                {flag ? (
                    <PauseIcon style={{ fontSize: 'inherit' }} />
                ) : (
                    <PlayArrowIcon style={{ fontSize: 'inherit' }} />
                )}
            </div>
            <div className="storyItemActionIcon">
                <VolumeUpIcon style={{ fontSize: 'inherit' }} />
            </div>
            <div className="storyItemActionIcon">
                <MoreHorizIcon style={{ fontSize: 'inherit' }} />
            </div>
        </div>
    );
}

export default StoryAction;

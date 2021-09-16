import React from 'react';
import Post from '../Post';
import Share from '../Share';
import Story from '../Story';

import './Feed.css';

Feed.propTypes = {};

function Feed(props) {
    return (
        <div className="feed">
            <Story />
            <Share />
            <Post />
            <Post />
            <Post />
        </div>
    );
}

export default Feed;

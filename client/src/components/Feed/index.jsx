import React, { useEffect, useState } from 'react';
import Post from '../Post';
import Share from '../Share';
import axios from 'axios';

import './Feed.css';
import { sortDateUtils } from '../../utils/utils';
import Stories from '../Story/Stories';

Feed.propTypes = {};

function Feed({ currentUser }) {
    const [posts, setPosts] = useState([]);
    const [stories, setStories] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await axios.get(`/posts/${currentUser._id}`);

            setPosts(sortDateUtils(res.data));
            // res.data.sort((a, b) => {
            //     return -(new Date(a.updatedAt) - new Date(b.updatedAt));
            // })
        })();
    }, [currentUser._id]);

    useEffect(() => {
        (async () => {
            const res = await axios.get(`/stories/view-home/${currentUser._id}`);
            setStories(res.data);
        })();
    }, [currentUser]);

    return (
        <div className="feed">
            {/* story list component */}
            <Stories currentUser={currentUser} stories={stories} />
            <Share currentUser={currentUser} setPosts={setPosts} posts={posts} />
            {/* <Post currentUser={currentUser} />
            <Post currentUser={currentUser} />
            <Post currentUser={currentUser} /> */}
            {posts.map((post) => (
                <Post key={post._id} currentUser={currentUser} post={post} />
            ))}
        </div>
    );
}

export default Feed;

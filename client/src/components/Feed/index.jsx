import React, { useEffect, useState } from 'react';
import Post from '../Post';
import Share from '../Share';
import Story from '../Story';
import axios from 'axios';

import './Feed.css';

Feed.propTypes = {};

function Feed({ currentUser }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await axios.get(`/posts/${currentUser._id}`);
            setPosts(res.data);
        })();
    }, [currentUser._id]);

    return (
        <div className="feed">
            <Story currentUser={currentUser} />
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

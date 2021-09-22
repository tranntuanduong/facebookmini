import axios from 'axios';
import React, { useState } from 'react';

FormComment.propTypes = {};

function FormComment({ post, currentUser, comments, setComments, autoFocusRef }) {
    const [myComment, setMyComment] = useState('');
    const [currentPostId, setCurrentPostId] = useState('');

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (myComment !== '') {
            const newComment = {
                userId: currentUser._id,
                postId: currentPostId,
                text: myComment,
                userAvatar: currentUser?.avatar,
                fullName: `${currentUser.firstName} ${currentUser.lastName}`,
            };
            const res = await axios.post(`comments`, newComment);
            // setComments(comments.concat(res.data));
            setComments([res.data, ...comments]);

            setMyComment('');
        }
    };

    const handleFieldChange = (e) => {
        setMyComment(e.target.value);
    };

    return (
        <form className="commentTopInput" onSubmit={handleCommentSubmit}>
            <input
                ref={autoFocusRef}
                type="text"
                placeholder="Viết bình luận..."
                value={myComment}
                onChange={handleFieldChange}
                onClick={() => setCurrentPostId(post._id)}
            />

            <div className="commentTopInputAttach">
                <div className="commentTopInputAttachItem">
                    <div
                        className="commentTopInputAttachItemBg"
                        style={{
                            backgroundImage: `url("/assets/feed/infoImg.png")`,
                            backgroundPosition: '0 -420px',
                        }}
                    ></div>
                </div>
                <div className="commentTopInputAttachItem">
                    <div
                        className="commentTopInputAttachItemBg"
                        style={{
                            backgroundImage: `url("/assets/feed/infoImg.png")`,
                            backgroundPosition: '0 -353px',
                        }}
                    ></div>
                </div>

                <div className="commentTopInputAttachItem">
                    <div
                        className="commentTopInputAttachItemBg"
                        style={{
                            backgroundImage: `url("/assets/feed/infoImg.png")`,
                            backgroundPosition: '0 -472px',
                        }}
                    ></div>
                </div>
            </div>
        </form>
    );
}

export default FormComment;

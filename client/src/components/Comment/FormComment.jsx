import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { EMOJI_ICON, TYPE_COMMENTPOST, TYPE_REPLY } from '../../constants';

FormComment.propTypes = {};

function FormComment({
    postId,
    currentUser,
    comments,
    setComments,
    autoFocusRef,
    initComment,
    type,
    subCommentInfo,
    subComments,
    setSubComments,
}) {
    const [myComment, setMyComment] = useState(initComment || '');
    const [currentPostId, setCurrentPostId] = useState('');
    const [showEmoji, setShowEmoji] = useState(false);
    const emojiRef = useRef(null);

    const handleOutsideClick = (e) => {
        if (emojiRef.current && !emojiRef.current.contains(e.target)) {
            setShowEmoji(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick, true);
    }, []);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        if (type === TYPE_COMMENTPOST) {
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
        } else if (type === TYPE_REPLY) {
            const newSubComment = {
                userId: currentUser._id,
                replyToUserId: subCommentInfo.replyToUserId,
                commentId: subCommentInfo.commentId,
                text: myComment,
                userAvatar: currentUser?.avatar,
                fullName: `${currentUser.firstName} ${currentUser.lastName}`,
            };

            const res = await axios.post(`subcomments`, newSubComment);
            /*subcoment sap xep theo cai cu nhat*/
            setSubComments([...subComments, res.data]);
            setMyComment('');
        }
    };

    const handleFieldChange = (e) => {
        setMyComment(e.target.value);
    };

    const showEmojiHandler = () => {
        setShowEmoji(!showEmoji);
    };

    const addEmojiHanler = (icon) => {
        const newComment = myComment + icon.props.children;
        setMyComment(newComment);
        setShowEmoji(false);
    };

    return (
        <form className="commentTopInput" onSubmit={handleCommentSubmit}>
            <input
                ref={autoFocusRef} /* forcus when click write comment */
                type="text"
                placeholder="Viết bình luận..."
                value={myComment}
                onChange={handleFieldChange}
                onClick={() => setCurrentPostId(postId)}
            />

            <div className="commentTopInputAttach">
                <div className="commentTopInputAttachItem " onClick={showEmojiHandler}>
                    <div
                        className="commentTopInputAttachItemBg"
                        style={{
                            backgroundImage: `url("/assets/feed/infoImg.png")`,
                            backgroundPosition: '0 -420px',
                        }}
                    ></div>
                    {showEmoji && (
                        <ul className="commentTopInputAttachEmoji" ref={emojiRef}>
                            {EMOJI_ICON.map((icon, index) => (
                                <li key={index} onClick={() => addEmojiHanler(icon)}>
                                    {icon}
                                </li>
                            ))}
                        </ul>
                    )}
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

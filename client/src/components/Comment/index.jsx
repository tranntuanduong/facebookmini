import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { NO_AVARTAR, PF, TYPE_COMMENTPOST } from '../../constants';
import { AuthContext } from '../../context/AuthProvider';
import './Comment.css';
import CommentItem from './CommentItem';
import FormComment from './FormComment';

Comment.propTypes = {};

function Comment({ post, totalComment, setTotalComment }) {
    const { user: currentUser } = useContext(AuthContext);
    const [comments, setComments] = useState([]); //comment of a post

    const viewInputRef = useRef();
    const autoFocusRef = useRef();
    const [skip, setSkip] = useState(0);

    useEffect(() => {
        (async () => {
            const res = await axios.get(`/comments/${post._id}/${skip}`);
            // Dang loi, ko dung body dc
            const count = await axios.get(`/comments/count?postId=${post._id}`, {
                postId: post._id,
            });

            // ----Code chua clean----
            // setComments(sortDateUtils(res.data));
            // setComments(res.data);
            // if (comments.length === 0) {
            //     console.log('true');
            //     setComments(res.data);
            // } else {
            //     console.log(res.data);
            //     console.log([...comments, ...res.data]);
            // }

            // ----Code da dc clean----
            setComments((prev) => [...prev, ...res.data]);
            setTotalComment(count.data);
        })();
    }, [post._id, skip]);

    const scrollToCommentHandler = () => {
        viewInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        autoFocusRef.current.focus({ preventScroll: true });
    };

    const readMoreHandler = async () => {
        // setComments(sortDateUtils([...comments, res.data]));
        setSkip(skip + 3);
    };

    return (
        <div className="comment">
            <div className="commentTop" ref={viewInputRef}>
                <img
                    src={`${PF}/${
                        currentUser.avatar ? `person/${currentUser.avatar}` : NO_AVARTAR
                    }`}
                    alt=""
                    className="commentTopAvatar"
                />
                {/* <input type="text" ref={autoFocusRef}></input> */}
                <FormComment
                    autoFocusRef={autoFocusRef}
                    currentUser={currentUser}
                    setComments={setComments}
                    comments={comments}
                    postId={post._id}
                    type={TYPE_COMMENTPOST}
                />
            </div>
            <ul className="commentList">
                {comments.map((comment) => (
                    <li key={comment._id} className="commentItem">
                        <CommentItem
                            key={comment._id}
                            comment={comment}
                            currentUser={currentUser}
                        />
                    </li>
                ))}
            </ul>
            <div className="commentMore" onClick={scrollToCommentHandler}>
                Viết bình luận ...
            </div>
            {totalComment - comments.length > 0 && (
                <div className="commentMore" onClick={readMoreHandler}>
                    Xem thêm {`(${totalComment - comments.length})`} bình luận
                </div>
            )}
        </div>
    );
}

export default Comment;

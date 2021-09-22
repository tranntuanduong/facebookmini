import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { NO_AVARTAR, PF } from '../../constants';
import { AuthContext } from '../../context/AuthProvider';
import './Comment.css';
import FormComment from './FormComment';
import SubComment from '../SubComment';
import { format } from 'timeago.js';
import { sortDateUtils } from '../../utils/utils';

Comment.propTypes = {};

function Comment({ post, scrollInToView }) {
    const { user: currentUser } = useContext(AuthContext);
    const [comments, setComments] = useState([]); //comment of a post
    const viewInputRef = useRef();
    const autoFocusRef = useRef();
    const [skip, setSkip] = useState(0);

    useEffect(() => {
        (async () => {
            const res = await axios.get(`/comments/${post._id}/${skip}`);
            // Dang loi, ko dung body dc
            const count = await axios.get(`/comments/count?postId=${post._id}`, { postId: post._id });

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
            console.log(count.data);
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
                    src={`${PF}/${currentUser.avatar ? currentUser.avatar : NO_AVARTAR}`}
                    alt=""
                    className="commentTopAvatar"
                />
                {/* <input type="text" ref={autoFocusRef}></input> */}
                <FormComment
                    autoFocusRef={autoFocusRef}
                    currentUser={currentUser}
                    setComments={setComments}
                    comments={comments}
                    post={post}
                />
            </div>
            <ul className="commentList">
                {comments.map((comment) => (
                    <li key={comment._id} className="commentItem">
                        <div className="commentItemAvatar">
                            <img
                                src={`${PF}/${comment.userAvatar ? comment.userAvatar : NO_AVARTAR}`}
                                alt=""
                                className="commentItemAvatarImg"
                            />
                        </div>

                        <div className="commentItemContentWrap">
                            <div className="commentItemContent">
                                <div className="commentItemContentLeft">
                                    <div className="commentItemContentName">{comment.fullName}</div>
                                    <div className="commentItemContentText">{comment.text}</div>
                                    <ul
                                        className={
                                            comment.text.length <= 35
                                                ? 'commentItemContentReportAction shortComment'
                                                : 'commentItemContentReportAction'
                                        }
                                    >
                                        <li className="reportItem">
                                            <img src="./assets/feed/like.svg" alt="" />
                                        </li>
                                        <li className="reportItem">
                                            <img src="./assets/feed/haha.svg" alt="" />
                                        </li>
                                        <div className="reportItemQuantity">1</div>
                                        <ul className="reportItemDetail">
                                            <li className="reportItemDetailItem">
                                                <img src="./assets/feed/like.svg" alt="" />
                                                <div className="reportItemDetailItemQuantity">53</div>
                                            </li>
                                            <li className="reportItemDetailItem">
                                                <img src="./assets/feed/haha.svg" alt="" />
                                                <div className="reportItemDetailItemQuantity">32</div>
                                            </li>
                                        </ul>
                                    </ul>
                                </div>
                                <div className="commentItemContentRight">
                                    <MoreHorizIcon />
                                </div>
                            </div>
                            <div className="commentItemBottom">
                                <div className="commentItemContentAction">
                                    <div className="commentItemContentActionItem">Thích</div>
                                    <div className="commentItemContentActionItem">Phản hồi</div>
                                    <div className="commentItemContentTime">{format(comment.createdAt)}</div>
                                </div>
                                {/* <SubComment />
                                <SubComment /> */}
                                {/* <SubComment /> */}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="commentMore" onClick={scrollToCommentHandler}>
                Viết bình luận ...
            </div>
            <div className="commentMore" onClick={readMoreHandler}>
                Xem thêm bình luận
            </div>
        </div>
    );
}

export default Comment;

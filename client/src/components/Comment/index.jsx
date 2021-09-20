import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { NO_AVARTAR, PF } from '../../constants';
import { AuthContext } from '../../context/AuthProvider';
import './Comment.css';
import FormComment from './FormComment';

Comment.propTypes = {};

function Comment({ post }) {
    const { user: currentUser } = useContext(AuthContext);
    const [comments, setComments] = useState([]); //comment of a post

    useEffect(() => {
        (async () => {
            const res = await axios.get(`/comments/${post._id}`);
            setComments(res.data);
        })();
    }, [post._id]);

    return (
        <div className="comment">
            <div className="commentTop">
                <img
                    src={`${PF}/${currentUser.avatar ? currentUser.avatar : NO_AVARTAR}`}
                    alt=""
                    className="commentTopAvatar"
                />
                {/* <form className="commentTopInput" onSubmit={handleCommentSubmit}>
                    <input
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
                </form> */}
                <FormComment currentUser={currentUser} setComments={setComments} comments={comments} post={post} />
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
                                    <ul className="commentItemContentReportAction">
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
                                    <div className="commentItemContentTime">16 giờ</div>
                                </div>
                                {/* <SubComment />
                                <SubComment /> */}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="commentMore">Xem thêm bình luận</div>
        </div>
    );
}

export default Comment;

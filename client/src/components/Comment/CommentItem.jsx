import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { format } from 'timeago.js';
import { NO_AVARTAR, PF, TYPE_REPLY } from '../../constants';
import './Comment.css';
import FormComment from './FormComment';
import SubCommentItem from './SubCommentItem';

CommentItem.propTypes = {};

function CommentItem({ comment, currentUser }) {
    const [openFeedbackComment, setOpenFeedbackComment] = useState(false);
    const [tagComment, setTagComment] = useState('');
    const [subCommentInfo, setSubCommentInfo] = useState();
    const [subComments, setSubComments] = useState([]);
    const [skip, setSkip] = useState(0);

    useEffect(() => {
        (async () => {
            const res = await axios.get(`/subcomments/${comment._id}/${skip}`);
            setSubComments(res.data);
        })();
    }, [comment, skip]);

    const feedbackCommentHandler = (fullName, userId, commentId) => {
        setOpenFeedbackComment(true);

        if (currentUser._id !== userId) {
            //if user reply to user'comment -> don't set tagcontent
            setTagComment(`@${fullName}`);
        }

        setSubCommentInfo({
            replyToUserId: userId,
            commentId: commentId,
        });

        console.log(userId);
    };

    return (
        <li key={comment._id} className="commentItem">
            <div className="commentItemAvatar">
                <img
                    src={`${PF}/${comment.userAvatar ? `person/${comment.userAvatar}` : NO_AVARTAR}`}
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
                        <div
                            className="commentItemContentActionItem"
                            onClick={() => feedbackCommentHandler(comment.fullName, comment.userId, comment._id)}
                        >
                            Phản hồi
                        </div>
                        <div className="commentItemContentTime">{format(comment.createdAt)}</div>
                    </div>
                    <SubCommentItem subComments={subComments} />
                    {openFeedbackComment && (
                        <div className="commentTop feedback">
                            <img
                                src={`${PF}/${currentUser.avatar ? `person/${currentUser.avatar}` : NO_AVARTAR}`}
                                alt=""
                                className="commentTopAvatar"
                            />
                            {/* <input type="text" ref={autoFocusRef}></input> */}
                            <FormComment
                                currentUser={currentUser}
                                initComment={tagComment}
                                type={TYPE_REPLY}
                                subCommentInfo={subCommentInfo}
                                setSubComments={setSubComments}
                                subComments={subComments}
                            />
                        </div>
                    )}
                    {/* <SubComment />
                     */}
                    {/* <SubComment /> */}
                </div>
            </div>
        </li>
    );
}

export default CommentItem;

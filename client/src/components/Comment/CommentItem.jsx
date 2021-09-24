import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { format } from 'timeago.js';
import { NO_AVARTAR, PF, TYPE_REPLY } from '../../constants';
import { chooseLikeTypeUtils, likeBtnHanderUtils, likeUtils } from '../../utils/utils';
import './Comment.css';
import FormComment from './FormComment';
import SubCommentItem from './SubCommentItem';

CommentItem.propTypes = {};

function CommentItem({ comment, currentUser }) {
    const [openFeedbackComment, setOpenFeedbackComment] = useState(false);
    const [tagComment, setTagComment] = useState('');
    const [subCommentInfo, setSubCommentInfo] = useState();
    const [subComments, setSubComments] = useState([]);
    const [subCommentCount, setSubCommentCount] = useState(0);
    const [showReadMoreSubCommentBtn, setShowReadMoreSubCommentBtn] = useState(false);
    const [openChooseLikeType, setOpenChooseLikeType] = useState(false);
    const [likes, setLikes] = useState(comment.likes);
    const [currentLikeIndex, setCurrentLikeIndex] = useState(
        likes.findIndex((like) => like.userId === currentUser._id)
    );
    const [likeViewer, setLikeViewer] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await axios.get(`/subcomments/${comment._id}/count`);
            setSubCommentCount(res.data);
            if (res.data > 0) {
                setShowReadMoreSubCommentBtn(true);
            }
        })();
    }, [comment]);

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
    };

    const readMoreSubCommentHandler = async () => {
        const res = await axios.get(`/subcomments/${comment._id}`);
        setSubComments(res.data);
        setShowReadMoreSubCommentBtn(false);
    };

    const handleMouseEnter = () => {
        setOpenChooseLikeType(true);
    };

    const handleMouseLeave = () => {
        setOpenChooseLikeType(false);
    };

    const chooseLikeTypeHandler = async (data) => {
        chooseLikeTypeUtils(likes, currentUser, data, setLikes, setCurrentLikeIndex, setOpenChooseLikeType);

        await axios.put(`/comments/${comment._id}/changelikes`, {
            userId: currentUser._id,
            type: data.type,
            text: data.text,
            styleColor: data.styleColor,
        });
    };

    const likeBtnHandler = async () => {
        const data = {
            type: 'like',
            styleColor: 'rgb(32, 120, 244)',
            text: 'Thích',
        };

        likeBtnHanderUtils(likes, currentUser, setLikes, setCurrentLikeIndex, data);
        await axios.put(`/comments/${comment._id}/likes`, {
            userId: currentUser._id,
            type: data.type,
            text: data.text,
            styleColor: data.styleColor,
        });
    };

    // view icon liketype
    useEffect(() => {
        setLikeViewer(likeUtils(likes));
    }, [likes]);

    return (
        <>
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
                            {likeViewer.length > 0 && (
                                <ul
                                    className={
                                        comment.text.length <= 35
                                            ? 'commentItemContentReportAction shortComment'
                                            : 'commentItemContentReportAction'
                                    }
                                >
                                    {likeViewer.map((element, index) => (
                                        <li key={index} className="reportItem">
                                            <img src={`./assets/feed/${element[0]}.svg`} alt="" />
                                        </li>
                                    ))}
                                    <div className="reportItemQuantity">{likes.length}</div>
                                    <ul className="reportItemDetail">
                                        <li className="reportItemDetailItem">
                                            <img src="./assets/feed/like.svg" alt="" />
                                            <div className="reportItemDetailItemQuantity">53</div>
                                        </li>
                                        <li className="reportItemDetailItem">
                                            <img src="./assets/feed/haha.svg" alt="" />
                                            <div className="reportItemDetailItemQuantity">32</div>
                                        </li>
                                        <li className="reportItemDetailItem">
                                            <img src="./assets/feed/angry.svg" alt="" />
                                            <div className="reportItemDetailItemQuantity">32</div>
                                        </li>
                                    </ul>
                                </ul>
                            )}
                        </div>
                        <div className="commentItemContentRight">
                            <MoreHorizIcon />
                        </div>
                    </div>
                    <div className="commentItemBottom">
                        <div className="commentItemContentAction">
                            <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                {currentLikeIndex >= 0 ? (
                                    <div
                                        className="commentItemContentActionItem"
                                        style={{ color: likes[currentLikeIndex]?.styleColor }}
                                        onClick={likeBtnHandler}
                                    >
                                        {likes[currentLikeIndex]?.text}
                                    </div>
                                ) : (
                                    <div className="commentItemContentActionItem" onClick={likeBtnHandler}>
                                        Thích
                                    </div>
                                )}

                                {/* Like comment list btn */}
                                <ul className={openChooseLikeType ? 'commentLikeBtnList open' : 'commentLikeBtnList'}>
                                    <li
                                        className="commentLikeBtnItem"
                                        onClick={() =>
                                            chooseLikeTypeHandler({
                                                type: 'like',
                                                text: 'Thích',
                                                styleColor: 'rgb(32, 120, 244)',
                                            })
                                        }
                                    >
                                        <img src="./assets/feed/like.svg" alt="" className="commentLikeBtnItemImg" />
                                    </li>
                                    <li
                                        className="commentLikeBtnItem"
                                        onClick={() =>
                                            chooseLikeTypeHandler({
                                                type: 'haha',
                                                text: 'Haha',
                                                styleColor: 'rgb(247, 177, 37)',
                                            })
                                        }
                                    >
                                        <img src="./assets/feed/haha.svg" alt="" className="commentLikeBtnItemImg" />
                                    </li>
                                    <li
                                        className="commentLikeBtnItem"
                                        onClick={() =>
                                            chooseLikeTypeHandler({
                                                type: 'lovely',
                                                text: 'Thương thương',
                                                styleColor: 'rgb(247, 177, 37)',
                                            })
                                        }
                                    >
                                        <img src="./assets/feed/lovely.svg" alt="" className="commentLikeBtnItemImg" />
                                    </li>
                                    <li
                                        className="commentLikeBtnItem"
                                        onClick={() =>
                                            chooseLikeTypeHandler({
                                                type: 'heart',
                                                text: 'Yêu thích',
                                                styleColor: 'rgb(243, 62, 88)',
                                            })
                                        }
                                    >
                                        <img src="./assets/feed/heart.svg" alt="" className="commentLikeBtnItemImg" />
                                    </li>
                                    <li
                                        className="commentLikeBtnItem"
                                        onClick={() =>
                                            chooseLikeTypeHandler({
                                                type: 'wow',
                                                text: 'Wow',
                                                styleColor: 'rgb(247, 177, 37)',
                                            })
                                        }
                                    >
                                        <img src="./assets/feed/wow.svg" alt="" className="commentLikeBtnItemImg" />
                                    </li>
                                    <li
                                        className="commentLikeBtnItem"
                                        onClick={() =>
                                            chooseLikeTypeHandler({
                                                type: 'sad',
                                                text: 'Buồn',
                                                styleColor: 'rgb(247, 177, 37)',
                                            })
                                        }
                                    >
                                        <img src="./assets/feed/sad.svg" alt="" className="commentLikeBtnItemImg" />
                                    </li>
                                    <li
                                        className="commentLikeBtnItem"
                                        onClick={() =>
                                            chooseLikeTypeHandler({
                                                type: 'angry',
                                                text: 'Phẫn nộ',
                                                styleColor: 'rgb(233, 113, 15)',
                                            })
                                        }
                                    >
                                        <img src="./assets/feed/angry.svg" alt="" className="commentLikeBtnItemImg" />
                                    </li>
                                </ul>
                            </div>
                            <div
                                className="commentItemContentActionItem"
                                onClick={() => feedbackCommentHandler(comment.fullName, comment.userId, comment._id)}
                            >
                                Phản hồi
                            </div>
                            <div className="commentItemContentTime">{format(comment.createdAt)}</div>
                        </div>

                        {showReadMoreSubCommentBtn && (
                            <div className="subcommentReadMore">
                                <div
                                    className="subcommentReadMoreBg"
                                    style={{
                                        backgroundImage: `url("/assets/feed/infoImg.png")`,
                                        backgroundPosition: '0 -540px',
                                    }}
                                ></div>
                                <div className="subcommentReadMoreText" onClick={readMoreSubCommentHandler}>
                                    {subCommentCount} phản hồi
                                </div>
                            </div>
                        )}
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
                    </div>
                </div>
            </li>
        </>
    );
}

export default CommentItem;

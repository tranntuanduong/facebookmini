import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { format } from 'timeago.js';
import { NO_AVARTAR, PF } from '../../constants';
import { AuthContext } from '../../context/AuthProvider';
import { chooseLikeTypeUtils, likeBtnHanderUtils, likeUtils } from '../../utils/utils';

SubCommentItem.propTypes = {};

function SubCommentItem({ subComment }) {
    const { user: currentUser } = useContext(AuthContext);
    const [openChooseLikeType, setOpenChooseLikeType] = useState(false);
    const [likes, setLikes] = useState(subComment.likes);
    const [currentLikeIndex, setCurrentLikeIndex] = useState(
        likes.findIndex((like) => like.userId === currentUser._id)
    );
    const [likeViewer, setLikeViewer] = useState([]);

    const handleMouseEnter = () => {
        setOpenChooseLikeType(true);
    };

    const handleMouseLeave = () => {
        setOpenChooseLikeType(false);
    };

    const chooseLikeTypeHandler = async (data) => {
        chooseLikeTypeUtils(
            likes,
            currentUser,
            data,
            setLikes,
            setCurrentLikeIndex,
            setOpenChooseLikeType
        );

        await axios.put(`/subcomments/${subComment._id}/changelikes`, {
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
        await axios.put(`/subcomments/${subComment._id}/likes`, {
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
            <div className="commentItemAvatar">
                <img
                    src={`${PF}/${
                        subComment.userAvatar ? `person/${subComment.userAvatar}` : NO_AVARTAR
                    }`}
                    alt=""
                    className="commentItemAvatarImg"
                />
            </div>

            <div className="commentItemContentWrap">
                <div className="commentItemContent">
                    <div className="commentItemContentLeft">
                        <div className="commentItemContentName">{subComment.fullName}</div>
                        <div className="commentItemContentText">{subComment.text}</div>
                        {likeViewer.length > 0 && (
                            <ul
                                className={
                                    subComment.text.length <= 35
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
                                <div
                                    className="commentItemContentActionItem"
                                    onClick={likeBtnHandler}
                                >
                                    Thích
                                </div>
                            )}

                            {/* Like comment list btn */}
                            <ul
                                className={
                                    openChooseLikeType
                                        ? 'commentLikeBtnList open'
                                        : 'commentLikeBtnList'
                                }
                            >
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
                                    <img
                                        src="./assets/feed/like.svg"
                                        alt=""
                                        className="commentLikeBtnItemImg"
                                    />
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
                                    <img
                                        src="./assets/feed/haha.svg"
                                        alt=""
                                        className="commentLikeBtnItemImg"
                                    />
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
                                    <img
                                        src="./assets/feed/lovely.svg"
                                        alt=""
                                        className="commentLikeBtnItemImg"
                                    />
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
                                    <img
                                        src="./assets/feed/heart.svg"
                                        alt=""
                                        className="commentLikeBtnItemImg"
                                    />
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
                                    <img
                                        src="./assets/feed/wow.svg"
                                        alt=""
                                        className="commentLikeBtnItemImg"
                                    />
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
                                    <img
                                        src="./assets/feed/sad.svg"
                                        alt=""
                                        className="commentLikeBtnItemImg"
                                    />
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
                                    <img
                                        src="./assets/feed/angry.svg"
                                        alt=""
                                        className="commentLikeBtnItemImg"
                                    />
                                </li>
                            </ul>
                        </div>
                        <div className="commentItemContentActionItem">Phản hồi</div>
                        <div className="commentItemContentTime">{format(subComment.createdAt)}</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SubCommentItem;

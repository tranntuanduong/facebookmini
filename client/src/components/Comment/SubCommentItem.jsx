import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import React, { useState } from 'react';
import { NO_AVARTAR, PF } from '../../constants';
import { format } from 'timeago.js';

function SubCommentItem({ subComments }) {
    const [openChooseLikeType, setOpenChooseLikeType] = useState(false);
    const handleMouseEnter = () => {
        setOpenChooseLikeType(true);
    };

    const handleMouseLeave = () => {
        setOpenChooseLikeType(false);
    };
    return (
        <ul className="commentList">
            {subComments.map((subComment) => (
                <li key={subComment._id} className="commentItem">
                    <div className="commentItemAvatar">
                        <img
                            src={`${PF}/${subComment.userAvatar ? `person/${subComment.userAvatar}` : NO_AVARTAR}`}
                            alt=""
                            className="commentItemAvatarImg"
                        />
                    </div>

                    <div className="commentItemContentWrap">
                        <div className="commentItemContent">
                            <div className="commentItemContentLeft">
                                <div className="commentItemContentName">{subComment.fullName}</div>
                                <div className="commentItemContentText">{subComment.text}</div>
                                <ul
                                    className={
                                        subComment.text.length <= 35
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
                                    <div className="reportItemQuantity">12</div>
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
                                <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                    <div className="commentItemContentActionItem">Thích</div>
                                    {/* Like comment list btn */}
                                    <ul
                                        className={
                                            openChooseLikeType ? 'commentLikeBtnList open' : 'commentLikeBtnList'
                                        }
                                    >
                                        <li className="commentLikeBtnItem">
                                            <img
                                                src="./assets/feed/like.svg"
                                                alt=""
                                                className="commentLikeBtnItemImg"
                                            />
                                        </li>
                                        <li className="commentLikeBtnItem">
                                            <img
                                                src="./assets/feed/haha.svg"
                                                alt=""
                                                className="commentLikeBtnItemImg"
                                            />
                                        </li>
                                        <li className="commentLikeBtnItem">
                                            <img
                                                src="./assets/feed/lovely.svg"
                                                alt=""
                                                className="commentLikeBtnItemImg"
                                            />
                                        </li>
                                        <li className="commentLikeBtnItem">
                                            <img
                                                src="./assets/feed/heart.svg"
                                                alt=""
                                                className="commentLikeBtnItemImg"
                                            />
                                        </li>
                                        <li className="commentLikeBtnItem">
                                            <img src="./assets/feed/wow.svg" alt="" className="commentLikeBtnItemImg" />
                                        </li>
                                        <li className="commentLikeBtnItem">
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
                </li>
            ))}
        </ul>
    );
}

export default SubCommentItem;

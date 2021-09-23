import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import React from 'react';
import { NO_AVARTAR, PF } from '../../constants';

function SubCommentItem({ subComments }) {
    console.log(subComments);
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
                                <div className="commentItemContentActionItem">Thích</div>
                                <div className="commentItemContentActionItem">Phản hồi</div>
                                <div className="commentItemContentTime">16 giờ</div>
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default SubCommentItem;

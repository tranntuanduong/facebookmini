import React from 'react';
import './SubComment.css';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function SubComment(props) {
    return (
        <ul className="commentList">
            <li className="commentItem">
                <div className="commentItemAvatar">
                    <img src="./assets/person/1.jpeg" alt="" className="commentItemAvatarImg" />
                </div>

                <div className="commentItemContentWrap">
                    <div className="commentItemContent">
                        <div className="commentItemContentLeft">
                            <div className="commentItemContentName">Nhạt như muối</div>
                            <div className="commentItemContentText">
                                Bất hợp lý là giờ này không lo mà đi hóng drama sao kê, ngồi đây
                                chơi ba cái này làm cái gì.
                            </div>
                            <ul className="commentItemContentReportAction">
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
        </ul>
    );
}

export default SubComment;

import React from 'react';
import './Comment.css';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SubComment from '../SubComment';
Comment.propTypes = {};

function Comment() {
    return (
        <div className="comment">
            <div className="commentTop">
                <img src="./assets/person/3.jpeg" alt="" className="commentTopAvatar" />
                <div className="commentTopInput">
                    <input type="text" placeholder="Viết bình luận..." />
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
                </div>
            </div>
            <ul className="commentList">
                <li className="commentItem">
                    <div className="commentItemAvatar">
                        <img src="./assets/person/7.jpeg" alt="" className="commentItemAvatarImg" />
                    </div>

                    <div className="commentItemContentWrap">
                        <div className="commentItemContent">
                            <div className="commentItemContentLeft">
                                <div className="commentItemContentName">Dũng sĩ diệt bọ</div>
                                <div className="commentItemContentText">
                                    Xem phim lại nhớ vụ thiên kim của chủ tịch nào đó bắt cả chuyến
                                    bay phải quay đầu để tống cổ tiếp viên xuống máy bay vì không
                                    phục vụ đúng ý mình. Xem phim lại nhớ vụ thiên kim của chủ tịch
                                    nào đó bắt cả chuyến bay phải quay đầu để tống cổ tiếp viên
                                    xuống máy bay vì không phục vụ đúng ý mình.
                                </div>
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
                            <SubComment />
                            <SubComment />
                        </div>
                    </div>
                </li>
                <li className="commentItem">
                    <div className="commentItemAvatar">
                        <img src="./assets/person/7.jpeg" alt="" className="commentItemAvatarImg" />
                    </div>

                    <div className="commentItemContentWrap">
                        <div className="commentItemContent">
                            <div className="commentItemContentLeft">
                                <div className="commentItemContentName">Dũng sĩ diệt bọ</div>
                                <div className="commentItemContentText">
                                    Xem phim lại nhớ vụ thiên kim của chủ tịch nào đó bắt cả chuyến
                                    bay phải quay đầu để tống cổ tiếp viên xuống máy bay vì không
                                    phục vụ đúng ý mình. Xem phim lại nhớ vụ thiên kim của chủ tịch
                                    nào đó bắt cả chuyến bay phải quay đầu để tống cổ tiếp viên
                                    xuống máy bay vì không phục vụ đúng ý mình.
                                </div>
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
                            <SubComment />
                            <SubComment />
                        </div>
                    </div>
                </li>
            </ul>
            <div className="commentMore">Xem thêm bình luận</div>
        </div>
    );
}

export default Comment;

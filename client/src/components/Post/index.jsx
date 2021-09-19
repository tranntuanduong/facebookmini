import React, { useState } from 'react';
import './Post.css';
import PublicIcon from '@material-ui/icons/Public';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Comment from '../Comment';

Post.propTypes = {};

function Post(props) {
    const [isShowComment, setIsShowComment] = useState(true);

    return (
        <div className="post">
            <div className="postTop">
                <img src="./assets/person/4.jpeg" alt="" className="postTopAvatar" />
                <div className="postTopInfo">
                    <span className="postTopInfoName">Sophie Phan</span>
                    <div className="postTopInfoTime">
                        <span>2 giờ · </span> <PublicIcon style={{ fontSize: 'inherit' }} />
                    </div>
                </div>
                <div className="postTopAction">
                    <MoreHorizIcon />
                </div>
            </div>
            <div className="postContent">
                <div className="postContentText">
                    Lựa chọn Errol ở vị trí thứ 4 của Team Flash Liên Quân Mobile đã làm phá sản
                    toàn bộ kế hoạch của FAP Esports. Bug đã phải chuyển về vị trí đi rừng trong khi
                    Jiro dù rất cố gắng với con bài Superman nhưng không thể tạo nên đột biến
                </div>
                <img src="./assets/post/2.jpeg" alt="" className="postContentImg" />
            </div>

            <div className="postBottom">
                <div className="postBottmInfo">
                    <div className="postBottomLikeInfo">
                        <img
                            src="./assets/feed/like.svg"
                            alt=""
                            className="postBottomLikeInfoImg "
                        />
                        <img
                            src="./assets/feed/haha.svg"
                            alt=""
                            className="postBottomLikeInfoImg "
                        />
                        <img
                            src="./assets/feed/heart.svg"
                            alt=""
                            className="postBottomLikeInfoImg "
                        />
                        <span className="postBottomLikeInfoText">1K</span>
                    </div>

                    <div className="postBottomTextInfo">
                        <span className="postBottomTextInfoItem">227 lượt bình luận</span>
                        <span className="postBottomTextInfoItem">31 lượt chia sẻ</span>
                    </div>
                </div>

                <div className="postBottomAction">
                    <hr className="postHr" />
                    <div className="filterBottomActionList">
                        <div className="postBottomActionItem postBottomActionItemLike">
                            <div
                                className="postBottomActionItemBg "
                                style={{
                                    backgroundImage: `url("/assets/feed/infoImg.png")`,
                                    backgroundPosition: '0 -214px',
                                }}
                            ></div>
                            <span className="postBottomActionItemText">Thích</span>
                            <ul className="postBottomLikeDetailList">
                                <li className="postBottomLikeDetailItem">
                                    <img
                                        src="./assets/feed/like.svg"
                                        alt=""
                                        className="postBottomLikeDetailImg"
                                    />
                                </li>
                                <li className="postBottomLikeDetailItem">
                                    <img
                                        src="./assets/feed/haha.svg"
                                        alt=""
                                        className="postBottomLikeDetailImg"
                                    />
                                </li>
                                <li className="postBottomLikeDetailItem">
                                    <img
                                        src="./assets/feed/lovely.svg"
                                        alt=""
                                        className="postBottomLikeDetailImg"
                                    />
                                </li>
                                <li className="postBottomLikeDetailItem">
                                    <img
                                        src="./assets/feed/heart.svg"
                                        alt=""
                                        className="postBottomLikeDetailImg"
                                    />
                                </li>
                                <li className="postBottomLikeDetailItem">
                                    <img
                                        src="./assets/feed/wow.svg"
                                        alt=""
                                        className="postBottomLikeDetailImg"
                                    />
                                </li>
                                <li className="postBottomLikeDetailItem">
                                    <img
                                        src="./assets/feed/sad.svg"
                                        alt=""
                                        className="postBottomLikeDetailImg"
                                    />
                                </li>
                                <li className="postBottomLikeDetailItem">
                                    <img
                                        src="./assets/feed/angry.svg"
                                        alt=""
                                        className="postBottomLikeDetailImg"
                                    />
                                </li>
                            </ul>
                        </div>

                        <div className="postBottomActionItem">
                            <div
                                className="postBottomActionItemBg "
                                style={{
                                    backgroundImage: `url("/assets/feed/infoImg.png")`,
                                    backgroundPosition: '0 -175px',
                                }}
                            ></div>
                            <span className="postBottomActionItemText">Bình luận</span>
                        </div>
                        <div className="postBottomActionItem">
                            <div
                                className="postBottomActionItemBg "
                                style={{
                                    backgroundImage: `url("/assets/feed/infoImg.png")`,
                                    backgroundPosition: '0 -232px',
                                }}
                            ></div>
                            <span className="postBottomActionItemText">Chia sẻ</span>
                        </div>
                    </div>
                </div>
            </div>
            {isShowComment && (
                <div className="postCommentWrap">
                    <hr className="postHr" />
                    <Comment />
                </div>
            )}
        </div>
    );
}

export default Post;

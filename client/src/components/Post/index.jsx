import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import PublicIcon from '@material-ui/icons/Public';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { format } from 'timeago.js';
import { NO_AVARTAR, PF } from '../../constants';
import { likeUtils } from '../../utils/utils';
import Comment from '../Comment';
import './Post.css';

Post.propTypes = {};

function Post({ post, currentUser }) {
    const [isShowComment, setIsShowComment] = useState(true);
    const [likes, setLikes] = useState(post.likes);

    const [user, setUser] = useState({});
    const [topLikeType, setTopLikeType] = useState([]);
    const [openChooseLikeType, setOpenChooseLikeType] = useState(false);

    useEffect(() => {
        (async () => {
            const res = await axios.get(`/users?userId=${post.userId}`);
            setUser(res.data);
        })();
    }, [post.userId]);

    // handle when click like btn
    const likeHandler = async (type) => {
        if (likes.some((like) => like.userId === currentUser._id)) {
            // liked
            likes.splice(
                likes.findIndex((like) => like.userId === currentUser._id),
                1
            );
            setLikes([...likes]);
        } else {
            setLikes([...likes, { type: type, userId: currentUser._id }]);
        }
        setOpenChooseLikeType(false);
        await axios.put(`/posts/${post._id}/likes`, { userId: currentUser._id, type: type });
    };

    // view icon liketype
    useEffect(() => {
        setTopLikeType(likeUtils(likes));
    }, [likes]);

    // handle open likes choose
    const handleMouseEnter = () => {
        setOpenChooseLikeType(true);
    };

    const handleMouseLeave = () => {
        setOpenChooseLikeType(false);
    };

    // handle open likes choose
    // const handleMouseEvent = (type) => {
    //     if (type === 'type') {
    //         console.log(type);

    //         setOpenChooseLikeType(true);
    //     } else {
    //         console.log(type);
    //         setOpenChooseLikeType(false);
    //     }
    // };
    // console.log(post.imgCollections);

    return (
        <div className="post">
            <div className="postTop">
                <img src={`${PF}/${user.avatar ? user.avatar : NO_AVARTAR}`} alt="" className="postTopAvatar" />
                <div className="postTopInfo">
                    <span className="postTopInfoName">{`${user.firstName} ${user.lastName}`}</span>
                    <div className="postTopInfoTime">
                        <span>{format(post.createdAt)} · </span> <PublicIcon style={{ fontSize: 'inherit' }} />
                    </div>
                </div>
                <div className="postTopAction">
                    <MoreHorizIcon />
                </div>
            </div>
            <div className="postContent">
                <div className="postContentText">{post.desc}</div>

                <div className="imgWraper">
                    {/* imgConnections: 1 */}
                    {post.imgCollections.length === 1 && (
                        <img src={`${PF}/post/${post.imgCollections[0]}`} alt="" className="postContentImg" />
                    )}

                    {/* imgConnections: 2 */}
                    {post.imgCollections.length === 2 && (
                        <div className="postContentImgWrap2">
                            {post.imgCollections.map((img, index) => (
                                <img key={index} src={`${PF}/post/${img}`} alt="" className="postContentImg2_2" />
                            ))}
                        </div>
                    )}

                    {/* imgConnections: 3 */}
                    {post.imgCollections.length === 3 && (
                        <>
                            <div className="postContentImgWrap3">
                                {post.imgCollections.slice(0, 1).map((img, index) => (
                                    <img key={index} src={`${PF}/post/${img}`} alt="" className="postContentImg3_1" />
                                ))}
                            </div>
                            <div className="postContentImgWrap2">
                                {post.imgCollections.slice(1, 3).map((img, index) => (
                                    <img key={index} src={`${PF}/post/${img}`} alt="" className="postContentImg2_2" />
                                ))}
                            </div>
                        </>
                    )}

                    {/* imgConnections: 4 */}
                    {post.imgCollections.length === 4 && (
                        <>
                            <div className="postContentImgWrap2">
                                {post.imgCollections.slice(0, 2).map((img, index) => (
                                    <img key={index} src={`${PF}/post/${img}`} alt="" className="postContentImg2_2" />
                                ))}
                            </div>
                            <div className="postContentImgWrap2">
                                {post.imgCollections.slice(2, 4).map((img, index) => (
                                    <img key={index} src={`${PF}/post/${img}`} alt="" className="postContentImg2_2" />
                                ))}
                            </div>
                        </>
                    )}

                    {/* imgConnections: 5 */}
                    {post.imgCollections.length >= 5 && (
                        <>
                            <div className="postContentImgWrap2">
                                {post.imgCollections.slice(0, 2).map((img, index) => (
                                    <img key={index} src={`${PF}/post/${img}`} alt="" className="postContentImg2_2" />
                                ))}
                            </div>
                            <div className="postContentImgWrap3_3">
                                {post.imgCollections.slice(2, 5).map((img, index) => (
                                    <img key={index} src={`${PF}/post/${img}`} alt="" className="postContentImg3_3" />
                                ))}
                                {post.imgCollections.slice(5, 6).map((img, index) => (
                                    <div key={index} className="postContentMoreImg">
                                        +{post.imgCollections.length - 5}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="postBottom">
                <div className="postBottmInfo">
                    <div className="postBottomLikeInfo">
                        {topLikeType.map((element, index) => (
                            <img
                                key={index}
                                src={`./assets/feed/${element[0]}.svg`}
                                alt=""
                                className="postBottomLikeInfoImg "
                            />
                        ))}

                        <span className="postBottomLikeInfoText">{!likes.length ? '' : `${likes.length}`}</span>
                    </div>

                    <div className="postBottomTextInfo">
                        <span className="postBottomTextInfoItem">227 lượt bình luận</span>
                        <span className="postBottomTextInfoItem">31 lượt chia sẻ</span>
                    </div>
                </div>

                <div className="postBottomAction">
                    <hr className="postHr" />
                    <div className="filterBottomActionList">
                        <div
                            className="postBottomActionItem postBottomActionItemLike"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="postBottomActionItemLikeWrap" onClick={() => likeHandler('like')}>
                                {likes.some((like) => like.userId === currentUser._id) ? (
                                    <>
                                        <div
                                            className="postBottomActionItemBg liked"
                                            style={{
                                                backgroundImage: `url("/assets/feed/infoImg.png")`,
                                                backgroundPosition: '0 -214px',
                                            }}
                                        ></div>
                                        <span className="postBottomActionItemText liked">Thích</span>
                                    </>
                                ) : (
                                    <>
                                        <div
                                            className="postBottomActionItemBg"
                                            style={{
                                                backgroundImage: `url("/assets/feed/infoImg.png")`,
                                                backgroundPosition: '0 -214px',
                                            }}
                                        ></div>
                                        <span className="postBottomActionItemText">Thích</span>
                                    </>
                                )}
                            </div>

                            {/* onMouseOver={handleOnMouseOver} */}

                            <ul
                                className={
                                    openChooseLikeType
                                        ? 'postBottomLikeDetailList postBottomLikeDetailListShow'
                                        : 'postBottomLikeDetailList'
                                }
                            >
                                <li className="postBottomLikeDetailItem" onClick={() => likeHandler('like')}>
                                    <img src="./assets/feed/like.svg" alt="" className="postBottomLikeDetailImg" />
                                </li>
                                <li className="postBottomLikeDetailItem" onClick={() => likeHandler('haha')}>
                                    <img src="./assets/feed/haha.svg" alt="" className="postBottomLikeDetailImg" />
                                </li>
                                <li className="postBottomLikeDetailItem" onClick={() => likeHandler('lovely')}>
                                    <img src="./assets/feed/lovely.svg" alt="" className="postBottomLikeDetailImg" />
                                </li>
                                <li className="postBottomLikeDetailItem" onClick={() => likeHandler('heart')}>
                                    <img src="./assets/feed/heart.svg" alt="" className="postBottomLikeDetailImg" />
                                </li>
                                <li className="postBottomLikeDetailItem" onClick={() => likeHandler('wow')}>
                                    <img src="./assets/feed/wow.svg" alt="" className="postBottomLikeDetailImg" />
                                </li>
                                <li className="postBottomLikeDetailItem" onClick={() => likeHandler('sad')}>
                                    <img src="./assets/feed/sad.svg" alt="" className="postBottomLikeDetailImg" />
                                </li>
                                <li className="postBottomLikeDetailItem" onClick={() => likeHandler('angry')}>
                                    <img src="./assets/feed/angry.svg" alt="" className="postBottomLikeDetailImg" />
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
                    <Comment post={post} />
                </div>
            )}
        </div>
    );
}

export default Post;

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import PublicIcon from '@material-ui/icons/Public';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { format } from 'timeago.js';
import { NO_AVARTAR, PF } from '../../constants';
import { chooseLikeTypeUtils, likeBtnHanderUtils, likeUtils } from '../../utils/utils';
import Comment from '../Comment';
import './Post.css';

Post.propTypes = {};

function Post({ post, currentUser }) {
    const [likes, setLikes] = useState(post.likes);
    const [user, setUser] = useState({});
    const [topLikeType, setTopLikeType] = useState([]);
    const [openChooseLikeType, setOpenChooseLikeType] = useState(false);
    const [totalComment, setTotalComment] = useState();
    const [currentLikeIndex, setCurrentLikeIndex] = useState(
        likes.findIndex((like) => like.userId === currentUser._id)
    );

    useEffect(() => {
        (async () => {
            const res = await axios.get(`/users?userId=${post.userId}`);
            setUser(res.data);
        })();
    }, [post.userId]);

    // handle when click like btn
    const chooseLikeTypeHandler = async (data) => {
        // if (likes.some((like) => like.userId === currentUser._id)) {
        //     // liked
        //     likes.splice(
        //         likes.findIndex((like) => like.userId === currentUser._id),
        //         1
        //     );
        //     const newLikes = [
        //         ...likes,
        //         { type: data.type, userId: currentUser._id, text: data.text, styleColor: data.styleColor },
        //     ];
        //     setLikes(newLikes);
        // } else {
        //     console.log('dislike');
        //     const newLikes = [
        //         ...likes,
        //         { type: data.type, userId: currentUser._id, text: data.text, styleColor: data.styleColor },
        //     ];
        //     setLikes(newLikes);
        //     setCurrentLikeIndex(newLikes.findIndex((like) => like.userId === currentUser._id));
        // }
        // setOpenChooseLikeType(false);

        chooseLikeTypeUtils(
            likes,
            currentUser,
            data,
            setLikes,
            setCurrentLikeIndex,
            setOpenChooseLikeType
        );

        await axios.put(`/posts/${post._id}/changelikes`, {
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
        // if (likes.some((like) => like.userId === currentUser._id)) {
        //     // neu nhu da like:
        //     likes.splice(
        //         likes.findIndex((like) => like.userId === currentUser._id),
        //         1
        //     );
        //     setLikes([...likes]);
        //     setCurrentLikeIndex(likes.findIndex((like) => like.userId === currentUser._id));
        // } else {
        //     const newLikes = [...likes, { type: type, userId: currentUser._id, text: text, styleColor: styleColor }];
        //     setLikes(newLikes);
        //     setCurrentLikeIndex(newLikes.findIndex((like) => like.userId === currentUser._id));
        // }
        likeBtnHanderUtils(likes, currentUser, setLikes, setCurrentLikeIndex, data);
        await axios.put(`/posts/${post._id}/likes`, {
            userId: currentUser._id,
            type: data.type,
            text: data.text,
            styleColor: data.styleColor,
        });
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
                <img
                    src={`${PF}/${user.avatar ? `person/${user.avatar}` : NO_AVARTAR}`}
                    alt=""
                    className="postTopAvatar"
                />
                <div className="postTopInfo">
                    <span className="postTopInfoName">{`${user.firstName} ${user.lastName}`}</span>
                    <div className="postTopInfoTime">
                        <span>{format(post.createdAt)} · </span>{' '}
                        <PublicIcon style={{ fontSize: 'inherit' }} />
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
                        <img
                            src={`${PF}/post/${post.imgCollections[0]}`}
                            alt=""
                            className="postContentImg"
                        />
                    )}

                    {/* imgConnections: 2 */}
                    {post.imgCollections.length === 2 && (
                        <div className="postContentImgWrap2">
                            {post.imgCollections.map((img, index) => (
                                <img
                                    key={index}
                                    src={`${PF}/post/${img}`}
                                    alt=""
                                    className="postContentImg2_2"
                                />
                            ))}
                        </div>
                    )}

                    {/* imgConnections: 3 */}
                    {post.imgCollections.length === 3 && (
                        <>
                            <div className="postContentImgWrap3">
                                {post.imgCollections.slice(0, 1).map((img, index) => (
                                    <img
                                        key={index}
                                        src={`${PF}/post/${img}`}
                                        alt=""
                                        className="postContentImg3_1"
                                    />
                                ))}
                            </div>
                            <div className="postContentImgWrap2">
                                {post.imgCollections.slice(1, 3).map((img, index) => (
                                    <img
                                        key={index}
                                        src={`${PF}/post/${img}`}
                                        alt=""
                                        className="postContentImg2_2"
                                    />
                                ))}
                            </div>
                        </>
                    )}

                    {/* imgConnections: 4 */}
                    {post.imgCollections.length === 4 && (
                        <>
                            <div className="postContentImgWrap2">
                                {post.imgCollections.slice(0, 2).map((img, index) => (
                                    <img
                                        key={index}
                                        src={`${PF}/post/${img}`}
                                        alt=""
                                        className="postContentImg2_2"
                                    />
                                ))}
                            </div>
                            <div className="postContentImgWrap2">
                                {post.imgCollections.slice(2, 4).map((img, index) => (
                                    <img
                                        key={index}
                                        src={`${PF}/post/${img}`}
                                        alt=""
                                        className="postContentImg2_2"
                                    />
                                ))}
                            </div>
                        </>
                    )}

                    {/* imgConnections: 5 */}
                    {post.imgCollections.length >= 5 && (
                        <>
                            <div className="postContentImgWrap2">
                                {post.imgCollections.slice(0, 2).map((img, index) => (
                                    <img
                                        key={index}
                                        src={`${PF}/post/${img}`}
                                        alt=""
                                        className="postContentImg2_2"
                                    />
                                ))}
                            </div>
                            <div className="postContentImgWrap3_3">
                                {post.imgCollections.slice(2, 5).map((img, index) => (
                                    <img
                                        key={index}
                                        src={`${PF}/post/${img}`}
                                        alt=""
                                        className="postContentImg3_3"
                                    />
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

                        <span className="postBottomLikeInfoText">
                            {!likes.length ? '' : `${likes.length}`}
                        </span>
                    </div>

                    <div className="postBottomTextInfo">
                        <span className="postBottomTextInfoItem">
                            {totalComment} lượt bình luận
                        </span>
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
                            {/* <div className="postBottomActionItemLikeWrap" onClick={() => chooseLikeTypeHandler('like')}>
                                {likes.some((like) => like.userId === currentUser._id) ? (
                                    <>
                                        <img src={`/assets/feed/like.svg`} alt="" className="postBottomLikeInfoImg" />
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
                            </div> */}
                            <div
                                className="postBottomActionItemLikeWrap"
                                onClick={() => likeBtnHandler()}
                            >
                                {currentLikeIndex >= 0 ? (
                                    // Khac voi chooseLikeTypeHandler, likeBtnHandler dung de xu li like va dislike
                                    <div className="likeBtn">
                                        <img
                                            src={`/assets/feed/${likes[currentLikeIndex]?.type}.svg`}
                                            alt=""
                                            className="postBottomLikeInfoImg"
                                        />
                                        <span
                                            className="postBottomActionItemText liked"
                                            style={{ color: likes[currentLikeIndex]?.styleColor }}
                                        >
                                            {likes[currentLikeIndex]?.text}
                                        </span>
                                    </div>
                                ) : (
                                    <div className="likeBtn">
                                        <div
                                            className="postBottomActionItemBg"
                                            style={{
                                                backgroundImage: `url("/assets/feed/infoImg.png")`,
                                                backgroundPosition: '0 -214px',
                                            }}
                                        ></div>
                                        <span className="postBottomActionItemText">Thích</span>
                                    </div>
                                )}
                            </div>

                            <ul
                                className={
                                    openChooseLikeType
                                        ? 'postBottomLikeDetailList postBottomLikeDetailListShow'
                                        : 'postBottomLikeDetailList'
                                }
                            >
                                <li
                                    className="postBottomLikeDetailItem"
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
                                        className="postBottomLikeDetailImg"
                                    />
                                </li>
                                <li
                                    className="postBottomLikeDetailItem"
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
                                        className="postBottomLikeDetailImg"
                                    />
                                </li>
                                <li
                                    className="postBottomLikeDetailItem"
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
                                        className="postBottomLikeDetailImg"
                                    />
                                </li>
                                <li
                                    className="postBottomLikeDetailItem"
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
                                        className="postBottomLikeDetailImg"
                                    />
                                </li>
                                <li
                                    className="postBottomLikeDetailItem"
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
                                        className="postBottomLikeDetailImg"
                                    />
                                </li>
                                <li
                                    className="postBottomLikeDetailItem"
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
                                        className="postBottomLikeDetailImg"
                                    />
                                </li>
                                <li
                                    className="postBottomLikeDetailItem"
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

            <div className="postCommentWrap">
                <hr className="postHr" />
                <Comment
                    post={post}
                    setTotalComment={setTotalComment}
                    totalComment={totalComment}
                />
            </div>
        </div>
    );
}

export default Post;

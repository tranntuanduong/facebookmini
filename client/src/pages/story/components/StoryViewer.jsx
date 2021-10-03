import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import axios from 'axios';
import { PropTypes } from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { format } from 'timeago.js';
import { NO_AVARTAR, PF } from '../../../constants';
import ProgressTimeOut from './ProgressTimeOut';
import StoryAction from './StoryAction';

StoryViewer.propTypes = {
    changeStoryIndex: PropTypes.func,
};

function StoryViewer(props) {
    const {
        storyViewer,
        showStoryIndex,
        pauseFlagBtn,
        pauseFlagMouse,
        storyAuthor,
        changeStoryIndex,
        currentUser,
        firstStory,
        lastStory,
    } = props;

    const [reaction, setReaction] = useState({});
    const saveLikeTimeOut = useRef();

    const mouseMoveHandler = () => {
        if (pauseFlagBtn.current) return; /*cancel mouse event when click btn pause */

        pauseFlagMouse.current = false;
    };

    const mouseOutHandler = () => {
        if (pauseFlagBtn.current) return; /*cancel mouse event when click btn pause */

        pauseFlagMouse.current = true;
    };

    const changeStoryIndexHandler = (number) => {
        if (!changeStoryIndex) return;

        changeStoryIndex(number);
    };

    // update viewerIds in DB
    useEffect(() => {
        (async () => {
            // update story viewerIds

            if (!storyViewer[showStoryIndex]?.viewerIds.includes(currentUser._id)) {
                await axios.put(`/stories/${storyViewer[showStoryIndex]?._id}/viewer`, {
                    userId: currentUser._id,
                });
            }
        })();
    }, [storyViewer, showStoryIndex, currentUser]);

    const chooseLikeTypeHandler = (data) => {
        // get only 5 reactions
        const newReaction = data.type;
        let saveReaction;
        if (Object.keys(reaction).length === 0) {
            saveReaction = { userId: currentUser._id, type: [data.type] };
            setReaction(saveReaction);
        } else {
            if (reaction?.type.length < 5) {
                saveReaction = {
                    userId: reaction.userId,
                    type: [...reaction.type, newReaction],
                };
                setReaction(saveReaction);
            } else {
                const [firstReaction, ...ortherReaction] = reaction.type;

                saveReaction = {
                    userId: reaction.userId,
                    type: [...ortherReaction, newReaction],
                };
                setReaction(saveReaction);
            }
        }

        // use debounce technique to update like for story
        clearTimeout(saveLikeTimeOut.current);

        saveLikeTimeOut.current = setTimeout(() => {
            (async () => {
                await axios.put(`/stories/${storyViewer[showStoryIndex]._id}/likes`, saveReaction);
            })();
        }, 1500);
    };

    useEffect(() => {
        const myReaction = storyViewer[showStoryIndex]?.likeIds.find(
            (like) => like?.userId === currentUser._id
        );

        if (myReaction) {
            setReaction(myReaction);
        } else {
            setReaction({});
        }
    }, [currentUser, showStoryIndex, storyViewer]);

    return (
        <div
            className="storyViewerWrap"
            onMouseMove={mouseMoveHandler}
            onMouseOut={mouseOutHandler}
        >
            <div
                className="storyItem"
                style={{ background: storyViewer[showStoryIndex]?.style?.background }}
                onMouseMove={mouseMoveHandler}
                onMouseOut={mouseOutHandler}
            >
                <ProgressTimeOut
                    storyViewer={storyViewer}
                    showStoryIndex={showStoryIndex}
                    pauseFlagMouse={pauseFlagMouse}
                />

                <div className="storyItemWrap">
                    <div className="storyItemUser">
                        <img
                            src={`${PF}/${
                                storyAuthor.avatar ? `person/${storyAuthor.avatar}` : NO_AVARTAR
                            }`}
                            alt=""
                            className="storyItemUserAvatar"
                        />
                        <div className="storyItemUserText">
                            <div className="storyItemTextTop">
                                <div className="storyItemTextTopUsername">{`${storyAuthor.firstName} ${storyAuthor.lastName}`}</div>
                                <div className="storyItemTextTopText">
                                    {format(storyViewer[showStoryIndex]?.createdAt)}
                                </div>
                            </div>
                            <div className="storyItemTextBottm">Cavendish music</div>
                        </div>
                    </div>
                    <StoryAction pauseFlagBtn={pauseFlagBtn} pauseFlagMouse={pauseFlagMouse} />
                </div>
                {firstStory?._id !== storyViewer[showStoryIndex]?._id && (
                    <div id="storyPrevBtn" onClick={() => changeStoryIndexHandler(-1)}>
                        <KeyboardArrowLeftIcon style={{ fontSize: 'inherit' }} />
                    </div>
                )}
                {lastStory?._id !== storyViewer[showStoryIndex]?._id && (
                    <div id="storyNextBtn" onClick={() => changeStoryIndexHandler(1)}>
                        <KeyboardArrowRightIcon style={{ fontSize: 'inherit' }} />
                    </div>
                )}
                <div className="myReaction">
                    {Object.keys(reaction).length !== 0 && (
                        <>
                            <ul className="myReactionIconList">
                                {reaction.type.map((reactionType, index) => (
                                    <li key={index} className="myReactionIconItem">
                                        <img
                                            src={`/assets/feed/${reactionType}.svg`}
                                            alt=""
                                            className="myReactionIconItem"
                                        />
                                    </li>
                                ))}
                            </ul>
                            {storyAuthor._id === currentUser._id ? (
                                <div className="myReactionText">
                                    Bạn tự thả tim chính mình 🙂 ???
                                </div>
                            ) : (
                                <div className="myReactionText">
                                    Đã gửi cho {storyAuthor.firstName} {storyAuthor.lastName}
                                </div>
                            )}
                        </>
                    )}
                </div>
                <div className="storyItemContent">{storyViewer[showStoryIndex]?.desc}</div>
            </div>

            <div className="storyItemBottom">
                <div className="storyItemChat">
                    <input type="text" placeholder="Trả lời..." className="storyItemChatInput" />
                    <div
                        className="storyItemChatIcon"
                        style={{
                            backgroundImage: `url("/assets/story/1.png")`,
                            backgroundPosition: '0 -21px',
                        }}
                    ></div>
                </div>
                <ul className="storyItemLikes">
                    <li
                        className="storyItemLike"
                        onClick={() =>
                            chooseLikeTypeHandler({
                                type: 'like',
                                text: 'Thích',
                                styleColor: 'rgb(247, 177, 37)',
                            })
                        }
                    >
                        <div className="storyItemLikeDesc">Thích</div>
                        <img src="/assets/feed/like.svg" alt="" className="storyItemLikeImg" />
                    </li>
                    <li
                        className="storyItemLike"
                        onClick={() =>
                            chooseLikeTypeHandler({
                                type: 'heart',
                                styleColor: 'rgb(247, 177, 37)',
                            })
                        }
                    >
                        <div className="storyItemLikeDesc">Yêu thích</div>
                        <img src="/assets/feed/heart.svg" alt="" className="storyItemLikeImg" />
                    </li>
                    <li
                        className="storyItemLike"
                        onClick={() =>
                            chooseLikeTypeHandler({
                                type: 'lovely',
                                styleColor: 'rgb(247, 177, 37)',
                            })
                        }
                    >
                        <div className="storyItemLikeDesc">Thương thương</div>
                        <img src="/assets/feed/lovely.svg" alt="" className="storyItemLikeImg" />
                    </li>
                    <li
                        className="storyItemLike"
                        onClick={() =>
                            chooseLikeTypeHandler({
                                type: 'haha',
                                styleColor: 'rgb(247, 177, 37)',
                            })
                        }
                    >
                        <div className="storyItemLikeDesc">Ha ha</div>
                        <img src="/assets/feed/haha.svg" alt="" className="storyItemLikeImg" />
                    </li>
                    <li
                        className="storyItemLike"
                        onClick={() =>
                            chooseLikeTypeHandler({
                                type: 'wow',
                                styleColor: 'rgb(247, 177, 37)',
                            })
                        }
                    >
                        <div className="storyItemLikeDesc">Woww</div>
                        <img src="/assets/feed/wow.svg" alt="" className="storyItemLikeImg" />
                    </li>
                    <li
                        className="storyItemLike"
                        onClick={() =>
                            chooseLikeTypeHandler({
                                type: 'angry',
                                styleColor: 'rgb(247, 177, 37)',
                            })
                        }
                    >
                        <div className="storyItemLikeDesc">Phẫn nộ</div>
                        <img src="/assets/feed/angry.svg" alt="" className="storyItemLikeImg" />
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default StoryViewer;

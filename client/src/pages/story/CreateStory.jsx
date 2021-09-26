import React, { useContext, useState } from 'react';
import StoryForm from '../../components/Story/StoryForm';
import './StoryPage.css';
import { AuthContext } from '../../context/AuthProvider';
import { NO_AVARTAR, PF } from '../../constants';

CreateStory.propTypes = {};

function CreateStory(props) {
    const { user: currentUser } = useContext(AuthContext);
    const [createStoryMode, setCreateStoryMode] = useState();
    const [text, setText] = useState('');
    const [background, setBackground] = useState(
        'linear-gradient(138deg, rgba(168,74,217,1) 0%, rgba(202,88,186,1) 55%, rgba(229,83,128,1) 100%)'
    );

    return (
        <div className="createStory">
            <div className="left">
                <div className="leftTop">
                    <div className="leftTitle">Tin của bạn</div>
                    <div className="leftUserInfo">
                        <img
                            src={`${PF}/${
                                currentUser.avatar ? `person/${currentUser.avatar}` : NO_AVARTAR
                            }`}
                            alt=""
                            className="leftUserInfoAvatar"
                        />
                        <div className="leftUserInfoName">{`${currentUser.firstName} ${currentUser.lastName}`}</div>
                    </div>
                </div>
                <hr className="leftTopHr" />
                <StoryForm
                    text={text}
                    setText={setText}
                    background={background}
                    setBackground={setBackground}
                    currentUser={currentUser}
                    createStoryMode={createStoryMode}
                    setCreateStoryMode={setCreateStoryMode}
                />
            </div>
            <div className="right">
                {createStoryMode === 'text' && (
                    <div className="createStoryPreviewWrap">
                        <div className="createStoryPreviewTitle">Xem trước</div>
                        <div className="createStoryPreviewBody">
                            <div
                                className="createStoryPreviewBodyBg"
                                style={{ background: background }}
                            >
                                <div className="createStoryPreviewBodyText">
                                    {text ? text : 'Bắt đầu nhập...'}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {!createStoryMode && (
                    <>
                        <div
                            className="rightCreateItemWrap gradient1"
                            onClick={() => setCreateStoryMode('img')}
                        >
                            <div className="rightCreateItemIcon">
                                <div
                                    className="rightCreateItemIconBg"
                                    style={{
                                        backgroundImage: `url("/assets/feed/imgAction.png")`,
                                        backgroundPosition: '0 -434px',
                                    }}
                                ></div>
                            </div>
                            <div className="rightCreateItemText">Tạo tin ảnh</div>
                        </div>
                        <div
                            className="rightCreateItemWrap gradient2"
                            onClick={() => setCreateStoryMode('text')}
                        >
                            <div className="rightCreateItemIcon">
                                <div
                                    className="rightCreateItemIconBg"
                                    style={{
                                        backgroundImage: `url("/assets/feed/imgAction.png")`,
                                        backgroundPosition: '0 -498px',
                                    }}
                                ></div>
                            </div>
                            <div className="rightCreateItemText">Tạo tin dạng văn bản</div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default CreateStory;

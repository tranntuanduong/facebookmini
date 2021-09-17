import React from 'react';
import './Share.css';

Share.propTypes = {};

function Share(props) {
    return (
        <div className="share">
            <div className="shareTop">
                <img src="./assets/person/7.jpeg" alt="" className="shareTopImg" />
                <input
                    type="text"
                    placeholder="Dương ơi, bạn đang nghĩ gì thế?"
                    className="shareTopInput"
                />
            </div>
            <div className="shareBottom">
                <div className="shareBottomAction">
                    <div
                        className="shareBottomActionItemBg"
                        style={{
                            backgroundImage: `url("/assets/feed/imgAction.png")`,
                            backgroundPosition: '0 0',
                        }}
                    ></div>
                    <span className="shareBottomActionItemText">Video trực tiếp</span>
                </div>
                <div className="shareBottomAction">
                    <div
                        className="shareBottomActionItemBg"
                        style={{
                            backgroundImage: `url("/assets/feed/imgAction.png")`,
                            backgroundPosition: '0 -275px',
                        }}
                    ></div>
                    <span className="shareBottomActionItemText">Ảnh/Video</span>
                </div>
                <div className="shareBottomAction">
                    <div
                        className="shareBottomActionItemBg"
                        style={{
                            backgroundImage: `url("/assets/feed/imgAction.png")`,
                            backgroundPosition: '0 -50px',
                        }}
                    ></div>
                    <span className="shareBottomActionItemText">Cảm xúc/Hoạt động</span>
                </div>
            </div>
        </div>
    );
}

export default Share;

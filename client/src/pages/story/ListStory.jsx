import React from 'react';
import PropTypes from 'prop-types';

ListStory.propTypes = {};

function ListStory(props) {
    return (
        <div className="stories">
            <div className="left">
                <div className="storyLeftTop">
                    <div className="storyLeftTopTitle">Tin</div>
                </div>
                <div className="storySubTitle">Tin của bạn</div>
                <div className="storyUser">
                    <div className="storyUserInfo">
                        <img src="/assets/ad.png" alt="" className="storyUserInfoAvatar" />
                        <div className="storyUserInfoText">
                            <div className="storyUserInfoTextUsername">Nam vu</div>
                            <div className="storyUserInfoTextTime">7 phút</div>
                        </div>
                    </div>
                    <div className="storyUserBtn">+</div>
                </div>
                <div className="storySubTitle">Tất cả tin</div>
                <div className="storyUser">
                    <div className="storyUserInfo">
                        <img src="/assets/ad.png" alt="" className="storyUserInfoAvatar" />
                        <div className="storyUserInfoText">
                            <div className="storyUserInfoTextUsername">Nam vu</div>
                            <div className="storyUserInfoTextTime">7 phút</div>
                        </div>
                    </div>
                </div>
                <div className="storyUser">
                    <div className="storyUserInfo">
                        <img src="/assets/ad.png" alt="" className="storyUserInfoAvatar" />
                        <div className="storyUserInfoText">
                            <div className="storyUserInfoTextUsername">Nam vu</div>
                            <div className="storyUserInfoTextTime">7 phút</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="right">
                <div className="storyItem">
                    <div className="storyItemUser">
                        <img src="/assets/ad.png" alt="" className="storyItemUserAvatar" />
                        <div className="storyItemUserText">
                            <div className="storyItemTextTop">
                                <div className="storyItemTextTopUsername">Trần Tuấn Dương</div>
                                <div className="storyItemTextTopText">16 phút</div>
                            </div>
                            <div className="storyItemTextBottm">Cavendish music</div>
                        </div>
                    </div>
                    <div className="storyItemContent">
                        Chiều nay không có mưa rơi ướt trên đôi bờ vai, chiều nay
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListStory;

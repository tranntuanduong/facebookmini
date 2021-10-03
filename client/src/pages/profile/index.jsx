import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CreateIcon from '@mui/icons-material/Create';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Post from '../../components/Post';
import Share from '../../components/Share';
import { NO_AVARTAR, PF } from '../../constants';
import { AuthContext } from '../../context/AuthProvider';
import { sortDateUtils } from '../../utils/utils';
import './Profile.css';

Profile.propTypes = {};

function Profile(props) {
    const { user: currentUser } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await axios.get(`/posts/${currentUser._id}/me`);
            setPosts(sortDateUtils(res.data));
        })();
    }, [currentUser]);

    // useEffect(() => {
    //     document.addEventListener('scroll', function (e) {
    //         console.log(window.scrollY);
    //     });
    // }, []);
    // useEffect(() => {
    //     setHeight(heightRef.current.offsetTop);
    //     console.log(heightRef.current.offsetTop);
    // }, [heightRef]);

    return (
        <div className="profile">
            <div className="profileTopBg1"></div>
            <div className="profileTopBg2"></div>

            <div className="profileTop">
                <img src={`${PF}/coverImg/cover1.jpeg`} alt="" className="profileTopCoverImg" />
                <div className="profileTopWrap">
                    <div className="profileTopAvatar">
                        <img
                            src={`${PF}/${
                                currentUser.avatar ? `person/${currentUser.avatar}` : NO_AVARTAR
                            }`}
                            alt=""
                            className="profileTopAvatarImg"
                        />
                        <div className="profileTopChangeAvatarBtn">
                            <div
                                className="profileTopAvatarIcon"
                                style={{
                                    backgroundImage: `url(./assets/profile/1.png)`,
                                    backgroundPosition: '0px -452px',
                                }}
                            ></div>
                        </div>
                    </div>
                    <div className="profileTopInfo">
                        <div className="profileTopInfoName">{`${currentUser.firstName} ${currentUser.lastName}`}</div>
                        <div className="profileTopInfoDesc">(xxx-xxx-xxx)</div>
                    </div>
                    <hr className="profileTopHr" />
                </div>
            </div>
            <div className="profileBottom">
                <ul className="profileBottomNav">
                    <li className="profileBottomNavItem active">Bài viết</li>
                    <li className="profileBottomNavItem">Giới thiệu</li>
                    <li className="profileBottomNavItem">Bạn bè 545</li>
                    <li className="profileBottomNavItem">Ảnh</li>
                    <li className="profileBottomNavItem">
                        Xem thêm <ArrowDropDownIcon style={{ fontSize: 'inherit' }} />
                    </li>
                </ul>
                <ul className="profileBottomAction">
                    <li className="profileBottomActionItem profileBottomAction primaryColor">
                        <AddCircleOutlineIcon style={{ fontSize: 'inherit' }} />
                        <div className="profileBottomActionItemText">Thêm vào tin</div>
                    </li>
                    <li className="profileBottomActionItem">
                        <CreateIcon style={{ fontSize: 'inherit' }} />

                        <div className="profileBottomActionItemText">Chỉnh sửa trang cá nhân</div>
                    </li>

                    <li className="profileBottomActionItem">
                        <MoreHorizIcon style={{ fontSize: 'inherit' }} />
                    </li>
                </ul>
            </div>
            <div className="profileMain">
                <div className="profileMainLeft">
                    <div className="mainIntroduce">
                        <div className="mainIntroduceTitle">Giới thiệu</div>
                        <ul className="mainIntroduceList">
                            <li className="mainIntroduceItem">
                                <img
                                    src="./assets/profile/bagIcon.png"
                                    alt=""
                                    className="mainIntroduceItemBadge"
                                />
                                <div className="mainIntroduceItemText">
                                    Đã tốt nghiệp tại THPT Sơn Thịnh
                                </div>
                            </li>
                            <li className="mainIntroduceItem">
                                <img
                                    src="./assets/profile/bagIcon.png"
                                    alt=""
                                    className="mainIntroduceItemBadge"
                                />
                                <div className="mainIntroduceItemText">
                                    sinh viên tại Đại học Bách khoa Hà Nội - Hanoi University of
                                    Science and Technology
                                </div>
                            </li>
                            <li className="mainIntroduceItem">
                                <img
                                    src="./assets/profile/homeIcon.png"
                                    alt=""
                                    className="mainIntroduceItemBadge"
                                />
                                <div className="mainIntroduceItemText">Sống tại Yên Bái</div>
                            </li>
                            <li className="mainIntroduceItem">
                                <img
                                    src="./assets/profile/heartIcon.png"
                                    alt=""
                                    className="mainIntroduceItemBadge"
                                />
                                <div className="mainIntroduceItemText">Hẹn hò</div>
                            </li>
                            <li className="mainIntroduceItem">
                                <img
                                    src="./assets/profile/clockIcon.png"
                                    alt=""
                                    className="mainIntroduceItemBadge"
                                />
                                <div className="mainIntroduceItemText">
                                    Tham gia vào Tháng 6 năm 2016
                                </div>
                            </li>
                        </ul>
                        <div className="mainIntroduceBtn">Chỉnh sửa chi tiết</div>
                    </div>

                    <div className="mainFriend">
                        <div className="mainFriendTop">
                            <div className="mainFriendTopTitle">Bạn bè</div>
                            <div className="mainFriendTopLink">Xem tất cả bạn bè</div>
                        </div>
                        <div className="mainFriendInfo">545 người bạn</div>
                        <ul className="mainFriendList">
                            <li className="mainFriendItem">
                                <img src="./assets/ad.png" alt="" className="mainFriendItemImg" />
                                <div className="mainFriendItemName">Phương thảo</div>
                            </li>
                            <li className="mainFriendItem">
                                <img src="./assets/ad.png" alt="" className="mainFriendItemImg" />
                                <div className="mainFriendItemName">Phương thảo</div>
                            </li>
                            <li className="mainFriendItem">
                                <img src="./assets/ad.png" alt="" className="mainFriendItemImg" />
                                <div className="mainFriendItemName">Phương thảo</div>
                            </li>
                            <li className="mainFriendItem">
                                <img src="./assets/ad.png" alt="" className="mainFriendItemImg" />
                                <div className="mainFriendItemName">Phương thảo</div>
                            </li>
                            <li className="mainFriendItem">
                                <img src="./assets/ad.png" alt="" className="mainFriendItemImg" />
                                <div className="mainFriendItemName">Phương thảo</div>
                            </li>
                            <li className="mainFriendItem">
                                <img src="./assets/ad.png" alt="" className="mainFriendItemImg" />
                                <div className="mainFriendItemName">Phương thảo</div>
                            </li>
                            <li className="mainFriendItem">
                                <img src="./assets/ad.png" alt="" className="mainFriendItemImg" />
                                <div className="mainFriendItemName">Phương thảo</div>
                            </li>
                            <li className="mainFriendItem">
                                <img src="./assets/ad.png" alt="" className="mainFriendItemImg" />
                                <div className="mainFriendItemName">Phương thảo</div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="profileMainRight">
                    <Share currentUser={currentUser} />
                    {posts.map((post) => (
                        <Post key={post._id} post={post} currentUser={currentUser} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Profile;

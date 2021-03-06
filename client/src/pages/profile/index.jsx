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
                    <li className="profileBottomNavItem active">B??i vi???t</li>
                    <li className="profileBottomNavItem">Gi???i thi???u</li>
                    <li className="profileBottomNavItem">B???n b?? 545</li>
                    <li className="profileBottomNavItem">???nh</li>
                    <li className="profileBottomNavItem">
                        Xem th??m <ArrowDropDownIcon style={{ fontSize: 'inherit' }} />
                    </li>
                </ul>
                <ul className="profileBottomAction">
                    <li className="profileBottomActionItem profileBottomAction primaryColor">
                        <AddCircleOutlineIcon style={{ fontSize: 'inherit' }} />
                        <div className="profileBottomActionItemText">Th??m v??o tin</div>
                    </li>
                    <li className="profileBottomActionItem">
                        <CreateIcon style={{ fontSize: 'inherit' }} />

                        <div className="profileBottomActionItemText">Ch???nh s???a trang c?? nh??n</div>
                    </li>

                    <li className="profileBottomActionItem">
                        <MoreHorizIcon style={{ fontSize: 'inherit' }} />
                    </li>
                </ul>
            </div>
            <div className="profileMain">
                <div className="profileMainLeft">
                    <div className="mainIntroduce">
                        <div className="mainIntroduceTitle">Gi???i thi???u</div>
                        <ul className="mainIntroduceList">
                            <li className="mainIntroduceItem">
                                <img
                                    src="./assets/profile/bagIcon.png"
                                    alt=""
                                    className="mainIntroduceItemBadge"
                                />
                                <div className="mainIntroduceItemText">
                                    ???? t???t nghi???p t???i THPT S??n Th???nh
                                </div>
                            </li>
                            <li className="mainIntroduceItem">
                                <img
                                    src="./assets/profile/bagIcon.png"
                                    alt=""
                                    className="mainIntroduceItemBadge"
                                />
                                <div className="mainIntroduceItemText">
                                    sinh vi??n t???i ?????i h???c B??ch khoa H?? N???i - Hanoi University of
                                    Science and Technology
                                </div>
                            </li>
                            <li className="mainIntroduceItem">
                                <img
                                    src="./assets/profile/homeIcon.png"
                                    alt=""
                                    className="mainIntroduceItemBadge"
                                />
                                <div className="mainIntroduceItemText">S???ng t???i Y??n B??i</div>
                            </li>
                            <li className="mainIntroduceItem">
                                <img
                                    src="./assets/profile/heartIcon.png"
                                    alt=""
                                    className="mainIntroduceItemBadge"
                                />
                                <div className="mainIntroduceItemText">H???n h??</div>
                            </li>
                            <li className="mainIntroduceItem">
                                <img
                                    src="./assets/profile/clockIcon.png"
                                    alt=""
                                    className="mainIntroduceItemBadge"
                                />
                                <div className="mainIntroduceItemText">
                                    Tham gia v??o Th??ng 6 n??m 2016
                                </div>
                            </li>
                        </ul>
                        <div className="mainIntroduceBtn">Ch???nh s???a chi ti???t</div>
                    </div>

                    <div className="mainFriend">
                        <div className="mainFriendTop">
                            <div className="mainFriendTopTitle">B???n b??</div>
                            <div className="mainFriendTopLink">Xem t???t c??? b???n b??</div>
                        </div>
                        <div className="mainFriendInfo">545 ng?????i b???n</div>
                        <ul className="mainFriendList">
                            <li className="mainFriendItem">
                                <img src="./assets/ad.png" alt="" className="mainFriendItemImg" />
                                <div className="mainFriendItemName">Ph????ng th???o</div>
                            </li>
                            <li className="mainFriendItem">
                                <img src="./assets/ad.png" alt="" className="mainFriendItemImg" />
                                <div className="mainFriendItemName">Ph????ng th???o</div>
                            </li>
                            <li className="mainFriendItem">
                                <img src="./assets/ad.png" alt="" className="mainFriendItemImg" />
                                <div className="mainFriendItemName">Ph????ng th???o</div>
                            </li>
                            <li className="mainFriendItem">
                                <img src="./assets/ad.png" alt="" className="mainFriendItemImg" />
                                <div className="mainFriendItemName">Ph????ng th???o</div>
                            </li>
                            <li className="mainFriendItem">
                                <img src="./assets/ad.png" alt="" className="mainFriendItemImg" />
                                <div className="mainFriendItemName">Ph????ng th???o</div>
                            </li>
                            <li className="mainFriendItem">
                                <img src="./assets/ad.png" alt="" className="mainFriendItemImg" />
                                <div className="mainFriendItemName">Ph????ng th???o</div>
                            </li>
                            <li className="mainFriendItem">
                                <img src="./assets/ad.png" alt="" className="mainFriendItemImg" />
                                <div className="mainFriendItemName">Ph????ng th???o</div>
                            </li>
                            <li className="mainFriendItem">
                                <img src="./assets/ad.png" alt="" className="mainFriendItemImg" />
                                <div className="mainFriendItemName">Ph????ng th???o</div>
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

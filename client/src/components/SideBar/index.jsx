import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import React, { useContext } from 'react';
import { NO_AVARTAR, PF } from '../../constants';
import { AuthContext } from '../../context/AuthProvider';
import './SideBar.css';

SideBar.propTypes = {};

function SideBar({ currentUser }) {
    return (
        <div className="sideBar">
            <ul className="sideBarList mt16">
                <li className="sideBarItem">
                    <img
                        src={`${PF}/${currentUser.avatar ? currentUser.avatar : NO_AVARTAR}`}
                        alt=""
                        className="sideBarItemImg"
                    />
                    <div className="sideBarItemText">
                        <span className="sideBarItemName">Trần Tuấn Dương</span>
                    </div>
                </li>
                <li className="sideBarItem">
                    <img src="./assets/sidebar/friend.png" alt="" className="sideBarItemBadge" />
                    <div className="sideBarItemText">
                        <span className="sideBarItemName">Bạn bè</span>
                        <span className="sideBarItemInfo">3 Bạn mới</span>
                    </div>
                </li>
                <li className="sideBarItem">
                    <img src="./assets/sidebar/group.png" alt="" className="sideBarItemBadge" />
                    <div className="sideBarItemText">
                        <span className="sideBarItemName">Nhóm</span>
                        <span className="sideBarItemInfo">9+ dấu trang mới</span>
                    </div>
                </li>
                <li className="sideBarItem">
                    <img src="./assets/sidebar/store.png" alt="" className="sideBarItemBadge" />
                    <div className="sideBarItemText">
                        <span className="sideBarItemName">Marketplace</span>
                    </div>
                </li>
                <li className="sideBarItem">
                    <img src="./assets/sidebar/flag.png" alt="" className="sideBarItemBadge" />
                    <div className="sideBarItemText">
                        <span className="sideBarItemName">Trang</span>
                    </div>
                </li>
                <li className="sideBarItem">
                    <img src="./assets/sidebar/video.png" alt="" className="sideBarItemBadge" />
                    <div className="sideBarItemText">
                        <span className="sideBarItemName">Watch</span>
                        <span className="sideBarItemInfo">7 Video mới</span>
                    </div>
                </li>
                <li className="sideBarItem">
                    <KeyboardArrowDownIcon className="sideBarItemIcon" />
                    <div className="sideBarItemText">
                        <span className="sideBarItemName">Xem thêm</span>
                    </div>
                </li>
            </ul>

            <hr className="sideBarHr" />

            <div className="shortcutsTitle">
                <span className="shortcutsTitleText">Lối tắt của bạn</span>
                <div className="shortcutsTitleAction">Chỉnh sửa</div>
            </div>
            <ul className="sideBarList">
                <li className="shortcuts">
                    <img src="./assets/person/1.jpeg" alt="" className="shortcutsImg" />
                    <div className="shortcutsText">
                        <span className="shortcutsName">Trần Tuấn Dương</span>
                    </div>
                </li>
                <li className="shortcuts">
                    <img src="./assets/person/7.jpeg" alt="" className="shortcutsImg" />
                    <div className="shortcutsText">
                        <span className="shortcutsName">Lama Dev</span>
                    </div>
                </li>
                <li className="shortcuts">
                    <img src="./assets/person/3.jpeg" alt="" className="shortcutsImg" />
                    <div className="shortcutsText">
                        <span className="shortcutsName">Chợ Định Công</span>
                    </div>
                </li>
                <li className="shortcuts">
                    <img src="./assets/person/2.jpeg" alt="" className="shortcutsImg" />
                    <div className="shortcutsText">
                        <span className="shortcutsName">Lập nghiệp với Shopee</span>
                    </div>
                </li>
                <li className="shortcuts">
                    <img src="./assets/person/1.jpeg" alt="" className="shortcutsImg" />
                    <div className="shortcutsText">
                        <span className="shortcutsName">CANVA - Thiết Kế Dễ Như Chơi</span>
                    </div>
                </li>

                {/* TEST */}
                <li className="shortcuts">
                    <img src="./assets/person/1.jpeg" alt="" className="shortcutsImg" />
                    <div className="shortcutsText">
                        <span className="shortcutsName">Trần Tuấn Dương</span>
                    </div>
                </li>
                <li className="shortcuts">
                    <img src="./assets/person/7.jpeg" alt="" className="shortcutsImg" />
                    <div className="shortcutsText">
                        <span className="shortcutsName">Lama Dev</span>
                    </div>
                </li>
                <li className="shortcuts">
                    <img src="./assets/person/3.jpeg" alt="" className="shortcutsImg" />
                    <div className="shortcutsText">
                        <span className="shortcutsName">Chợ Định Công</span>
                    </div>
                </li>
                <li className="shortcuts">
                    <img src="./assets/person/2.jpeg" alt="" className="shortcutsImg" />
                    <div className="shortcutsText">
                        <span className="shortcutsName">Lập nghiệp với Shopee</span>
                    </div>
                </li>
                <li className="shortcuts">
                    <img src="./assets/person/1.jpeg" alt="" className="shortcutsImg" />
                    <div className="shortcutsText">
                        <span className="shortcutsName">CANVA - Thiết Kế Dễ Như Chơi</span>
                    </div>
                </li>

                <li className="shortcuts">
                    <img src="./assets/person/1.jpeg" alt="" className="shortcutsImg" />
                    <div className="shortcutsText">
                        <span className="shortcutsName">Trần Tuấn Dương</span>
                    </div>
                </li>
                <li className="shortcuts">
                    <img src="./assets/person/7.jpeg" alt="" className="shortcutsImg" />
                    <div className="shortcutsText">
                        <span className="shortcutsName">Lama Dev</span>
                    </div>
                </li>
                <li className="shortcuts">
                    <img src="./assets/person/3.jpeg" alt="" className="shortcutsImg" />
                    <div className="shortcutsText">
                        <span className="shortcutsName">Chợ Định Công</span>
                    </div>
                </li>
                <li className="shortcuts">
                    <img src="./assets/person/2.jpeg" alt="" className="shortcutsImg" />
                    <div className="shortcutsText">
                        <span className="shortcutsName">Lập nghiệp với Shopee</span>
                    </div>
                </li>
                <li className="shortcuts">
                    <img src="./assets/person/1.jpeg" alt="" className="shortcutsImg" />
                    <div className="shortcutsText">
                        <span className="shortcutsName">CANVA - Thiết Kế Dễ Như Chơi</span>
                    </div>
                </li>
                <li className="sideBarItem">
                    <KeyboardArrowDownIcon className="sideBarItemIcon" />
                    <div className="sideBarItemText">
                        <span className="sideBarItemName">Ẩn bớt</span>
                    </div>
                </li>
            </ul>
            <div className="sideBarPolicies">
                <a href="/">Quyền riêng tư</a> · <a href="/">Điều khoản</a> ·<a href="/">Quảng cáo</a> ·{' '}
                <a href="/">Lựa chọn quảng cáo</a> ·<a href="/">Cookie</a> · <a href="/">Xem thêm</a> ·
                <a href="/">Facebook © 2021</a>
            </div>
        </div>
    );
}

export default SideBar;

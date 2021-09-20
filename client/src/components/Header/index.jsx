import React, { useContext } from 'react';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import StorefrontIcon from '@material-ui/icons/Storefront';
import GroupIcon from '@material-ui/icons/Group';
import GamesIcon from '@material-ui/icons/Games';
import AppsIcon from '@material-ui/icons/Apps';
import MessageIcon from '@material-ui/icons/Message';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { AuthContext } from '../../context/AuthProvider';
import { NO_AVARTAR, PF } from '../../constants';
Header.propTypes = {};

function Header(props) {
    const { user: currentUser } = useContext(AuthContext);
    console.log(`${PF}/${currentUser.avatar ? currentUser.avatar : 'person/noAvatar.png'}`);
    return (
        <div className="header">
            <div className="headerLeft">
                <img src="./assets/logo.png" alt="" className="headerLeftIcon" />
                <div className="headerLeftInput">
                    <SearchIcon className="headerLeftInputIcon" />
                    <input type="text" placeholder="Tìm kiếm trên facebook" />
                </div>
            </div>
            <ul className="headerLeftMiddle">
                <li className="headerLeftMiddleItem headerLeftMiddleItemActive">
                    <HomeIcon style={{ fontSize: 'inherit' }} />
                </li>
                <li className="headerLeftMiddleItem">
                    <VideoLibraryIcon style={{ fontSize: 'inherit' }} />
                    <span className="headerLeftMiddleItemBadge">4</span>
                </li>
                <li className="headerLeftMiddleItem">
                    <StorefrontIcon style={{ fontSize: 'inherit' }} />
                </li>
                <li className="headerLeftMiddleItem">
                    <GroupIcon style={{ fontSize: 'inherit' }} />
                    <span className="headerLeftMiddleItemBadge">3</span>
                </li>
                <li className="headerLeftMiddleItem">
                    <GamesIcon style={{ fontSize: 'inherit' }} />
                    <span className="headerLeftMiddleItemBadgePlus">9+</span>
                </li>
            </ul>
            <ul className="headerLeftRight">
                <li className="headerLeftRightUser">
                    <img src={`${PF}/${currentUser.avatar ? currentUser.avatar : NO_AVARTAR}`} alt="" />
                    <span className="headerLeftRightUsername">{currentUser.lastName}</span>
                </li>
                <li className="headerLeftRightInfo">
                    <AppsIcon />
                </li>
                <li className="headerLeftRightInfo">
                    <MessageIcon />
                </li>
                <li className="headerLeftRightInfo">
                    <NotificationsIcon />
                </li>
                <li className="headerLeftRightInfo">
                    <ArrowDropDownIcon />
                </li>
            </ul>
        </div>
    );
}

export default Header;

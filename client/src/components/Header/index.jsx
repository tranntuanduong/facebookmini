import AppsIcon from '@material-ui/icons/Apps';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import GamesIcon from '@material-ui/icons/Games';
import GroupIcon from '@material-ui/icons/Group';
import HomeIcon from '@material-ui/icons/Home';
import MessageIcon from '@material-ui/icons/Message';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';
import StorefrontIcon from '@material-ui/icons/Storefront';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { NO_AVARTAR, PF } from '../../constants';
import { AuthContext } from '../../context/AuthProvider';
import './Header.css';
Header.propTypes = {};

function Header(props) {
    const { user: currentUser } = useContext(AuthContext);

    return (
        <div className="header">
            <div className="headerLeft">
                <Link to="/">
                    <img src="/assets/logo.png" alt="" className="headerLeftIcon" />
                </Link>
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
                    <Link to={`/profile`} className="headerLeftRightUserLink">
                        <img
                            src={`${PF}/${
                                currentUser.avatar ? `person/${currentUser.avatar}` : NO_AVARTAR
                            }`}
                            alt=""
                        />
                        <span className="headerLeftRightUsername">{currentUser.lastName}</span>
                    </Link>
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

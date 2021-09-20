import React, { useContext } from 'react';
import Feed from '../../components/Feed';
import Header from '../../components/Header';
import RightBar from '../../components/RightBar';
import SideBar from '../../components/SideBar';
import { AuthContext } from '../../context/AuthProvider';
import './Home.css';

Home.propTypes = {};

function Home(props) {
    const { user: currentUser } = useContext(AuthContext);
    return (
        <div>
            <Header />
            <div className="container">
                <div className="homePage">
                    <div className="cLeft">
                        <SideBar currentUser={currentUser} />
                    </div>
                    <div className="cMiddle">
                        <Feed currentUser={currentUser} />
                    </div>
                    <div className="cRight">
                        <RightBar currentUser={currentUser} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;

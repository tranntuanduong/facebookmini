import React from 'react';
import Feed from '../../components/Feed';
import Header from '../../components/Header';
import RightBar from '../../components/RightBar';
import SideBar from '../../components/SideBar';
import './Home.css';

Home.propTypes = {};

function Home(props) {
    return (
        <div>
            <Header />
            <div className="container">
                <div className="homePage">
                    <div className="cLeft">
                        <SideBar />
                    </div>
                    <div className="cMiddle">
                        <Feed />
                    </div>
                    <div className="cRight">
                        <RightBar />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;

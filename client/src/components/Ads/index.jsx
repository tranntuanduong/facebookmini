import React from 'react';
import './Ads.css';

Ads.propTypes = {};

function Ads(props) {
    return (
        <div className="ads">
            <div className="adsTitle">Được tài trợ</div>
            <ul className="adsList">
                <li className="adsItem">
                    <a rel="noreferrer" target="_blank" href="https://timviecnhanh.com/">
                        <img src="./assets/ads/timviecnhanh.jpg" alt="" className="adsItemImg" />
                        <div className="adsItemContent">
                            <div className="adsItemContentHeader">Tìm việc nhanh</div>
                            <span className="adsItemContentDonors">timviecnhanh.com</span>
                        </div>
                    </a>
                </li>
                <li className="adsItem">
                    <a rel="noreferrer" target="_blank" href="https://timviecnhanh.com/">
                        <img src="./assets/ads/gearvn.jpg" alt="" className="adsItemImg" />
                        <div className="adsItemContent">
                            <div className="adsItemContentHeader">Cẩm nang về GEAR</div>
                            <span className="adsItemContentDonors">gearvn.com</span>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default Ads;

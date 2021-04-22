import React from 'react';
import './css/Header.css';
import ForexLogo from '../img/forexLogo.png';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';

const Header = () => {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="brand_box">
                        <h1 className="brand_name_logo">
                            <img src={ForexLogo} loading="lazy" alt="Forex Calculator" />
                            <span>Forex Calculator</span>
                        </h1>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
import React from "react";
import location from "../../assets/location.svg";
import "./MainPageContent.css";

const MainPageContent = () => {
    return(
        <div className="main-page-content-form">
                <header className="main-page-content-header">
                    <div className="logo">
                        Need for drive
                    </div>
                    <div className="location">
                        <div className="location-image" style={{backgroundImage: `url(${location})`}}></div>
                        Ульяновск
                    </div>
                </header>
                <div className="main-page-content">
                    <div className="carsharing-text">
                        Каршеринг
                    </div>
                    <div className="big-logo">
                        Need for drive
                    </div>
                    <div className="purpose">
                        Поминутная аренда авто твоего города
                    </div>
                    <button className="order-btn-form">
                        Забронировать
                    </button>
                </div>
                <footer className="main-page-content-footer">
                    <div className="cop-mark">
                        © 2016-2019 «Need for drive»
                    </div>
                    <a className="support-phone">
                        8 (495) 234-22-44
                    </a>
                </footer>
        </div>
    )
}

export default MainPageContent;
import React from "react";
import Header from "../../../Components/Header/Header";
import { useHistory } from "react-router-dom";
import "./MainPageContent.css";

const MainPageContent = () => {
    const history = useHistory()

    const linkHandler = () => {
        history.push("order-page/location")
    }

    return(
        <div className="main-page-content-form">
                <Header />
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
                    <button className="order-btn-form" onClick={() => linkHandler()}>
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
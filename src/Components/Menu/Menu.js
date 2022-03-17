import React from "react";
import exit from "../../assets/exit.svg";
import { ReactSVG } from "react-svg";
import facebook from "../../assets/facebook.svg";
import instagram from "../../assets/instagram.svg";
import telegram from "../../assets/telegram.svg"
import "./Menu.css";

const Menu = ({setIsOpened, isOpened}) => {

    const closeMenuHandler = () => {
        setIsOpened(false)
    }
    return(
        <div className={isOpened ? "menu-form" : "menu-form-closed"}>
            <div className={isOpened ? "menu-content-side" : "menu-content-side-closed"}>
                <div className="exit-btn" style={{backgroundImage: `url(${exit})`}} onClick={() => closeMenuHandler()}>
                </div>
                <div className="menu-content-form">
                    <div href="" className="menu-content">Парковка</div>
                    <div href="" className="menu-content">Страховка</div>
                    <div href="" className="menu-content">Бензин</div>
                    <div href="" className="menu-content">Обслуживание</div>
                </div>
                <div className="media-icons">
                    <ReactSVG src={telegram} className="media-icon"/>
                    <ReactSVG src={facebook} className="media-icon"/>
                    <ReactSVG src={instagram} className="media-icon"/>
                </div>
            </div>
            <div className={isOpened ? "menu-transparent-side" : "menu-transparent-side-closed"}></div>
        </div>
    )
}


export default Menu;
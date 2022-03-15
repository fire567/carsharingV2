import React from "react";
import exit from "../../assets/exit.svg";
import { ReactSVG } from "react-svg";
import facebook from "../../assets/facebook.svg";
import instagram from "../../assets/instagram.svg";
import telegram from "../../assets/telegram.svg"
import { switchMenu } from "../../actions";
import { connect } from "react-redux";
import "./Menu.css";

const Menu = ({switchMenu, isMenuOpened}) => {

    const closeMenuHandler = () => {
        switchMenu(!isMenuOpened)
    }

    return(
        <div className={isMenuOpened === true ? "menu-form" : "menu-form-closed"}>
            <div className="menu-content-side">
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
            <div className="menu-transparent-side"></div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isMenuOpened: state.isMenuOpened,
    }
}

export default connect(mapStateToProps, {
    switchMenu: switchMenu,
})(Menu);
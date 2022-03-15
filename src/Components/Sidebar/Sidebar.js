import React from "react";
import { connect } from "react-redux";
import { setLanguage, switchMenu } from "../../actions";
import "./Sidebar.css";

const Sidebar = ({setLanguage, language, switchMenu, isMenuOpened}) => {

    const changeLanguageHandler = () => {
        setLanguage(!language)
    }

    const activeMenuHandler = () => {
        switchMenu(!isMenuOpened)
    }

    return(
        <>
            <div className="sidebar-form">
                <div className="burger-menu-btn" onClick={() => activeMenuHandler()}>
                    <div className="vector"></div>
                    <div className="vector"></div>
                    <div className="vector"></div>
                </div>
                <div className="change-language-form" onClick={() => changeLanguageHandler()}>
                    {language === true ? "Рус" : "Eng"}
                </div>
            </div>
            <div className="mobile-sidebar-form">
                <div className="mobile-burger-menu-btn" onClick={() => activeMenuHandler()}>
                    <div className="mobile-vector"></div>
                    <div className="mobile-vector"></div>
                    <div className="mobile-vector"></div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return{
        language: state.language,
        isMenuOpened: state.isMenuOpened,
    }
}

export default connect(mapStateToProps,
    {
        setLanguage: setLanguage,
        switchMenu: switchMenu,
    }
)(Sidebar);
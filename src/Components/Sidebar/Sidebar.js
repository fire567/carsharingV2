import React, {useState} from "react";
import "./Sidebar.css";

const Sidebar = ({setIsOpened}) => {
    const [language, setLanguage] = useState(true)

    const changeLanguageHandler = () => {
        setLanguage(!language)
    }

    const activeMenuHandler = () => {
        setIsOpened(true)
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

export default Sidebar;
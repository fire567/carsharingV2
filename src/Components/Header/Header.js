import React from "react";
import { useHistory } from "react-router-dom";
import location from "../../assets/location.svg";
import "./Header.css";

const Header = () => {
    const history = useHistory()

    const linkHandler = () => {
        history.push("/")
    }

    return(
        <header className="main-page-content-header">
            <div className="logo" onClick={() => linkHandler()}>
                Need for drive
            </div>
            <div className="location">
            <div className="location-image" style={{backgroundImage: `url(${location})`}}></div>
                Ульяновск
            </div>
        </header>
    )
}

export default Header;
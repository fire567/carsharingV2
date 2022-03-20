import React, {useState} from "react";
import { Link } from "react-router-dom";
import triangle from "../../assets/triangle.svg";
import { ReactSVG } from "react-svg";
import "./NavBar.css";

const NavBar = ({match}) => {
    const [popUp, setPopUp] = useState(false)
    
    const popUpHandler = () => {
        setPopUp(!popUp)
    }

    const links = [
        {id: 0, name:"Местоположение", link:"location"},
        {id: 1, name:"Модель", link:"model"},
        {id: 2, name:"Дополнительно", link:"extra-opt"},
        {id: 3, name:"Итого", link:"result"},
    ]

    return(
        <div className="nav-bar-form">
            <div className="links-form">
                {links.map((link) => (
                    <>
                        <Link to={`${link.link}`} className="nav-link" key={link.id}>
                            {link.name}
                        </Link>
                        {link.id === 3 ? null : <ReactSVG src={triangle} className="triangles"/>}
                    </>
                ))}
            </div>
            <div className="mobile-links-form" onClick={() => popUpHandler()}>
                <div className={popUp === false ? "up-arrow" : "down-arrow"}></div>
                {links.map((link) => (
                    match.name === link.link ? link.name : null
                ))
                }
                {popUp === true ?  
                    <div className="links-popup">
                        {links.map((link) => (
                            match.name === link.link ? null : 
                                <Link to={`${link.link}`} className="nav-link-mobile" key={link.id}>
                                    {link.name}
                                </Link>
                            
                        ))}
                    </div>
                : null}
            </div>
        </div>
    )
}

export default NavBar;
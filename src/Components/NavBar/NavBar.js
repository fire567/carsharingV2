import React, {useState} from "react";
import { Link } from "react-router-dom";
import triangle from "../../assets/triangle.svg";
import { links } from "../../consts";
import { ReactSVG } from "react-svg";
import classes from "./NavBar.module.css";

const NavBar = ({match}) => {
    const [popUp, setPopUp] = useState(false)
    
    const popUpHandler = () => {
        setPopUp(!popUp)
    }

    return(
        <div className={classes.nav_bar_form}>
            <div className={classes.links_form}>
                {links.map((link) => (
                    <>
                        <Link to={`${link.link}`} className={match.name === link.link ? classes.nav_link_active : classes.nav_link} key={link.id}>
                            {link.name}
                        </Link>
                        {link.id === 3 ? null : <ReactSVG src={triangle} className={classes.triangles}/>}
                    </>
                ))}
            </div>
            <div className={classes.mobile_links_form} onClick={() => popUpHandler()}>
                {links.map((link) => (
                    match.name === link.link ? link.name : null
                ))
                }
                <div className={popUp === false ? classes.up_arrow : classes.down_arrow}></div>
                {popUp === true ?  
                    <div className={classes.links_popup}>
                        {links.map((link) => (
                            match.name === link.link ? null : 
                                <Link to={`${link.link}`} className={classes.nav_link_mobile} key={link.id}>
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
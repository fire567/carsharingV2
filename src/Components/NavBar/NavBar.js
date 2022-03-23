import React, {useState} from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import triangle from "../../assets/triangle.svg";
import { links } from "../../consts";
import { ReactSVG } from "react-svg";
import classes from "./NavBar.module.css";

const NavBar = ({match}) => {
    const [popUp, setPopUp] = useState(false)
    const location = useSelector((state) => state.location)
    
    const popUpHandler = () => {
        setPopUp(!popUp)
    }

    const linksStyleHandler = (link) => {
        const currentLink = links.filter(item => item.link === match.name)

        if(match.name === "location"){
            if(link.link === match.name){
                return classes.nav_link_active
            }else if(location !== null && link.id - 1 === currentLink[0].id){
                return classes.nav_link
            }
            else {
                return classes.nav_link_disabled
            }
        }
    }

    const mobileLinksStyleHandler = (link) => {
        const currentLink = links.filter(item => item.link === match.name)

        if(match.name === "location"){
            if(location !== null && link.id - 1 === currentLink[0].id){
                return classes.nav_link_mobile
            }
            else {
                return classes.nav_link_mobile_disabled
            }
        }
    }

    return(
        <div className={classes.nav_bar_form}>
            <div className={classes.links_form}>
                {links.map((link) => (
                    <React.Fragment key={link.id}>
                        <Link to={`${link.link}`} className={linksStyleHandler(link)}>
                            {link.name}
                        </Link>
                        {link.id === 3 ? null : <ReactSVG src={triangle} className={classes.triangles}/>}
                    </React.Fragment>
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
                            match.name === link.link ? 
                                <Link to={`${link.link}`} style={{display: "none"}} key={link.id}>
                                    {link.name}
                                </Link> : 
                                <Link to={`${link.link}`} className={mobileLinksStyleHandler(link)} key={link.id}>
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
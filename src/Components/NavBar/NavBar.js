import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import className from 'classnames';
import { currentStyle, mobileCurrentStyle } from '../../helpers';
import { links } from '../../consts';
import classes from './NavBar.module.css';

const NavBar = ({ match }) => {
  const [popUp, setPopUp] = useState(false);
  const location = useSelector((state) => state.location);
  const currentCar = useSelector((state) => state.currentCar);
  const color = useSelector((state) => state.color);
  const date = useSelector((state) => state.date);
  const currentRate = useSelector((state) => state.currentRate);

  const popUpHandler = () => {
    setPopUp(!popUp);
  };

  const linksStyleHandler = (link) => {
    const currentLink = links.filter((item) => item.link === match.name);

    const style = currentStyle(
      location,
      currentLink,
      link,
      color,
      date.sinceDate,
      date.endDate,
      currentCar,
      currentRate,
      classes
    );

    return style;
  };

  const mobileLinksStyleHandler = (link) => {
    const currentLink = links.filter((item) => item.link === match.name);

    const style = mobileCurrentStyle(
      location,
      currentLink,
      link,
      color,
      date.sinceDate,
      date.endDate,
      currentCar,
      currentRate,
      classes
    );

    return style;
  };

  return (
    <div className={classes.nav_bar_form}>
      {match.name ? (
        <>
          <div className={classes.links_form}>
            {links.map((link) => (
              <React.Fragment key={link.id}>
                <Link to={`${link.link}`} className={linksStyleHandler(link)}>
                  {link.name}
                </Link>
                {link.id !== 3 && <div className={classes.triangle} />}
              </React.Fragment>
            ))}
          </div>
          <div className={classes.mobile_links_form} onClick={popUpHandler}>
            {links.map((link) => match.name === link.link && link.name)}
            <div
              className={className({
                [classes.arrow]: true,
                [classes.up_arrow]: !popUp,
                [classes.down_arrow]: popUp,
              })}
            />
            {popUp && (
              <div className={classes.links_popup}>
                {links.map((link) =>
                  match.name === link.link ? (
                    <Link
                      to={`${link.link}`}
                      style={{ display: 'none' }}
                      key={link.id}
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <Link
                      to={`${link.link}`}
                      className={mobileLinksStyleHandler(link)}
                      key={link.id}
                    >
                      {link.name}
                    </Link>
                  )
                )}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className={classes.id_form}>Заказ номер {match.id}</div>
      )}
    </div>
  );
};

export default NavBar;

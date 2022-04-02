import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import className from 'classnames';
import {
  setCurrentCar,
  setColor,
  setRate,
  setDate,
  setExtra,
} from '../../Redux/actions';
import { links } from '../../consts';
import classes from './NavBar.module.css';

const NavBar = ({ match }) => {
  const dispatch = useDispatch();
  const [popUp, setPopUp] = useState(false);
  const location = useSelector((state) => state.location);
  const currentCar = useSelector((state) => state.currentCar);
  const color = useSelector((state) => state.color);
  const date = useSelector((state) => state.date);
  const currentRate = useSelector((state) => state.currentRate);

  const popUpHandler = () => {
    setPopUp(!popUp);
  };

  useEffect(() => {
    if (match.name === 'location') {
      dispatch(setCurrentCar(null));
      dispatch(setColor(null));
      dispatch(setRate(null));
      dispatch(
        setDate({
          sinceDate: null,
          endDate: null,
        })
      );
      dispatch(
        setExtra({
          isFullTank: false,
          isChair: false,
          isRightWheel: false,
        })
      );
    }
    if (match.name === 'model') {
      dispatch(setColor(null));
      dispatch(setRate(null));
      dispatch(
        setDate({
          sinceDate: null,
          endDate: null,
        })
      );
      dispatch(
        setExtra({
          isFullTank: false,
          isChair: false,
          isRightWheel: false,
        })
      );
    }
  }, [match]);

  const linksStyleHandler = (link) => {
    const currentLink = links.filter((item) => item.link === match.name);

    if (match.name === 'location') {
      if (link.link === match.name) {
        return classes.nav_link_active;
      }
      if (location !== null && link.id - 1 === currentLink[0].id) {
        return classes.nav_link;
      }

      return classes.nav_link_disabled;
    }

    if (match.name === 'model') {
      if (link.link === match.name) {
        return classes.nav_link_active;
      }
      if (link.id - 1 === currentLink[0].id && currentCar) {
        return classes.nav_link;
      }
      if (link.id < currentLink[0].id) {
        return classes.nav_link;
      }
      return classes.nav_link_disabled;
    }

    if (match.name === 'extra-opt') {
      if (link.link === match.name) {
        return classes.nav_link_active;
      }
      if (link.id - 1 === currentLink[0].id) {
        return classes.nav_link;
      }
      if (link.id < currentLink[0].id) {
        return classes.nav_link;
      }

      return classes.nav_link_disabled;
    }
  };

  const mobileLinksStyleHandler = (link) => {
    const currentLink = links.filter((item) => item.link === match.name);

    if (match.name === 'location') {
      if (location && link.id - 1 === currentLink[0].id) {
        return classes.nav_link_mobile;
      }
    }

    if (match.name === 'model') {
      if (link.id - 1 === currentLink[0].id && currentCar) {
        return classes.nav_link_mobile;
      }
      if (link.id < currentLink[0].id) {
        return classes.nav_link_mobile;
      }
    }

    if (match.name === 'extra-opt') {
      if (
        link.id - 1 === currentLink[0].id &&
        date.endDate &&
        color &&
        currentRate
      ) {
        return classes.nav_link_mobile;
      }
      if (link.id < currentLink[0].id) {
        return classes.nav_link_mobile;
      }
    }

    return classes.nav_link_mobile_disabled;
  };

  return (
    <div className={classes.nav_bar_form}>
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
    </div>
  );
};

export default NavBar;

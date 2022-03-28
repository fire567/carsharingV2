import React from 'react';
import { useHistory } from 'react-router-dom';
import location from '../../assets/location.svg';
import classes from './Header.module.css';

const Header = () => {
  const history = useHistory();

  const linkHandler = () => {
    history.push('/');
  };

  return (
        <header className={classes.main_page_content_header}>
            <div className={classes.logo} onClick={linkHandler}>
                Need for drive
            </div>
            <div className={classes.location}>
            <div className={classes.location_image} style={{ backgroundImage: `url(${location})` }} />
                Ульяновск
            </div>
        </header>
  );
};

export default Header;

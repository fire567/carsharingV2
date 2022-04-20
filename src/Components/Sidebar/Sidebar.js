import React, { useState } from 'react';
import Language from '../Language/Language';
import classes from './Sidebar.module.css';

const Sidebar = ({ setIsOpened }) => {
  const [language, setLanguage] = useState(true);

  const activeMenuHandler = () => {
    setIsOpened(true);
  };

  return (
    <>
      <div className={classes.sidebar_form}>
        <div className={classes.burger_menu_btn} onClick={activeMenuHandler}>
          <div className={classes.vector} />
          <div className={classes.vector} />
          <div className={classes.vector} />
        </div>
        <Language language={language} setLanguage={setLanguage} />
      </div>
      <div className={classes.mobile_sidebar_form}>
        <div
          className={classes.mobile_burger_menu_btn}
          onClick={activeMenuHandler}
        >
          <div className={classes.mobile_vector} />
          <div className={classes.mobile_vector} />
          <div className={classes.mobile_vector} />
        </div>
      </div>
    </>
  );
};

export default Sidebar;

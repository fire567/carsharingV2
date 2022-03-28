import React from 'react';
import { ReactSVG } from 'react-svg';
import exit from '../../assets/exit.svg';
import telegram from '../../assets/telegram.svg';
import classes from './Menu.module.css';

const Menu = ({ setIsOpened, isOpened }) => {
  const closeMenuHandler = () => {
    setIsOpened(false);
  };
  return (
        <div className={isOpened ? classes.menu_form : classes.menu_form_closed}>
            <div className={isOpened ? classes.menu_content_side : classes.menu_content_side_closed}>
                <div className={classes.exit_btn} style={{ backgroundImage: `url(${exit})` }} onClick={closeMenuHandler} />
                <div className={classes.menu_content_form}>
                    <div href="" className={classes.menu_content}>Парковка</div>
                    <div href="" className={classes.menu_content}>Страховка</div>
                    <div href="" className={classes.menu_content}>Бензин</div>
                    <div href="" className={classes.menu_content}>Обслуживание</div>
                </div>
                <div className={classes.media_icons}>
                    <ReactSVG src={telegram} className={classes.media_icon}/>
                </div>
            </div>
            <div className={isOpened ? classes.menu_transparent_side : classes.menu_transparent_side_closed} />
        </div>
  );
};

export default Menu;

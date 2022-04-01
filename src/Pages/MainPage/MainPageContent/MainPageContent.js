import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../../Components/Header/Header';
import classes from './MainPageContent.module.css';

const MainPageContent = () => {
  const history = useHistory();

  const linkHandler = () => {
    history.push('order-page/location');
  };

  return (
    <div className={classes.main_page_content_form}>
      <Header />
      <div className={classes.main_page_content}>
        <div className={classes.carsharing_text}>Каршеринг</div>
        <div className={classes.big_logo}>Need for drive</div>
        <div className={classes.purpose}>
          Поминутная аренда авто твоего города
        </div>
        <button className={classes.order_btn_form} onClick={linkHandler}>
          Забронировать
        </button>
      </div>
      <footer className={classes.main_page_content_footer}>
        <div className={classes.cop_mark}>© 2016-2019 «Need for drive»</div>
        <a className={classes.support_phone}>8 (495) 234-22-44</a>
      </footer>
    </div>
  );
};

export default MainPageContent;

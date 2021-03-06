import React, { useState } from 'react';
import { ReactSVG } from 'react-svg';
import { Route, useHistory } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Header from '../../Components/Header/Header';
import NavBar from '../../Components/NavBar/NavBar';
import note from '../../assets/note.svg';
import Location from './Location/Location';
import OrderInf from '../../Components/OrderInf/OrderInf';
import Model from './Model/Model';
import classes from './OrderPage.module.css';
import ExtraOpt from './ExtraOpt/ExtraOpt';

const OrderPage = ({ match, setIsOpened }) => {
  const history = useHistory();
  const [infMobileOpened, setIsMobileOpened] = useState(false);

  window.onload = () => {
    history.push('/order-page/location');
  };

  const openMenuHandler = () => {
    setIsMobileOpened(true);
  };

  return (
    <div className={classes.order_page_form}>
      <Sidebar setIsOpened={setIsOpened} />
      <div className={classes.page_form}>
        <div className={classes.page_header}>
          <Header />
        </div>
        <NavBar match={match.params} />
        <div className={classes.order_page_content_form}>
          <div className={classes.content_form}>
            <Route path='/order-page/location' exact>
              <Location />
            </Route>
            <Route path='/order-page/model' exact>
              <Model />
            </Route>
            <Route path='/order-page/extra-opt' exact>
              <ExtraOpt />
            </Route>
          </div>
          <OrderInf
            match={match}
            setIsMobileOpened={setIsMobileOpened}
            infMobileOpened={infMobileOpened}
          />
        </div>
        <div
          className={
            infMobileOpened
              ? classes.mobile_inf_btn_closed
              : classes.mobile_inf_btn
          }
          onClick={openMenuHandler}
        >
          <ReactSVG className={classes.open_btn} src={note} />
        </div>
      </div>
    </div>
  );
};

export default OrderPage;

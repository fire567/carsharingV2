import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactSVG } from 'react-svg';
import { getOrder } from '../../Redux/actions';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Header from '../../Components/Header/Header';
import NavBar from '../../Components/NavBar/NavBar';
import OrderInf from '../../Components/OrderInf/OrderInf';
import OrderPopUp from '../../Components/OrderPopUp/OrderPopUp';
import Total from '../OrderPage/Total/Total';
import classes from './CurrentOrder.module.css';
import note from '../../assets/note.svg';

const CurrentOrder = ({ match, setIsOpened }) => {
  const dispatch = useDispatch();
  const [infMobileOpened, setIsMobileOpened] = useState(false);
  const [isPopUpOpened, setIsPopUpOpened] = useState(false);
  const order = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrder(match.params.id));
  }, []);

  const openMenuHandler = () => {
    setIsMobileOpened(true);
  };

  return (
    order && (
      <div className={classes.order_page_form}>
        <Sidebar setIsOpened={setIsOpened} />
        <div className={classes.page_form}>
          <div className={classes.page_header}>
            <Header />
          </div>
          <NavBar match={match.params} />
          <div className={classes.order_page_content_form}>
            <div className={classes.content_form}>
              <Total
                currentCar={order.data.carId}
                extra={order.data}
                sinceDate={order.data.dateFrom}
                endDate={order.data.dateTo}
              />
            </div>
            <OrderInf
              match={match}
              setIsMobileOpened={setIsMobileOpened}
              infMobileOpened={infMobileOpened}
              setIsPopUpOpened={setIsPopUpOpened}
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
        <OrderPopUp
          setIsPopUpOpened={setIsPopUpOpened}
          isPopUpOpened={isPopUpOpened}
        />
      </div>
    )
  );
};

export default CurrentOrder;

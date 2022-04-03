import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postOrder } from '../../Redux/actions';
import classes from './OrderPopUp.module.css';

const OrderPopUp = ({ setIsPopUpOpened, isPopUpOpened }) => {
  const dispatch = useDispatch();
  const [allInf, setAllInf] = useState({});
  const location = useSelector((state) => state.location);
  const currentCar = useSelector((state) => state.currentCar);
  const color = useSelector((state) => state.color);
  const date = useSelector((state) => state.date);
  const currentRate = useSelector((state) => state.currentRate);
  const currentPrice = useSelector((state) => state.currentPrice);
  const postedOrder = useSelector((state) => state.postedOrder);
  const extra = useSelector((state) => state.extra);
  const closePopUpHandler = () => {
    setIsPopUpOpened(false);
  };

  console.log(postedOrder);

  useEffect(() => {
    setAllInf({
      orderStatusId: { name: 'new', id: '5e26a191099b810b946c5d89' },
      cityId: location && location.town[0],
      pointId: location && location.point[0],
      carId: currentCar,
      color,
      dateFrom: Date.parse(date.sinceDate),
      dateTo: Date.parse(date.endDate),
      rateId: currentRate,
      price: currentPrice,
      isFullTank: extra.isFullTank,
      isNeedChildChair: extra.isChair,
      isRightWheel: extra.isRightWheel,
    });
  }, [currentCar, currentPrice, currentRate, date, color, extra]);

  const sendRequestHandler = () => {
    dispatch(postOrder(allInf));
  };

  return (
    <div
      className={
        isPopUpOpened ? classes.pop_up_form : classes.pop_up_form_hidden
      }
    >
      <div className={classes.pop_up_content}>
        <label className={classes.content_header}>Подтвердить заказ</label>
        <div className={classes.buttons_form}>
          <button className={classes.order_btn} onClick={sendRequestHandler}>
            Подтвердить
          </button>
          <button className={classes.close_btn} onClick={closePopUpHandler}>
            Вернуться
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPopUp;

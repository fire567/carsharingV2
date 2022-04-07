import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { setCurrentPrice, getOrder } from '../../Redux/actions';
import { links } from '../../consts';
import OrderInfMobile from './OrderInfMobile/OrderInfMobile';
import CurrentInf from './CurrentInf/CurrentInf';
import { dateFormat, changePrice, infArrHandler } from '../../helpers';
import classes from './OrderInf.module.css';

const OrderInf = ({
  setIsMobileOpened,
  infMobileOpened,
  match,
  setIsPopUpOpened,
}) => {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.location);
  const currentCar = useSelector((state) => state.currentCar);
  const color = useSelector((state) => state.color);
  const date = useSelector((state) => state.date);
  const extra = useSelector((state) => state.extra);
  const currentPrice = useSelector((state) => state.currentPrice);
  const currentRate = useSelector((state) => state.currentRate);
  const order = useSelector((state) => state.order);
  const history = useHistory();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [infArr, setInfArr] = useState(null);
  const [hours, setHours] = useState(null);
  const [days, setDays] = useState(null);
  const [minutes, setMinutes] = useState(null);

  useEffect(() => {
    if (match.path.split('/')[1] === 'order') {
      dispatch(getOrder(match.params.id));
    }
  }, [match]);

  const buttonHandler = () => {
    let nextValue = '';
    const filteredLinks = links.filter(
      (item) => item.link === match.params.name
    );

    if (match.path.split('/')[1] !== 'order') {
      if (filteredLinks[0].id + 1 <= 3) {
        nextValue = links[filteredLinks[0].id + 1].name;
      } else {
        nextValue = 'Заказать';
      }
    } else nextValue = 'Отменить';

    return nextValue;
  };

  const linkHandler = () => {
    const filteredLinks = links.filter(
      (item) => item.link === match.params.name
    );

    if (match.path.split('/')[1] !== 'order') {
      if (match.params.name === 'result') {
        setIsPopUpOpened(true);
      }

      if (filteredLinks[0].id + 1 <= 3) {
        history.push(`${links[filteredLinks[0].id + 1].link}`);
      }
    }
  };

  useEffect(() => {
    if (match.path.split('/')[1] !== 'order') {
      if (date.sinceDate && date.endDate) {
        dateFormat(
          Date.parse(date.sinceDate),
          Date.parse(date.endDate),
          setHours,
          setMinutes,
          setDays
        );
      }
    } else if (order) {
      dateFormat(
        order.data.dateFrom,
        order.data.dateTo,
        setHours,
        setMinutes,
        setDays
      );
    }
  }, [date, order]);

  useEffect(() => {
    if (match.path.split('/')[1] !== 'order') {
      setInfArr(
        infArrHandler(
          location && location.town[0].name,
          location && location.point[0].address,
          currentCar && currentCar.name,
          color,
          date.sinceDate,
          date.endDate,
          days,
          hours,
          minutes,
          currentRate && currentRate.rateTypeId.name,
          extra.isFullTank,
          extra.isChair,
          extra.isRightWheel
        )
      );
    } else if (order) {
      setInfArr(
        infArrHandler(
          order.data.cityId.name,
          order.data.pointId.address,
          order.data.carId.name,
          order.data.color,
          order.data.dateFrom,
          order.data.dateTo,
          days,
          hours,
          minutes,
          order.data.rateId.rateTypeId.name,
          order.data.isFullTank,
          order.data.isNeedChildChair,
          order.data.isRightWheel
        )
      );
    }

    if (match.params.name === 'location') {
      dispatch(setCurrentPrice(null));
      location ? setIsButtonDisabled(false) : setIsButtonDisabled(true);
    }
    if (match.params.name === 'model') {
      dispatch(setCurrentPrice(null));
      currentCar ? setIsButtonDisabled(false) : setIsButtonDisabled(true);
    }
    if (match.params.name === 'extra-opt') {
      color && currentRate && date.sinceDate && date.endDate
        ? setIsButtonDisabled(false)
        : setIsButtonDisabled(true);
    }
    if (match.path.split('/')[1] === 'order') {
      setIsButtonDisabled(false);
    }
  }, [
    location,
    match.params.name,
    currentCar,
    dispatch,
    color,
    date,
    currentRate,
    extra,
    days,
    hours,
    minutes,
    order,
  ]);

  useEffect(() => {
    let price = 0;
    if (match.path.split('/')[1] !== 'order') {
      price = changePrice(
        date,
        extra,
        currentRate,
        currentCar ? currentCar.priceMin : 0
      );
    } else if (order) {
      price = order.data.price;
    }

    dispatch(setCurrentPrice(price));
  }, [date, currentRate, extra, order]);

  return (
    <>
      <div className={classes.order_inf_hide}>
        <div className={classes.order_inf_form}>
          <div className={classes.order_inf_header}>Ваш заказ:</div>
          <CurrentInf
            infArr={infArr}
            currentCar={
              match.path.split('/')[1] !== 'order'
                ? currentCar
                : order && order.data.carId
            }
            currentPrice={currentPrice}
            extra={extra}
          />
          <button
            disabled={isButtonDisabled}
            className={classNames(classes.order_inf_btn, {
              [classes.order_inf_btn_delete]:
                match.path.split('/')[1] === 'order',
              [classes.order_inf_btn_active]:
                !isButtonDisabled && match.path.split('/')[1] !== 'order',
              [classes.order_inf_btn_disabled]:
                isButtonDisabled && match.path.split('/')[1] !== 'order',
            })}
            onClick={linkHandler}
          >
            {buttonHandler()}
          </button>
        </div>
      </div>
      <button
        disabled={isButtonDisabled}
        className={classNames(classes.mobile_order_inf_btn, {
          [classes.order_inf_btn_delete]: match.path.split('/')[1] === 'order',
          [classes.order_inf_btn_active]:
            !isButtonDisabled && match.path.split('/')[1] !== 'order',
          [classes.order_inf_btn_disabled]:
            isButtonDisabled && match.path.split('/')[1] !== 'order',
        })}
        onClick={linkHandler}
      >
        {buttonHandler()}
      </button>
      <OrderInfMobile
        setIsMobileOpened={setIsMobileOpened}
        match={match}
        infMobileOpened={infMobileOpened}
        location={location}
        currentCar={currentCar}
        infArr={infArr}
        isButtonDisabled={isButtonDisabled}
        linkHandler={linkHandler}
        buttonHandler={buttonHandler}
        currentPrice={currentPrice}
      />
    </>
  );
};

export default OrderInf;

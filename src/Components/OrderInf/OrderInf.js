import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { setCurrentPrice, getOrder } from '../../Redux/actions';
import { links } from '../../consts';
import OrderInfMobile from './OrderInfMobile/OrderInfMobile';
import CurrentInf from './CurrentInf/CurrentInf';
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
        const miliseconds =
          Date.parse(date.endDate) - Date.parse(date.sinceDate);
        const minute = 1000 * 60;
        const hour = minute * 60;
        const currentMinutes = Math.floor(miliseconds / minute);
        const currentHours = Math.floor(miliseconds / hour);
        const currentDays = Math.floor(currentHours / 24);
        setHours(Math.floor(currentDays * 24 - currentHours));
        setMinutes(Math.floor(currentHours * 60 - currentMinutes));
        setDays(currentDays);
      }
    } else if (order) {
      const miliseconds = order.data.dateTo - order.data.dateFrom;
      const minute = 1000 * 60;
      const hour = minute * 60;
      const currentMinutes = Math.floor(miliseconds / minute);
      const currentHours = Math.floor(miliseconds / hour);
      const currentDays = Math.floor(currentHours / 24);
      setHours(Math.floor(currentDays * 24 - currentHours));
      setMinutes(Math.floor(currentHours * 60 - currentMinutes));
      setDays(currentDays);
    }
  }, [date, order]);

  useEffect(() => {
    if (match.path.split('/')[1] !== 'order') {
      setInfArr([
        {
          id: 0,
          item: location,
          header: 'Пункт выдачи',
          value:
            location &&
            `${location.town[0].name}, ${location.point[0].address}`,
        },
        {
          id: 1,
          item: currentCar,
          header: 'Модель',
          value: currentCar && `${currentCar.name}`,
        },
        {
          id: 2,
          item: color,
          header: 'Цвет',
          value: color,
        },
        {
          id: 3,
          item: date.sinceDate && date.endDate && date,
          header: 'Длительность аренды',
          value:
            date.sinceDate &&
            date.endDate &&
            `${days !== 0 ? `${days}д.` : ''} ${
              hours !== 0 ? `${Math.abs(hours)}ч.` : ''
            } ${minutes !== 0 ? `${Math.abs(minutes)}мин.` : ''}`,
        },
        {
          id: 4,
          item: currentRate,
          header: 'Длительность аренды',
          value: currentRate && currentRate.rateTypeId.name,
        },
        {
          id: 5,
          item: extra && extra.isFullTank,
          header: 'Полный бак',
          value: extra && extra.isFullTank,
        },
        {
          id: 6,
          item: extra && extra.isChair,
          header: 'Детское кресло',
          value: extra && extra.isChair,
        },
        {
          id: 7,
          item: extra && extra.isRightWheel,
          header: 'Правый руль',
          value: extra && extra.isRightWheel,
        },
      ]);
    } else if (order) {
      setInfArr([
        {
          id: 0,
          item: order.data.cityId,
          header: 'Пункт выдачи',
          value: `${order.data.cityId.name}, ${order.data.pointId.address}`,
        },
        {
          id: 1,
          item: order.data.carId,
          header: 'Модель',
          value: `${order.data.carId.name}`,
        },
        {
          id: 2,
          item: order.data.color,
          header: 'Цвет',
          value: order.data.color,
        },
        {
          id: 3,
          item: order.data.dateFrom,
          header: 'Длительность аренды',
          value: `${days !== 0 ? `${days}д.` : ''} ${
            hours !== 0 ? `${Math.abs(hours)}ч.` : ''
          } ${minutes !== 0 ? `${Math.abs(minutes)}мин.` : ''}`,
        },
        {
          id: 4,
          item: order.data.rateId,
          header: 'Длительность аренды',
          value: order.data.rateId.rateTypeId.name,
        },
        {
          id: 5,
          item: order.data.isFullTank,
          header: 'Полный бак',
          value: order.data.isFullTank,
        },
        {
          id: 6,
          item: order.data.isNeedChildChair,
          header: 'Детское кресло',
          value: order.data.isNeedChildChair,
        },
        {
          id: 7,
          item: order.data.isRightWheel,
          header: 'Правый руль',
          value: order.data.isRightWheel,
        },
      ]);
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

  const calculatePrice = () => {
    const miliseconds = Date.parse(date.endDate) - Date.parse(date.sinceDate);
    if (currentRate.price === 7) {
      return Math.floor((miliseconds / (1000 * 60)) * currentRate.price);
    }
    return Math.floor(
      (miliseconds / (1000 * 60 * 60 * 24 * 31)) * currentRate.price
    );
  };

  useEffect(() => {
    let test = 0;
    if (match.path.split('/')[1] !== 'order') {
      if (date.sinceDate && date.endDate && currentRate) {
        test = calculatePrice();
      }
      if (extra && extra.isFullTank === true) {
        test = Math.floor(test + 500);
      } else {
        test = Math.floor(test + 0);
      }
      if (extra && extra.isChair === true) {
        test = Math.floor(test + 200);
      } else {
        test = Math.floor(test + 0);
      }
      if (extra && extra.isRightWheel === true) {
        test = Math.floor(test + 1500);
      } else {
        test = Math.floor(test + 0);
      }
    } else if (order) {
      test = order.data.price;
    }

    dispatch(setCurrentPrice(test));
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

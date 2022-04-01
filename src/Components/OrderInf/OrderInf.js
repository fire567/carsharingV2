import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { setCurrentCar } from '../../Redux/actions';
import { links } from '../../consts';
import OrderInfMobile from './OrderInfMobile/OrderInfMobile';
import CurrentInf from './CurrentInf/CurrentInf';
import classes from './OrderInf.module.css';

const OrderInf = ({ setIsMobileOpened, infMobileOpened, match }) => {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.location);
  const currentCar = useSelector((state) => state.currentCar);
  const color = useSelector((state) => state.color);
  const date = useSelector((state) => state.date);
  const extra = useSelector((state) => state.extra);
  const currentRate = useSelector((state) => state.currentRate);
  const history = useHistory();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [infArr, setInfArr] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(null);

  const buttonHandler = () => {
    let nextValue = '';
    const filteredLinks = links.filter(
      (item) => item.link === match.params.name,
    );

    if (filteredLinks[0].id + 1 <= 3) {
      nextValue = links[filteredLinks[0].id + 1].name;
    } else {
      nextValue = "Заказать";
    }

    return nextValue;
  };

  const linkHandler = () => {
    const filteredLinks = links.filter(
      (item) => item.link === match.params.name,
    );

    if (filteredLinks[0].id + 1 <= 3) {
      history.push(`${links[filteredLinks[0].id + 1].link}`);
    }
  };

  useEffect(() => {
    setInfArr([
      {
        id: 0,
        item: location,
        header: 'Пункт выдачи',
        value: location && `${location.town}, ${location.point}`,
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
        header: "Цвет",
        value: color,
      },
      {
        id: 3,
        item: date.sinceDate && date,
        header: "Длительность аренды",
        value: date.sinceDate && "5ч",
      },
      {
        id: 3,
        item: currentRate,
        header: "Длительность аренды",
        value: currentRate.rateTypeId.name,
      },
      {
        id: 4,
        item: extra.isFullTank,
        header: "Полный бак",
        value:extra.isFullTank && extra.isFullTank,
      },
      {
        id: 5,
        item: extra.isChair,
        header: "Детское кресло",
        value: extra.isChair,
      },
      {
        id: 6,
        item: extra.isRightWheel,
        header: "Правый руль",
        value: extra.isRightWheel,
      },
    ]);

    if (match.params.name === "location") {
      dispatch(setCurrentCar(null));
      location ? setIsButtonDisabled(false) : setIsButtonDisabled(true);
    }
    if (match.params.name === 'model') {
      currentCar ? setIsButtonDisabled(false) : setIsButtonDisabled(true);
    }
    if (match.params.name === "extra-opt") {
      color && currentRate && date.sinceDate && date.endDate
        ? setIsButtonDisabled(false)
        : setIsButtonDisabled(true);
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
  ]);

  console.log(currentPrice);

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
    if (date.sinceDate && date.endDate && currentRate) {
      setCurrentPrice(calculatePrice);
    }
    if (extra.isFullTank === true) {
      setCurrentPrice((prev) => Math.floor(prev + 500));
    } else {
      setCurrentPrice((prev) => Math.floor(prev + 0));
    }
    if (extra.isChair === true) {
      setCurrentPrice((prev) => Math.floor(prev + 200));
    } else {
      setCurrentPrice((prev) => Math.floor(prev + 0));
    }
    if (extra.isRightWheel === true) {
      setCurrentPrice((prev) => Math.floor(prev + 1500));
    } else {
      setCurrentPrice((prev) => Math.floor(prev + 0));
    }
  }, [date, currentRate, extra]);

  return (
    <>
      <div className={classes.order_inf_hide}>
        <div className={classes.order_inf_form}>
          <div className={classes.order_inf_header}>Ваш заказ:</div>
          <CurrentInf infArr={infArr} currentCar={currentCar}/>
          <button
            disabled={isButtonDisabled}
            className={classNames(classes.order_inf_btn, {
              [classes.order_inf_btn_active]: !isButtonDisabled,
              [classes.order_inf_btn_disabled]: isButtonDisabled,
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
          [classes.order_inf_btn_active]: !isButtonDisabled,
          [classes.order_inf_btn_disabled]: isButtonDisabled,
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
      />
    </>
  );
};

export default OrderInf;

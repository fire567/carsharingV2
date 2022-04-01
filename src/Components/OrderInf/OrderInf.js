import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentCar } from "../../Redux/actions";
import { links } from "../../consts";
import classes from "./OrderInf.module.css";

const OrderInf = ({ match }) => {
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

  const buttonHandler = () => {
    let nextValue = "";
    const filteredLinks = links.filter(
      (item) => item.link === match.params.name
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
      (item) => item.link === match.params.name
    );

    if (filteredLinks[0].id + 1 <= 3) {
      history.push(`${links[filteredLinks[0].id + 1].link}`);
    }
  };

  console.log(infArr);

  useEffect(() => {
    setInfArr([
      {
        id: 0,
        item: location && location,
        header: "Пункт выдачи",
        value: location && `${location.town}, ${location.point}`,
      },
      {
        id: 1,
        item: currentCar && currentCar,
        header: "Модель",
        value: currentCar && `${currentCar.name}`,
      },
      {
        id: 2,
        item: color && color,
        header: "Цвет",
        value: color && color,
      },
      {
        id: 3,
        item: date.sinceDate && date,
        header: "Длительность аренды",
        value: date.sinceDate && "5ч",
      },
      {
        id: 3,
        item: currentRate && currentRate,
        header: "Длительность аренды",
        value: currentRate && currentRate.rateTypeId.name,
      },
      {
        id: 4,
        item: extra.isFullTank && extra.isFullTank,
        header: "Полный бак",
        value: extra.isFullTank && extra.isFullTank,
      },
      {
        id: 5,
        item: extra.isChair && extra.isChair,
        header: "Детское кресло",
        value: extra.isChair && extra.isChair,
      },
      {
        id: 6,
        item: extra.isRightWheel && extra.isRightWheel,
        header: "Правый руль",
        value: extra.isRightWheel && extra.isRightWheel,
      },
    ]);

    if (match.params.name === "location") {
      dispatch(setCurrentCar(null));
      location ? setIsButtonDisabled(false) : setIsButtonDisabled(true);
    }
    if (match.params.name === "model") {
      currentCar ? setIsButtonDisabled(false) : setIsButtonDisabled(true);
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

  return (
    <>
      <div className={classes.order_inf_header}>Ваш заказ:</div>
      <div className={classes.all_order_inf}>
        {infArr &&
          infArr.map((item, index) => (
            <div
              className={
                item.item ? classes.order_inf : classes.order_inf_hidden
              }
              key={index}
            >
              <div className={classes.inf_name}>{item.header}</div>
              <div className={classes.dots_style} />
              <div className={classes.inf_value}>
                {item.value === true ? "Да" : item.value}
              </div>
            </div>
          ))}
        {currentCar && (
          <div className={classes.order_price_inf}>
            <div className={classes.order_price_header}>Цена:</div>
            <div className={classes.order_price}>
              от {currentCar.priceMin} до {currentCar.priceMax} ₽
            </div>
          </div>
        )}
        <button
          disabled={isButtonDisabled}
          className={
            isButtonDisabled
              ? classes.order_inf_btn_disabled
              : classes.order_inf_btn
          }
          onClick={() => linkHandler()}
        >
          {buttonHandler()}
        </button>
      </div>
    </>
  );
};

export default OrderInf;

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { setCurrentCar } from '../../Redux/actions';
import { links } from '../../consts';
import OrderInfMobile from '../OrderInfMobile/OrderInfMobile';
import classes from './OrderInf.module.css';

const OrderInf = ({ setIsMobileOpened, infMobileOpened, match }) => {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.location);
  const currentCar = useSelector((state) => state.currentCar);
  const history = useHistory();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [infArr, setInfArr] = useState(null);

  const buttonHandler = () => {
    let nextValue = '';
    const filteredLinks = links.filter((item) => item.link === match.params.name);

    if (filteredLinks[0].id + 1 <= 3) {
      nextValue = links[filteredLinks[0].id + 1].name;
    } else {
      nextValue = 'Заказать';
    }

    return nextValue;
  };

  const linkHandler = () => {
    const filteredLinks = links.filter((item) => item.link === match.params.name);

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
    ]);

    if (match.params.name === 'location') {
      dispatch(setCurrentCar(null));
      location ? setIsButtonDisabled(false) : setIsButtonDisabled(true);
    } if (match.params.name === 'model') {
      currentCar ? setIsButtonDisabled(false) : setIsButtonDisabled(true);
    }
  }, [location, match.params.name, currentCar, dispatch]);

  return (
    <>
      <div className={classes.order_inf_form}>
        <div className={classes.order_inf_header}>
            Ваш заказ:
        </div>
        <div className={classes.all_order_inf}>
          {infArr
            && infArr.map((item, index) => (
                <div className={item.item ? classes.order_inf : classes.order_inf_hidden } key={index}>
                  <div className={classes.inf_name}>
                      {item.header}
                  </div>
                  <div className={classes.dots_style}>
                  </div>
                  <div className={classes.inf_value}>
                      {item.value}
                  </div>
                </div>
            ))
          }
          {currentCar
          && <div className={classes.order_price_inf}>
              <div className={classes.order_price_header}>
                  Цена:
              </div>
              <div className={classes.order_price}>
                  от {currentCar.priceMin} до {currentCar.priceMax} ₽
              </div>
            </div>
          }
            <button
                disabled={isButtonDisabled}
                className={classNames({
                  [classes.order_inf_btn]: true,
                  [classes.order_inf_btn_active]: !isButtonDisabled,
                  [classes.order_inf_btn_disabled]: isButtonDisabled,
                })}
                onClick={linkHandler}
            >
                {buttonHandler()}
            </button>
        </div>
        </div>
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

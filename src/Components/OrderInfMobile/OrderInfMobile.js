import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ReactSVG } from 'react-svg';
import { setCurrentCar } from '../../Redux/actions';
import { links } from '../../consts';
import exit from '../../assets/exit.svg';
import classes from './OrderInfMobile.module.css';

const OrderInfMobile = ({ setIsMobileOpened, infMobileOpened, match }) => {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.location);
  const currentCar = useSelector((state) => state.currentCar);
  const history = useHistory();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [infArr, setInfArr] = useState(null);

  const closeMenuHandler = () => {
    setIsMobileOpened(false);
  };

  const buttonText = () => {
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
    setIsMobileOpened(false);
    const filteredLinks = links.filter((item) => item.link === match.params.name);

    if (filteredLinks[0].id + 1 <= 3) {
      history.push(`${links[filteredLinks[0].id + 1].link}`);
    }
  };

  useEffect(() => {
    setInfArr([
      {
        id: 0,
        item: location && location,
        header: 'Пункт выдачи',
        value: location && `${location.town}, ${location.point}`,
      },
      {
        id: 1,
        item: currentCar && currentCar,
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
        <div className={infMobileOpened ? classes.order_inf_form_mobile : classes.order_inf_form_mobile_closed}>
            <div className={classes.menu_form}>
                <ReactSVG className={classes.exit_btn} src={exit} onClick={closeMenuHandler}/>
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
                            className={isButtonDisabled ? classes.order_inf_btn_disabled : classes.order_inf_btn} onClick={linkHandler}
                        >
                            {buttonText()}
                        </button>
                    </div>
                </div>
            </div>
        </div>
  );
};

export default OrderInfMobile;

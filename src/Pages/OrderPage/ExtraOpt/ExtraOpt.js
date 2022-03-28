import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import { getRateTypes, setColor } from '../../../Redux/actions';
import 'react-datepicker/dist/react-datepicker.css';
import classes from './ExtraOpt.module.css';
import Loading from '../../../Components/Loading/Loading';

const ExtraOpt = () => {
  const dispatch = useDispatch();
  const currentCar = useSelector((state) => state.currentCar);
  const color = useSelector((state) => state.color);
  const rates = useSelector((state) => state.rates);
  const [sinceDate, setSinceDate] = useState(null);

  const extraOptions = [
    { id: 0, value: 'Полный бак, 500р', name: 'Полный бак' },
    { id: 1, value: 'Детское кресло, 200р', name: 'Детское кресло' },
    { id: 2, value: 'Правый руль, 1600р', name: 'Правый руль' },
  ];

  const colorHandler = (currentColor) => {
    dispatch(setColor(currentColor));
  };

  const sinceDateHandler = (date) => {
    setSinceDate(date);
  };

  useEffect(() => {
    dispatch(getRateTypes());
  }, [dispatch]);

  return (
    rates
      ? <div className={classes.options_form}>
      <div className={classes.opt_form}>
        <div className={classes.header}>Цвет</div>
          <div className={classes.colors_form}>
          {currentCar.colors.map((item) => (
            <div className={classes.opt_colors_form} key={item}>
              <div className={color === item ? classes.circle_active : classes.circle} onClick={() => colorHandler(item)}></div>
              <div className={classes.opt_value}>{item}</div>
            </div>
          ))
          }
          </div>
      </div>

      <div className={classes.opt_form}>
        <div className={classes.header}>Дата аренды</div>
        <div className={classes.inputs_form}>
          <div className={classes.date_form}>
            <label className={classes.label}>С </label>
            <span className={classes.close}/>
            <DatePicker
              className={classes.date}
              selected={sinceDate}
              onChange={(date) => sinceDateHandler(date)}
              placeholderText={'Введите дату и время'}
            />
          </div>
          <div className={classes.date_form}>
            <label className={classes.label}>По </label>
            <span className={classes.close}/>
            <DatePicker
              className={classes.date}
              placeholderText={'Введите дату и время'}
            />
          </div>
        </div>
      </div>

      <div className={classes.opt_form}>
        <div className={classes.header}>Тариф</div>
        <div className={classes.tarif_form}>
        {rates.data.map((item) => (
            <div className={classes.opt_tarif_form} key={item.id}>
              <div className={classes.circle}></div>
              <div className={classes.opt_value}>{item.rateTypeId.name}</div>
            </div>
        ))
        }
        </div>
      </div>

      <div className={classes.opt_form}>
        <div className={classes.header}>Доп услуги</div>
        <div className={classes.tarif_form}>
        {extraOptions.map((item) => (
            <div className={classes.opt_extra_form} key={item.id}>
              <input type="checkbox" className={classes.checkbox}></input>
              <label className={classes.opt_extra}>{item.value}</label>
            </div>
        ))
        }
        </div>
      </div>
    </div>
      : <Loading />
  );
};

export default ExtraOpt;

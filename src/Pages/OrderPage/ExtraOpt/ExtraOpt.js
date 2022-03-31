import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import { getRateTypes, setColor, setRate } from '../../../Redux/actions';
import 'react-datepicker/dist/react-datepicker.css';
import classes from './ExtraOpt.module.css';
import Loading from '../../../Components/Loading/Loading';

const ExtraOpt = () => {
  const dispatch = useDispatch();
  const currentCar = useSelector((state) => state.currentCar);
  const color = useSelector((state) => state.color);
  const rates = useSelector((state) => state.rates);
  const currentRate = useSelector((state) => state.currentRate);
  const [sinceDate, setSinceDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [isDisabled, setDisabled] = useState(true);
  const [isFullTank, setIsFullTank] = useState(false);
  const [isChair, setIsChair] = useState(false);
  const [isRightWheel, setIsRightWheel] = useState(false);
  const [extra, setExtra] = useState({});

  const extraOptions = [
    { id: 0, value: 'Полный бак, 500р', name: 'Полный бак' },
    { id: 1, value: 'Детское кресло, 200р', name: 'Детское кресло' },
    { id: 2, value: 'Правый руль, 1600р', name: 'Правый руль' },
  ];

  useEffect(() => {
    if (sinceDate) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [sinceDate]);

  useEffect(() => {
    setExtra({
      isFullTank,
      isChair,
      isRightWheel,
    });
  }, [isFullTank, isChair, isRightWheel]);

  const colorHandler = (currentColor) => {
    dispatch(setColor(currentColor));
  };

  const sinceDateHandler = (date) => {
    setSinceDate(date);
    setEndDate(null);
  };

  const endDateHandler = (date) => {
    setEndDate(date);
  };

  const deleteEndDate = () => {
    setEndDate(null);
  };

  const deleteSinceDate = () => {
    setSinceDate(null);
    setEndDate(null);
  };

  const rateHandler = (rate) => {
    dispatch(setRate(rate));
  };

  console.log('asd');

  const extraHandler = (item) => {
    if (item.id === 0) {
      setIsFullTank(!isFullTank);
    } else if (item.id === 1) {
      setIsChair(!isChair);
    } else if (item.id === 2) {
      setIsRightWheel(!isRightWheel);
    }
  };

  useEffect(() => {
    dispatch(getRateTypes());
  }, [dispatch]);

  return (
    rates && currentCar
      ? <div className={classes.options_form}>
      <div className={classes.opt_form}>
        <div className={classes.header}>Цвет</div>
          <div className={classes.colors_form}>
          {currentCar.colors.map((item, index) => (
            <div className={classes.opt_colors_form} key={index}>
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
            <span className={classes.close} onClick={deleteSinceDate}/>
            <DatePicker
              className={classes.date}
              selected={sinceDate}
              minDate={new Date()}
              onChange={sinceDateHandler}
              minTime={ sinceDate.getDate() === new Date().getDate() ? sinceDate : setHours(setMinutes(new Date(), 0), 0)}
              maxTime={setHours(setMinutes(new Date(), 59), 23)}
              showTimeSelect
              timeFormat="HH:mm"
              dateFormat="dd/MM/yyyy HH:mm"
              placeholderText={'Введите дату и время'}
              calendarClassName={classes.calendar}
            />
          </div>
          <div className={classes.date_form}>
            <label className={classes.label}>По </label>
            <span className={classes.close} onClick={deleteEndDate}/>
            <DatePicker
              className={classes.date}
              selected={endDate}
              onChange={(date) => endDateHandler(date)}
              showTimeSelect
              minTime={sinceDate.getTime()}
              maxTime={setHours(setMinutes(new Date(), 59), 23)}
              timeFormat="HH:mm"
              minDate={sinceDate}
              disabled={isDisabled}
              dateFormat="dd/MM/yyyy hh:mm"
              placeholderText={'Введите дату и время'}
              calendarClassName={classes.calendar}
            />
          </div>
        </div>
      </div>

      <div className={classes.opt_form}>
        <div className={classes.header}>Тариф</div>
        <div className={classes.tarif_form}>
        {rates.data.map((item) => (
            <div className={classes.opt_tarif_form} key={item.id}>
              <div className={currentRate && currentRate.id === item.id ? classes.circle_active : classes.circle} onClick={() => rateHandler(item)}></div>
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
              <label className={classes.opt_extra} onClick={() => extraHandler(item)}>{item.value}</label>
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

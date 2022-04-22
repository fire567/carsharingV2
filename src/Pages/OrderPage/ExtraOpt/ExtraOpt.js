import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import classNames from 'classnames';
import {
  getRateTypes,
  setColor,
  setRate,
  setExtra,
  setDate,
} from '../../../Redux/actions';
import {
  getCurrentCar,
  getColor,
  getCurrentRate,
  getDate,
  getExtra,
  getRates,
} from '../../../Redux/reducers';
import { extraOptions } from '../../../consts';
import 'react-datepicker/dist/react-datepicker.css';
import classes from './ExtraOpt.module.css';
import Loading from '../../../Components/Loading/Loading';

const ExtraOpt = () => {
  const dispatch = useDispatch();
  const mapState = (state) => ({
    currentCar: getCurrentCar(state),
    color: getColor(state),
    rates: getRates(state),
    extra: getExtra(state),
    date: getDate(state),
    currentRate: getCurrentRate(state),
  });
  const { currentCar, color, rates, extra, date, currentRate } =
    useSelector(mapState);
  const [sinceDate, setSinceDate] = useState(
    date.sinceDate ? date.sinceDate : new Date()
  );
  const [endDate, setEndDate] = useState(date.endDate ? date.endDate : null);
  const [isDisabled, setDisabled] = useState(true);
  const [isFullTank, setIsFullTank] = useState(false);
  const [isChair, setIsChair] = useState(false);
  const [isRightWheel, setIsRightWheel] = useState(false);

  useEffect(() => {
    if (sinceDate) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }

    dispatch(
      setDate({
        sinceDate,
        endDate,
      })
    );
  }, [sinceDate, endDate]);

  useEffect(() => {
    dispatch(
      setExtra({
        isFullTank,
        isChair,
        isRightWheel,
      })
    );
  }, [isFullTank, isChair, isRightWheel]);

  const colorHandler = (currentColor) => {
    dispatch(setColor(currentColor));
  };

  const sinceDateHandler = (item) => {
    setSinceDate(item);
    setEndDate(null);
  };

  const endDateHandler = (item) => {
    setEndDate(item);
  };

  const deleteEndDate = () => {
    setEndDate(null);
  };

  const deleteSinceDate = () => {
    setSinceDate(new Date());
    setEndDate(null);
  };

  const rateHandler = (rate) => {
    dispatch(setRate(rate));
  };

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

  return rates && currentCar ? (
    <div className={classes.options_form}>
      <div className={classes.opt_form}>
        <div className={classes.header}>Цвет</div>
        <div className={classes.colors_form}>
          {currentCar.colors.map((item, index) => (
            <div
              className={classNames(classes.opt_colors_form, {
                [classes.opt_colors_form_active]: color === item,
                [classes.opt_colors_form_unactive]: color !== item,
              })}
              onClick={() => colorHandler(item)}
              key={index}
            >
              <input type={'radio'} className={classes.circle} />
              <label
                className={
                  color === item ? classes.opt_value_active : classes.opt_value
                }
              >
                {item}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className={classes.opt_form}>
        <div className={classes.header}>Дата аренды</div>
        <div className={classes.inputs_form}>
          <div className={classes.date_form}>
            <label className={classes.label}>С </label>
            <span className={classes.close} onClick={deleteSinceDate} />
            <DatePicker
              className={classes.date}
              selected={sinceDate}
              minDate={date ? date.sinceDate : new Date()}
              onChange={sinceDateHandler}
              minTime={
                sinceDate.getDate() === new Date().getDate()
                  ? sinceDate
                  : setHours(setMinutes(new Date(), 0), 0)
              }
              maxTime={setHours(setMinutes(new Date(), 59), 23)}
              showTimeSelect
              timeFormat='HH:mm'
              dateFormat='dd/MM/yyyy HH:mm'
              placeholderText={'Введите дату и время'}
              calendarClassName={classes.calendar}
            />
          </div>
          <div className={classes.date_form}>
            <label className={classes.label}>По </label>
            <span className={classes.close} onClick={deleteEndDate} />
            <DatePicker
              className={classes.date}
              selected={endDate}
              onChange={(item) => endDateHandler(item)}
              showTimeSelect
              minTime={sinceDate.getTime()}
              maxTime={setHours(setMinutes(new Date(), 59), 23)}
              minDate={sinceDate}
              timeFormat='HH:mm'
              disabled={isDisabled}
              dateFormat='dd/MM/yyyy HH:mm'
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
            <div
              className={classNames(classes.opt_tarif_form, {
                [classes.opt_tarif_form_active]:
                  currentRate && currentRate.id === item.id,
                [classes.opt_tarif_form_unactive]:
                  !currentRate || (currentRate && !currentRate.id !== item.id),
              })}
              onClick={() => rateHandler(item)}
              key={item.id}
            >
              <input type={'radio'} className={classes.circle} />
              <label className={classes.opt_value}>
                {item.rateTypeId.name},{' '}
                {rates.data[0].id === item.id
                  ? `${item.price}₽/мес`
                  : `${item.price}₽/мин`}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className={classes.opt_form}>
        <div className={classes.header}>Доп услуги</div>
        <div className={classes.tarif_form}>
          {extraOptions.map((item) => (
            <div
              className={
                Object.values(extra)[item.id]
                  ? classes.opt_extra_form_active
                  : classes.opt_extra_form
              }
              key={item.id}
            >
              <input type='checkbox' className={classes.checkbox} />
              <label
                className={classes.opt_extra}
                onClick={() => extraHandler(item)}
              >
                {item.value}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default ExtraOpt;

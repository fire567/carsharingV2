import React from 'react';
import classNames from 'classnames';
import classes from './FilterCars.module.css';

const FilterCars = ({
  name,
  setIsPopUpOpened,
  setCurrentFilter,
  currentFilter,
}) => {
  const filterBtnHabdler = () => {
    setIsPopUpOpened(false);
    setCurrentFilter(name);
  };

  return (
    <div
      key={name}
      onClick={filterBtnHabdler}
      className={classNames(classes.filter_item_form, {
        [classes.filter_item_form_active]: currentFilter === name,
        [classes.filter_item_form_unactive]: currentFilter !== name,
      })}
    >
      <input type={'radio'} className={classes.circle} />
      <label className={classes.filter_item_name}>{name}</label>
    </div>
  );
};

export default FilterCars;

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
    <div className={classes.filter_item_form} key={name}>
      <div
        className={classNames(classes.circle, {
          [classes.circle_active]: currentFilter === name,
          [classes.circle_unactive]: currentFilter !== name,
        })}
        onClick={filterBtnHabdler}
      />
      <div className={classes.filter_item_name}>{name}</div>
    </div>
  );
};

export default FilterCars;

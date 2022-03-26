import React from 'react';
import classes from './FilterCars.module.css';

const FilterCars = ({
  name, setIsPopUpOpened, setCurrentFilter, currentFilter,
}) => {
  const filterBtnHabdler = () => {
    setIsPopUpOpened(false);
    setCurrentFilter(name);
  };

  return (
        <div className={classes.filter_item_form}>
            <div className={currentFilter === name ? classes.circle_active : classes.circle} onClick={() => filterBtnHabdler()}></div>
            <div className={classes.filter_item_name}>
                {name}
            </div>
        </div>
  );
};

export default FilterCars;

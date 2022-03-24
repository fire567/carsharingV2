import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilterCars from '../../../Components/filterCars/FilterCars';
import CarsList from '../../../Components/CarsList/CarsList';
import { getCategory, getCars } from '../../../Redux/actions';
import classes from './Model.module.css';

const Model = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const [isPopUpOpened, setIsPopUpOpened] = useState(false);

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getCars());
  }, []);

  const isPopUpOpenedHandler = () => {
    setIsPopUpOpened(!isPopUpOpened);
  };

  return (
    categories
      ? <>
            <div className={classes.flter_items_form}>
                {categories.data.map((category) => (
                    <FilterCars name={category.name} setIsPopUpOpened={setIsPopUpOpened}/>
                ))
                }
            </div>
            <div className={isPopUpOpened ? classes.mobile_flter_items_form_closed : classes.mobile_flter_items_form}>
                    {categories.data.map((category) => (
                            <FilterCars name={category.name} setIsPopUpOpened={setIsPopUpOpened}/>
                    ))
                    }
                <div className={classes.mobile_popup_btn} onClick={() => isPopUpOpenedHandler()}>
                    <div className={isPopUpOpened ? classes.triangle_right : classes.triangle_left}>
                    </div>
                </div>
            </div>
            <div className={classes.cars_list_form}>
                <CarsList />
            </div>
        </>
      : null
  );
};

export default Model;

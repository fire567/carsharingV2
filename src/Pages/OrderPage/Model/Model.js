import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilterCars from '../../../Components/filterCars/FilterCars';
import CarsList from '../../../Components/CarsList/CarsList';
import { getCategory, getCars } from '../../../Redux/actions';
import Loading from '../../../Components/Loading/Loading';
import classes from './Model.module.css';

const Model = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const cars = useSelector((state) => state.cars);
  const [filteredCars, setFilteredCars] = useState([]);
  const [currentFilter, setCurrentFilter] = useState(null);
  const [isPopUpOpened, setIsPopUpOpened] = useState(false);

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getCars());
  }, [dispatch]);

  useEffect(() => {
    if (cars && currentFilter) {
      setFilteredCars(cars.data.filter((car) => car.categoryId.name === currentFilter));
    }
  }, [currentFilter, cars]);

  const isPopUpOpenedHandler = () => {
    setIsPopUpOpened(!isPopUpOpened);
  };

  return (
    categories && cars
      ? <>
            <div className={classes.flter_items_form}>
                <FilterCars
                    name={'Все модели'}
                    key={10}
                    setIsPopUpOpened={setIsPopUpOpened}
                    setCurrentFilter={setCurrentFilter}
                    currentFilter={currentFilter}/>
                {categories.data.map((category) => (
                  <FilterCars
                    name={category.name}
                    key={category.id}
                    setIsPopUpOpened={setIsPopUpOpened}
                    setCurrentFilter={setCurrentFilter}
                    currentFilter={currentFilter}/>
                ))
                }
            </div>
            <div className={isPopUpOpened ? classes.mobile_flter_items_form : classes.mobile_flter_items_form_closed}>
                    <FilterCars
                      name={'Все модели'}
                      key={10}
                      setIsPopUpOpened={setIsPopUpOpened}
                      setCurrentFilter={setCurrentFilter}
                      currentFilter={currentFilter}/>
                    {categories.data.map((category) => (
                      <FilterCars
                        name={category.name}
                        key={category.id}
                        setIsPopUpOpened={setIsPopUpOpened}
                        setCurrentFilter={setCurrentFilter}
                        currentFilter={currentFilter}/>
                    ))
                    }
                <div className={classes.mobile_popup_btn} onClick={() => isPopUpOpenedHandler()}>
                    <div className={isPopUpOpened ? classes.triangle_right : classes.triangle_left}>
                    </div>
                </div>
            </div>
            <div className={classes.cars_list_form}>
                {filteredCars.length > 0 ? filteredCars.map((car) => <CarsList car={car} key={car.id}/>) : cars.data.map((car) => <CarsList car={car} key={car.id}/>)}
            </div>
        </>
      : <Loading />
  );
};

export default Model;

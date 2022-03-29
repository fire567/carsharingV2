import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import ReactPaginate from 'react-paginate';
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
  const [currentFilter, setCurrentFilter] = useState('Все модели');
  const [isPopUpOpened, setIsPopUpOpened] = useState(false);
  const [currentItems, setCurrentItems] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getCars());
  }, [dispatch]);

  useEffect(() => {
    if (cars && currentFilter) {
      setFilteredCars(cars.data.filter((car) => car.categoryId.name === currentFilter));
    }
  }, [currentFilter, cars]);

  console.log(currentItems);

  const isPopUpOpenedHandler = () => {
    setIsPopUpOpened(!isPopUpOpened);
  };

  useEffect(() => {
    const endOffset = itemOffset + 3;
    setCurrentItems(filteredCars.length > 0 ? filteredCars.slice(itemOffset, endOffset) : cars && cars.data.slice(itemOffset, endOffset));
  }, [itemOffset, cars, filteredCars]);

  const changePage = (event) => {
    setItemOffset((event.selected * 3) % cars.count);
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
            <div className={classNames({
              [classes.mobile_flter_items_form]: true,
              [classes.mobile_flter_items_form_closed]: !isPopUpOpened,
            })}>
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
                {filteredCars.length > 0
                  ? filteredCars.map((car) => <CarsList car={car} key={car.id}/>)
                  : cars.data.map((car) => <CarsList car={car} key={car.id}/>)
                  }
            </div>
            <div className={classes.list_mobile}>
              <div className={classes.cras_list_paginate}>
                  {currentItems && currentItems.map((car) => <CarsList car={car} key={car.id}/>)
                }
              </div>
              <ReactPaginate
                    pageCount={filteredCars.length > 0 ? filteredCars.length / 3 : cars.count / 3}
                    previousLabel="<"
                    nextLabel=">"
                    pageRangeDisplayed={1}
                    marginPagesDisplayed={2}
                    initialPage={0}
                    onPageChange={changePage}
                    className={classes.pagination}
                    pageClassName={classes.page}
                    nextClassName={classes.next}
                    breakClassName={classes.break}
                    previousClassName={classes.previous}
                    activeClassName={classes.active}
                  />
              </div>
        </>
      : <Loading />
  );
};

export default Model;

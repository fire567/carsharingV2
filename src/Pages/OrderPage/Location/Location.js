import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LocationInput from '../../../Components/LocationInput/LocationInput';
import Loading from '../../../Components/Loading/Loading';
import Maps from '../../../Components/Map/Maps';
import { getCities, getPoint, setLocation } from '../../../Redux/actions';
import classes from './Location.module.css';

const Location = () => {
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.cities);
  const points = useSelector((state) => state.point);
  const [filteredPoints, setFilteredPoints] = useState([]);
  const [filteredCities, setFilteredCities] = useState(null);
  const [town, setTown] = useState('Ульяновск');
  const [point, setPoint] = useState('');

  useEffect(() => {
    dispatch(getCities());
    dispatch(getPoint());
  }, [dispatch]);

  useEffect(() => {
    if (town && cities.data && points.data) {
      setFilteredPoints(
        points.data.filter((item) => item.cityId && item.cityId.name === town)
      );
    } else {
      setFilteredPoints(points);
    }

    if (town && cities.data) {
      setFilteredCities(
        cities.data.filter((item) =>
          item.name.toLowerCase().includes(town.toLowerCase())
        )
      );
    } else {
      setFilteredCities(cities.data);
    }
  }, [town, cities, points]);

  useEffect(() => {
    if (town && point) {
      const townObj = cities.data.filter((item) => item.name === town);
      const pointObj = points.data.filter(
        (item) =>
          item.address &&
          item.cityId &&
          point.toLowerCase().includes(item.address.toLowerCase())
      );
      dispatch(
        setLocation({
          town: townObj,
          point: pointObj,
        })
      );
    } else {
      dispatch(setLocation(null));
    }
  }, [town, point, dispatch]);

  return cities.data && points.data ? (
    <>
      <div className={classes.input_form}>
        <LocationInput
          label={'Город'}
          placeholder={'город'}
          setText={setTown}
          text={town}
          items={filteredCities || cities.data}
          disabled={false}
        />
        <LocationInput
          label={'Пункт выдачи'}
          placeholder={'пункт'}
          setText={setPoint}
          text={point}
          items={filteredPoints}
          disabled={!town}
        />
      </div>
      <div className={classes.map_part}>
        <div className={classes.map_header}>Выбрать на карте:</div>
        <Maps
          town={town}
          point={point}
          setTown={setTown}
          setPoint={setPoint}
          points={points.data}
        />
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Location;

import React, { useEffect, useState } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import classes from './Map.module.css';

const Maps = ({ town, point, setTown, setPoint, points }) => {
  const [currentPoint, setCurrentPoint] = useState(null);
  const [placemarks, setPlacemarks] = useState([]);
  const [yamps, setYamps] = useState(null);

  useEffect(() => {
    if (town && yamps) {
      yamps.geocode(`${town}, ${point}`).then((result) => {
        const coordinates = result.geoObjects.get(0).geometry.getCoordinates();
        setCurrentPoint(coordinates);
      });
    }
  }, [town, point, yamps]);

  useEffect(() => {
    setPlacemarks([]);
    if (points.length && yamps) {
      points.map((item) => {
        if (item.cityId) {
          yamps
            .geocode(`${item.cityId.name}, ${item.address}`)
            .then((result) => {
              const coordinates = result.geoObjects
                .get(0)
                .geometry.getCoordinates();
              setPlacemarks((prev) => [...prev, coordinates]);
            });
        }
      });
    }
  }, [points, yamps, town]);

  const mapPointHandler = (placemark) => {
    if (placemark) {
      yamps.geocode(placemark).then((res) => {
        const nearest = res.geoObjects.get(0);
        setTown(nearest.properties.get('description').split(', ')[1]);
        setPoint(nearest.properties.get('name'));
      });
    } else {
      yamps.geocode([54.31228, 48.395406]).then((res) => {
        const nearest = res.geoObjects.get(0);
        setTown(nearest.properties.get('description').split(', ')[1]);
        setPoint(nearest.properties.get('name'));
      });
    }
  };

  return (
    <YMaps
      query={{
        lang: 'ru_RU',
        apikey: '33acfd5b-ed70-42eb-9384-bf3e617c248b',
      }}
    >
      <div className={classes.map_form}>
        <Map
          modules={['geocode']}
          onLoad={(ymaps) => {
            setYamps(ymaps);
          }}
          state={{ center: currentPoint || [54.31228, 48.395406], zoom: 13 }}
          width={'100%'}
          height={'352px'}
        >
          {placemarks &&
            placemarks.map((placemark) => (
              <Placemark
                options={{ preset: 'islands#circleIcon', iconColor: '#0EC261' }}
                iconColor='#3caa3c'
                geometry={placemark}
                onClick={() => mapPointHandler(placemark)}
                key={placemark}
              />
            ))}
        </Map>
      </div>
    </YMaps>
  );
};

export default Maps;

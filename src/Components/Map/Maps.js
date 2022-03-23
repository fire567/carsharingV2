import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLocation } from "../../Redux/actions";
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import classes from "./Map.module.css";

const Maps = ({town, point, setTown, setPoint}) => {
    const dispatch = useDispatch()
    const [currentPoint, setCurrentPoint] = useState(null)
    const [yamps, setYamps] = useState(null)

    useEffect(() => {
        if(town && point){
            yamps.geocode(`${town}, ${point}`)
                .then(result => 
                setCurrentPoint(result.geoObjects._collectionComponent._baseArrayComponent._children[0].geometry._coordinates))
        }
    }, [town, point])

    const mapPointHandler = () => {
        
        if(currentPoint !== null){
            yamps.geocode(currentPoint)
                .then(res => {
                        var nearest = res.geoObjects.get(0);
                        setTown(nearest.properties.get("description").split(", ")[1]);
                        setPoint(nearest.properties.get("name"))
                        console.log()
                    }
                )
        }else{
            yamps.geocode([54.312280, 48.395406])
                .then(res => {
                        var nearest = res.geoObjects.get(0);
                        setTown(nearest.properties.get("description").split(", ")[1]);
                        setPoint(nearest.properties.get("name"))
                        console.log()
                    }
                )
        }
    }

    return(
            <YMaps
                query={{ 
                    lang: 'ru_RU',
                    apikey: "33acfd5b-ed70-42eb-9384-bf3e617c248b"
                }}
            >
                <div className={classes.map_form}>
                    <Map
                        modules={["geocode"]}
                        onLoad={(ymaps) => {setYamps(ymaps)}}
                        state={{center: currentPoint ? currentPoint : [54.312280, 48.395406], zoom: 13}}
                        width={"100%"}
                        height={"352px"}
                    >
                        <Placemark 
                            options={{preset:'islands#circleIcon', iconColor:"#0EC261"}}
                            iconColor='#3caa3c'
                            geometry={currentPoint ? currentPoint : [54.312280, 48.395406]}
                            onClick={() => mapPointHandler()}
                        />
                    </Map>
                </div>
            </YMaps>
    )
}

export default Maps;
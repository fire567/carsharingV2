import React, { useEffect, useState } from "react";
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import classes from "./Map.module.css";

const Maps = ({town, point}) => {
    const [currentPoint, setCurrentPoint] = useState(null)
    const [yamps, setYamps] = useState(null)

    useEffect(() => {
        if(town && point){
            yamps.geocode(`${town}, ${point}`)
                .then(result => 
                setCurrentPoint(result.geoObjects._collectionComponent._baseArrayComponent._children[0].geometry._coordinates))
        }
    }, [town, point])

    return(
            <YMaps
                query={{ 
                    lang: 'en_RU',
                    apikey: "33acfd5b-ed70-42eb-9384-bf3e617c248b"
                }}
            >
                <div className={classes.map_form}>
                    <Map
                        modules={["geocode"]}
                        onLoad={(ymaps) => {setYamps(ymaps)}}
                        defaultState={{ center: [54.328, 48.386], zoom: 13 }} 
                        state={{center: currentPoint ? currentPoint : [54.328, 48.386], zoom: 13}}
                        width={"100%"}
                        height={"352px"}
                    >
                        <Placemark 
                            options={{preset:'islands#circleIcon', iconColor:"#0EC261"}}
                            iconColor='#3caa3c'
                            defaultGeometry={[54.328, 48.386]}
                            geometry={currentPoint}
                        />
                    </Map>
                </div>
            </YMaps>
    )
}

export default Maps;
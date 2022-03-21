import React, { useEffect, useState } from "react";
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import classes from "./Map.module.css";

const Maps = ({town, point}) => {
    const [test, setTest] = useState(null)
    const [yamps, setYamps] = useState(null)
    const [asd, setAsd] = useState(null)

    useEffect(() => {
        if(town && point){
            yamps.geocode(`${town}, ${point}`)
                .then(result => 
                setTest(result.geoObjects._collectionComponent._baseArrayComponent._children[0].geometry._coordinates))
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
                        onLoad={(ymaps) =>
                            {setYamps(ymaps)
                                console.log("asd")
                            }}
                        defaultState={{ center: [54.209465, 45.114777], zoom: 13 }} 
                        state={{center: test ? test : [54.209465, 45.114777], zoom: 13}}
                        width={"100%"}
                        height={"352px"}
                    >
                        <Placemark 
                            defaultGeometry={[54.209465, 45.114777]}
                            geometry={test}
                        />
                    </Map>
                </div>
            </YMaps>
    )
}

export default Maps;
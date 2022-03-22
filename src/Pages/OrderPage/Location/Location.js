import React, {useState, useEffect} from "react";
import LocationInput from "../../../Components/LocationInput/LocationInput";
import Maps from "../../../Components/Map/Maps";
import { getCities, getPoint, setLocation } from "../../../Redux/actions";
import { useSelector, useDispatch } from "react-redux";
import classes from "./Location.module.css";

const Location = () => {
    const dispatch = useDispatch()
    const cities = useSelector((state) => state.cities);
    const points = useSelector((state) => state.point);
    const [filteredPoints, setFilteredPoints] = useState(null)
    const [filteredCities, setFilteredCities] = useState(null)
    const [town, setTown] = useState("");
    const [point, setPoint] = useState("");
    const location = useSelector((state) => state.location)

    useEffect(() => {
        dispatch(getCities())
        dispatch(getPoint())
    }, [])

    useEffect(() => {
        if(town && cities && points){
            setFilteredPoints(points.data.filter((item) => item.cityId ? item.cityId.name === town : null))
        }else{
            setFilteredPoints(points)
        }

        if(town){
            setFilteredCities(cities.data.filter(item => item.name.toLowerCase().includes(town.toLowerCase())))
        }else{
            setFilteredCities(cities.data)
        }
    }, [town, cities])

    useEffect(() => {
        if(town && point){
            dispatch(setLocation({
                town: town, 
                point: point,
            }))
        }else{
            dispatch(setLocation(null))
        }
    }, [town, point])

    console.log(location)

    return(
        cities.data && points.data ?
            <>
                <div className={classes.input_form}>
                    <LocationInput 
                        label={"Город"} 
                        placeholder={"город"} 
                        setText={setTown} 
                        text={town} 
                        items={filteredCities ? filteredCities : cities.data}
                        disabled={false}
                    />
                    <LocationInput 
                        label={"Пункт выдачи"} 
                        placeholder={"пункт"} 
                        setText={setPoint} 
                        text={point} 
                        items={filteredPoints} 
                        disabled={town ? false : true}
                    />
                </div>
                <div className={classes.map_part}>
                    <Maps town={town} point={point}/>
                </div>
            </> 
        : null
    )
}

export default Location;
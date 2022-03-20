import React, {useState, useEffect} from "react";
import LocationInput from "../../../Components/LocationInput/LocationInput";
import Map from "../../../Components/Map/Map";
import { getCities, getPoint } from "../../../Redux/actions";
import { useSelector, useDispatch } from "react-redux";
import classes from "./Location.module.css";

const Location = () => {
    const dispatch = useDispatch()
    const cities = useSelector((state) => state.cities);
    const points = useSelector((state) => state.point);
    const [filteredPoints, setFilteredPoints] = useState(null)
    const [town, setTown] = useState("");
    const [point, setPoint] = useState("");

    useEffect(() => {
        dispatch(getCities())
        dispatch(getPoint())
    }, [])

    useEffect(() => {
        if(town.length > 1 && cities && points){
            setFilteredPoints(points.data.filter((item) => item.cityId ? item.cityId.name === town : null))
        }else{
            setFilteredPoints(points)
        }
    }, [town, cities])

    return(
        cities.data && points.data ?
            <>
                <div className={classes.input_form}>
                    <LocationInput 
                        label={"Город"} 
                        placeholder={"город"} 
                        setText={setTown} 
                        text={town} 
                        items={cities.data}
                        disabled={false}
                    />
                    <LocationInput 
                        label={"Пункт выдачи"} 
                        placeholder={"пункт"} 
                        setText={setPoint} 
                        text={point} 
                        items={filteredPoints} 
                        disabled={town.length > 1 ? false : true}
                    />
                </div>
                <div className={classes.map_part}>
                    <Map />
                </div>
            </> 
        : null
    )
}

export default Location;
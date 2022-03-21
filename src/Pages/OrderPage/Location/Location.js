import React, {useState, useEffect} from "react";
import LocationInput from "../../../Components/LocationInput/LocationInput";
import Maps from "../../../Components/Map/Maps";
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

    console.log(town)
    console.log(point)

    useEffect(() => {
        if(town && cities && points){
            setFilteredPoints(points.data.filter((item) => item.cityId ? item.cityId.name === town : null))
        }else{
            setFilteredPoints(points)
        }
    }, [town, cities])

    //<Maps town={town.name} point={point.address}/>

    return(
        cities.data && points.data ?
            <>
                <div className={classes.input_form}>
                    <LocationInput 
                        label={"Город"} 
                        placeholder={"город"} 
                        setText={setTown} 
                        text={town.name ? town.name : town} 
                        items={cities.data}
                        disabled={false}
                    />
                    <LocationInput 
                        label={"Пункт выдачи"} 
                        placeholder={"пункт"} 
                        setText={setPoint} 
                        text={point.name ? point.name : point} 
                        items={filteredPoints} 
                        disabled={town ? false : true}
                    />
                </div>
                <div className={classes.map_part}>
                    
                </div>
            </> 
        : null
    )
}

export default Location;
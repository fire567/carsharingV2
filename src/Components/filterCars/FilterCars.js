import React from "react";
import classes from "./FilterCars.module.css";

const FilterCars = ({name, setIsPopUpOpened}) => {

    const filterBtnHabdler = () => {
        setIsPopUpOpened(true)
    }

    return (
        <div className={classes.filter_item_form}>
            <div className={classes.circle} onClick={() => filterBtnHabdler()}></div>
            <div className={classes.filter_item_name}>
                {name}
            </div>
        </div>
    )
}

export default FilterCars;
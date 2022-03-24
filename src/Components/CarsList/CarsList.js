import React from "react";
import classes from "./CarsList.module.css";

const CarsList = () => {
    return(
        <div className={classes.car_form}>
            <div className={classes.model_name}>ELANTRA</div>
            <div className={classes.price}>12 000 - 25 000 ₽</div>
        </div>
    )
}

export default CarsList;
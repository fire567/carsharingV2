import React from "react";
import { useSelector } from "react-redux";
import { links } from "../../consts";
import classes from "./OrderInf.module.css";

const OrderInf = ({match}) => {
    const location = useSelector((state) => state.location)

    const buttonHandler = () => {
        let currentValue = "";
        const filteredLinks = links.filter((item) => item.link === match.params.name)

        if(filteredLinks.id + 1 !== 3){ 
            currentValue = links[filteredLinks[0].id + 1].name
        }else{
            currentValue = "Заказать"
        }

        return currentValue
    }

    return(
    <>
        <div className={classes.order_inf_header}>
            Ваш заказ:
        </div>
        <div className={classes.all_order_inf}>
            <div className={location === null ? classes.order_inf_hidden : classes.order_inf}>
                <div className={classes.inf_name}>
                    Пункт выдачи
                </div>
                <div className={classes.dots_style}>
                </div>
                <div className={classes.inf_value}>
                    {location ? `${location.town}, ${location.point}` : null}
                </div>
            </div>
            <div className={classes.order_price_inf}>
                <div className={classes.order_price_header}>
                    Цена:
                </div>
                <div className={classes.order_price}>
                    от 8000 до 12000 ₽
                </div>
            </div>
            <button className={classes.order_inf_btn}>
                {buttonHandler()}
            </button>
        </div>
    </>
    )
}

export default OrderInf;
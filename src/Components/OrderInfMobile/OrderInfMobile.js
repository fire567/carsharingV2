import React from "react";
import exit from "../../assets/exit.svg";
import { ReactSVG } from "react-svg";
import classes from "./OrderInfMobile.module.css";

const OrderInfMobile = ({setIsMobileOpened, infMobileOpened}) => {

    const closeMenuHandler = () => {
        setIsMobileOpened(false)
    }

    return(
        <div className={infMobileOpened ? classes.order_inf_form_mobile : classes.order_inf_form_mobile_closed}>
            <div className={classes.menu_form}>
                <ReactSVG className={classes.exit_btn} src={exit} onClick={() => closeMenuHandler()}/>
                <div className={classes.order_inf_form}>
                    <div className={classes.order_inf_header}>
                        Ваш заказ:
                    </div>
                    <div className={classes.all_order_inf}>
                        <div className={classes.order_inf}>
                            <div className={classes.inf_name}>
                                Пункт выдачи
                            </div>
                            <div className={classes.dots_style}>
                            </div>
                            <div className={classes.inf_value}>
                                Ульянова, Наримовск 42
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
                            Забронировать
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderInfMobile;
import React, {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { links } from "../../consts";
import classes from "./OrderInf.module.css";

const OrderInf = ({match}) => {
    const location = useSelector((state) => state.location)
    const history = useHistory()
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)

    const buttonHandler = () => {
        let nextValue = "";
        const filteredLinks = links.filter((item) => item.link == match.params.name)

        if(filteredLinks[0].id + 1 <= 3){ 
            nextValue = links[filteredLinks[0].id + 1].name
        }else{
            nextValue = "Заказать"
        }

        return nextValue
    }

    const linkHandler = () => {
        const filteredLinks = links.filter((item) => item.link == match.params.name)

        if(filteredLinks[0].id + 1 <= 3){ 
            history.push(`${links[filteredLinks[0].id + 1].link}`)
        }
    }

    useEffect(() => {
        if(match.params.name === "location"){
            location !== null ? setIsButtonDisabled(false) : setIsButtonDisabled(true)
        }
    }, [location])

    /*Вставлю на странице с моделью
        <div className={classes.order_price_inf}>
                <div className={classes.order_price_header}>
                    Цена:
                </div>
                <div className={classes.order_price}>
                    от 8000 до 12000 ₽
                </div>
            </div>
    */

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
            
            <button 
                disabled={isButtonDisabled} 
                className={isButtonDisabled ? classes.order_inf_btn_disabled : classes.order_inf_btn}
                onClick={() => linkHandler()}
            >
                {buttonHandler()}
            </button>
        </div>
    </>
    )
}

export default OrderInf;
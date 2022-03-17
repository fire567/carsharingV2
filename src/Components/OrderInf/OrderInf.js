import React from "react";
import "./OrderInf.css";

const OrderInf = () => {
    return(
    <>
        <div className="order-inf-header">
            Ваш заказ:
        </div>
        <div className="all-order-inf">
            <div className="order-inf">
                <div className="inf-name">
                    Пункт выдачи
                </div>
                <div className="dots-style">
                </div>
                <div className="inf-value">
                    Ульянова, Наримовск 42
                </div>
            </div>
            <div className="order-price-inf">
                <div className="order-price-header">
                    Цена:
                </div>
                <div className="order-price">
                    от 8000 до 12000 ₽
                </div>
            </div>
            <button className="order-inf-btn">
                Забронировать
            </button>
        </div>
    </>
    )
}

export default OrderInf;
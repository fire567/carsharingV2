import React from "react";
import car1 from "../../../assets/car1.svg";
import car2 from "../../../assets/car2.svg";
import car3 from "../../../assets/car3.svg";
import car4 from "../../../assets/car4.svg";
import "./Slides.css";


const Slides = ({position}) => {

    const carouselItems = [
        {
            id: 0, 
            header: "Бесплатная парковка", 
            text:"Оставляйте машину на платных городских парковках и разрешенных местах, не нарушая ПДД, а также в аэропортах.",
            color: "linear-gradient(90deg, #13493F 0%, #0C7B1B 100%)",
            img: car1,
        },
        {
            id: 1, 
            header: "Страховка", 
            text:"Полная страховка страховка автомобиля",
            color: "linear-gradient(90deg, #132949 0%, #0C7B67 100%)",
            img: car2,
        },
        { 
            id:2, 
            img:car3,
            header:"Бензин", 
            text:"Полный бак на любой заправке города за наш счёт",
            color:"linear-gradient(90deg, #493013 0%, #7B0C3B 100%)"
        },
        { 
            id:3, 
            img:car4,
            header:"Обслуживание", 
            text:"Автомобиль проходит еженедельное ТО",
            color:"linear-gradient(90deg, #281349 0%, #720C7B 100%)"
         }
    ]

    return(
        carouselItems.map((item) => (
            <div className="carousel-content" key={item.id} style={{backgroundImage: `url(${item.img})`, transform: `translateX(${position}%)`}}>
                <div className="dark-background"></div>
                <div className="content-part">
                    <div className="carousel-header">
                        {item.header}
                    </div>
                    <div className="carousel-text">
                        {item.text}
                    </div>
                    <button className="carousel-btn" style={{background: `${item.color}`}}>
                        Подробнее
                    </button>
                </div>
            </div>
        ))
    )
}

export default Slides;
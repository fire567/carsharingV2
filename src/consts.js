import car1 from "./assets/car1.svg";
import car2 from "./assets/car2.svg";
import car3 from "./assets/car3.svg";
import car4 from "./assets/car4.svg";

export const RIGHT_DIRECTION = "right"
export const LEFT_DIRECTION = "left"

export const carouselItems = [
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
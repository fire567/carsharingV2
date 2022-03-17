import React, {useState} from "react";
import Slides from "./Slides/Slides";
import {RIGHT_DIRECTION} from "../../consts"
import "./Carousel.css";

const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0)

    const changeSlideHandler = (direction) => {
        direction === RIGHT_DIRECTION ?  setCurrentSlide(
            currentSlide !== -300 ? currentSlide - 100 : 0
        ) : setCurrentSlide(
            currentSlide !== 0 ? currentSlide + 100 : -300) 
    }

    const dots = [
        {id:0, pos: 0},
        {id:1, pos: -100},
        {id:2, pos: -200},
        {id:3, pos: -300},
    ]

    return(
        <div className="carousel-form">
            <Slides position={currentSlide}/>
            <div className="carousel-dots">
                {dots.map((dot) => (
                    <div className={currentSlide === dot.pos ? "active-dot" : "dot"} key={dot.id} onClick={() => setCurrentSlide(dot.pos)}></div>
                ))}
            </div>
            <div className="left-btn" onClick={() => changeSlideHandler("left")}>
                <div className="left-arrow"></div>
            </div>
            <div className="right-btn" onClick={() => changeSlideHandler("right")}>
                <div className="right-arrow"></div>
            </div>
        </div>
    )
}

export default Carousel;
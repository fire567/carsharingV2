import React, {useState} from "react";
import Slides from "./Slides/Slides";
import {RIGHT_DIRECTION, LEFT_DIRECTION} from "../../consts"
import classes from "./Carousel.module.css";

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
        <div className={classes.carousel_form}>
            <Slides position={currentSlide}/>
            <div className={classes.carousel_dots}>
                {dots.map((dot) => (
                    <div className={currentSlide === dot.pos ? classes.active_dot : classes.dot} key={dot.id} onClick={() => setCurrentSlide(dot.pos)}></div>
                ))}
            </div>
            <div className={classes.left_btn} onClick={() => changeSlideHandler(LEFT_DIRECTION)}>
                <div className={classes.left_arrow}></div>
            </div>
            <div className={classes.right_btn} onClick={() => changeSlideHandler(RIGHT_DIRECTION)}>
                <div className={classes.right_arrow}></div>
            </div>
        </div>
    )
}

export default Carousel;
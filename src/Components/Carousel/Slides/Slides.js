import React from 'react';
import { carouselItems } from '../../../consts';
import classes from './Slides.module.css';

const Slides = ({ position }) => (
  carouselItems.map((item) => (
            <div className={classes.carousel_content} key={item.id} style={{ backgroundImage: `url(${item.img})`, transform: `translateX(${position}%)` }}>
                <div className={classes.dark_background}/>
                <div className={classes.content_part}>
                    <div className={classes.carousel_header}>
                        {item.header}
                    </div>
                    <div className={classes.carousel_text}>
                        {item.text}
                    </div>
                    <button className={classes.carousel_btn} style={{ background: `${item.color}` }}>
                        Подробнее
                    </button>
                </div>
            </div>
  ))
);

export default Slides;

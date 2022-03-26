import React from 'react';
import loading from '../../assets/loading.svg';
import classes from './Loading.module.css';

const Loading = () => (
  <div className={classes.img_form}>
      <div className={classes.img} style={{ backgroundImage: `url(${loading})` }}></div>
  </div>
);

export default Loading;

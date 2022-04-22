import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { postOrder } from '../../Redux/actions';
import MainPageContent from './MainPageContent/MainPageContent';
import Carousel from '../../Components/Carousel/Carousel';
import classes from './MainPage.module.css';

const MainPage = ({ setIsOpened }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postOrder(null));
  }, []);

  return (
    <div className={classes.main_page_form}>
      <Sidebar setIsOpened={setIsOpened} />
      <MainPageContent />
      <Carousel />
    </div>
  );
};

export default MainPage;

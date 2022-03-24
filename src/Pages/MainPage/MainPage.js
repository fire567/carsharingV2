import React from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import MainPageContent from './MainPageContent/MainPageContent';
import Carousel from '../../Components/Carousel/Carousel';
import classes from './MainPage.module.css';

// eslint-disable-next-line react/prop-types
const MainPage = ({ setIsOpened }) => (
        <div className={classes.main_page_form}>
            <Sidebar setIsOpened={setIsOpened}/>
            <MainPageContent />
            <Carousel />
        </div>
);

export default MainPage;

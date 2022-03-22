import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import MainPageContent from "./MainPageContent/MainPageContent";
import Carousel from "../../Components/Carousel/Carousel";
import classes from "./MainPage.module.css";

const MainPage = ({setIsOpened}) => {
    return(
        <div className={classes.main_page_form}>
            <Sidebar setIsOpened={setIsOpened}/>
            <MainPageContent />
            <Carousel />
        </div>
    )
}

export default MainPage;
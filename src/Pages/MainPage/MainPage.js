import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import MainPageContent from "./MainPageContent/MainPageContent";
import Carousel from "../../Components/Carousel/Carousel";
import "./MainPage.css";

const MainPage = ({setIsOpened}) => {
    return(
        <div className="main-page-form">
            <Sidebar setIsOpened={setIsOpened}/>
            <MainPageContent />
            <Carousel />
        </div>
    )
}

export default MainPage;
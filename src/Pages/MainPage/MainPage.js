import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import MainPageContent from "../../Components/MainPageContent/MainPageContent";
import Carousel from "../../Components/Carousel/Carousel";
import "./MainPage.css";

const MainPage = () => {
    return(
        <div className="main-page-form">
            <Sidebar />
            <MainPageContent />
            <Carousel />
        </div>
    )
}

export default MainPage;
import React, {useState} from "react"
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import NavBar from "../../Components/NavBar/NavBar";
import Location from "./Location/Location";
import OrderInf from "../../Components/OrderInf/OrderInf";
import { Route } from "react-router-dom";
import "./OrderPage.css";

const OrderPage = ({match}) => {

    return(
        <div className="order-page-form">
            <Sidebar/>
            <div className="page-form">
                <div className="page-header">
                    <Header />
                </div>
                <NavBar match={match.params}/>
                <div className="order-page-content-form">
                    <div className="content-form">
                        <Route path="/order-page/location" exact> 
                            <Location />
                        </Route>
                    </div>
                    <div className="order-inf-form">
                        <OrderInf />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderPage;
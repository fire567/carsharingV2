import React, {useState} from 'react';
import MainPage from './Pages/MainPage/MainPage';
import Menu from './Components/Menu/Menu';
import { Route } from 'react-router-dom';
import { HashRouter } from "react-router-dom";
import OrderPage from './Pages/OrderPage/OrderPage';
import './App.css';

const App = () => {
  const [isOpened, setIsOpened] = useState(false)

  console.log(isOpened)

  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Route path="/" exact>
            <MainPage setIsOpened={setIsOpened}/>
        </Route>
        <Route path="/order-page/:name" component={OrderPage} exact/>
        <Menu setIsOpened={setIsOpened} isOpened={isOpened}/>
      </div>
    </HashRouter>
  );
}

export default App;

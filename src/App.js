import React, {useState} from 'react';
import MainPage from './Pages/MainPage/MainPage';
import Menu from './Components/Menu/Menu';
import { Route } from 'react-router-dom';
import { HashRouter } from "react-router-dom";
import classes from "./App.module.css";

const App = () => {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <div className={classes.app}>
        <Route path="/" exact>
            <MainPage setIsOpened={setIsOpened}/>
        </Route>
      <Menu setIsOpened={setIsOpened} isOpened={isOpened}/>
      </div>
    </HashRouter>
  );
}

export default App;

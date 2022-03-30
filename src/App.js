import React, { useState } from 'react';
import { Route, HashRouter } from 'react-router-dom';
import MainPage from './Pages/MainPage/MainPage';
import Menu from './Components/Menu/Menu';
import OrderPage from './Pages/OrderPage/OrderPage';
import classes from './App.module.css';

const App = () => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <div className={classes.app}>
        <Route path="/" exact>
          <MainPage setIsOpened={setIsOpened} />
        </Route>
        <Route
          path="/order-page/:name"
          render={(props) => <OrderPage {...props} setIsOpened={setIsOpened} />}
          exact
        />
        <Menu setIsOpened={setIsOpened} isOpened={isOpened} />
      </div>
    </HashRouter>
  );
};

export default App;

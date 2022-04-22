import React, { useState } from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';
import MainPage from './Pages/MainPage/MainPage';
import Menu from './Components/Menu/Menu';
import OrderPage from './Pages/OrderPage/OrderPage';
import CurrentOrder from './Pages/CurrentOrder/CurrentOrder';
import classes from './App.module.css';

const App = () => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <div className={classes.app}>
        <Switch>
          <Route path='/' exact>
            <MainPage setIsOpened={setIsOpened} />
          </Route>
          <Route
            path='/order-page/:name'
            render={(props) => (
              <OrderPage {...props} setIsOpened={setIsOpened} />
            )}
            exact
          />
          <Route
            path='/order/:id'
            render={(props) => (
              <CurrentOrder {...props} setIsOpened={setIsOpened} />
            )}
            exact
          />
        </Switch>
        <Menu setIsOpened={setIsOpened} isOpened={isOpened} />
      </div>
    </HashRouter>
  );
};

export default App;

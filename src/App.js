import React from 'react';
import MainPage from './Pages/MainPage/MainPage';
import Menu from './Components/Menu/Menu';
import { connect } from 'react-redux';
import './App.css';

function App({isMenuOpened}) {
  return (
    <div className="App">
      <MainPage />
      <Menu />
    </div>
  );
}

const mapStateToProps = (state) => {
  return{
    isMenuOpened: state.isMenuOpened,
  }
}

export default connect(mapStateToProps)(App);

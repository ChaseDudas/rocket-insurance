import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.scss';
import './styles/RocketInsuranceScreens.scss'
import RatingInformationScreen from './pages/RatingInformationScreen';
import QuoteOverviewScreen from './pages/QuoteOverviewScreen';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <Router>
      <Switch>
        <Route exact path='/'>
            <RatingInformationScreen />
        </Route>
        <Route path='/overview'>
            <QuoteOverviewScreen />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

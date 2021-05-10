import React from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.scss';
import './styles/RocketInsuranceScreens.scss'
import RatingInformationScreen from './pages/RatingInformationScreen';
import QuoteOverviewScreen from './pages/QuoteOverviewScreen';

function App() {
  return (
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

import React from 'react';
import { Route, Switch } from 'react-router-dom'
import WelcomeScreen from './screens/WelcomeScreen';
import UserScreen from './screens/UserScreen';
import HallOfFameScreen from './screens/HallOfFameScreen';
import SRBWelcomeScreen from './screens/SRBWelcomeScreen';
import SRBUserScreen from './screens/SRBUserScreen';
import SRBHallOfFameScreen from './screens/SRBHallOfFameScreen';


import './App.scss';

function App() {
  return (
    <div className="app-screen-container">
      <Switch>
        <Route exact path='/' component={WelcomeScreen} />
        <Route exact path='/user-screen' component={UserScreen} />
        <Route exact path='/hall-of-fame' component={HallOfFameScreen} />
        <Route exact path='/srb' component={SRBWelcomeScreen} />
        <Route exact path='/srb/user-screen' component={SRBUserScreen} />
        <Route exact path='/srb/hall-of-fame' component={SRBHallOfFameScreen} />
      </Switch>
    </div>
  );
}

export default App;

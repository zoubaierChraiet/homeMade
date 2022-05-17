import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/header/Header';
import HomeComponent from './components/main/home/Home';
import { Menus } from './components/main/menus/Menus';
import { Chief } from './components/main/chief/Chief';
import { Profile } from './components/main/profile/Profile';

export default function SignInSide() {
  return (
    <React.Fragment>
      <Header />
      <div style={{ marginTop: 65 }}></div>
      <Router>
        <Switch>
          <Route exact path="/" component={HomeComponent} />
          <Route exact path="/menus" component={Menus} />
          <Route exact path="/profile/:id" component={Profile} />
          <Route exact path="/menus/:id" component={Chief} />
        </Switch>
      </Router>
      {/* <Footer /> */}
    </React.Fragment>
  );
}

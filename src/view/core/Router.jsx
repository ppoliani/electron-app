import React from 'react';
import {Route, HashRouter} from 'react-router-dom';
import Home from '../pages/home';
import AboutUs from '../pages/about-us';

 const RouterComponent = () => (
  <HashRouter>
    <Route path="/" exact component={Home} />
    <Route path="/about-us"  component={AboutUs} />
  </HashRouter>
 )

 export default RouterComponent

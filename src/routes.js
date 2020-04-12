import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

export default (props) => (
    <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/dashboard' exact component={Home} />
        <Route component={NotFound} />
    </Switch>
);
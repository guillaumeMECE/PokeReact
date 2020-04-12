import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Pokemon from './pages/Pokemon';
import NotFound from './pages/NotFound';

export default (props) => (
    <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/pokemon' exact component={Home} />
        <Route path='/pokemon/:name' exact component={Pokemon} />
        <Route component={NotFound} />
    </Switch>
);
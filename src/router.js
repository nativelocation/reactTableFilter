import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './layouts/Home';

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={Home} />
		</Switch>
	</BrowserRouter>
);

export default Routes;

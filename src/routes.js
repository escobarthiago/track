import React from 'react';
import App from './App';
import { Route, IndexRoute, Redirect } from 'react-router';
import Home from './containers/Home';
import Timetable from './containers/Timetable';
import HoursControl from './containers/HoursControl';
import FinancialControl from './containers/FinancialControl';
import Files from './containers/Files';
import Login from './containers/Login';


export default (
    <Route> 
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
			<Route path="/login" component={Login} />
            <Route path="timetable" component={Timetable} />
			<Route path="controle-de-horas" component={HoursControl} />
			<Route path="controle-financeiro" component={FinancialControl} />
			<Route path="pecas" component={Files} />
        </Route>
        <Route path="/error" component={() => <div>Error</div>} />
        <Redirect from="*" to="/error" />
    </Route>
);

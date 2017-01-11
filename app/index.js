import 'babel-polyfill';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';

import { hashHistory, Router, Route, IndexRoute} from 'react-router'

import BaseInfo from './components/account/BaseInfo/BaseInfo';
import ChangePassword from './components/account/ChangePassword/ChangePassword';
import InfoCenter from './components/infocenter/InfoCenter';
import Nav from './components/nav/Nav';

import {Provider} from 'react-redux';
import generatorStore from './redux/store';
const store = generatorStore();

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Router history={hashHistory}>
					<Route path="/" component={Nav}>
						<IndexRoute component={BaseInfo}/>
						<Route path="infocenter" component={InfoCenter} />
					</Route>
				</Router>
			</Provider>
		);
	}
}

const app = document.createElement('div');
const scripts = document.getElementsByTagName('script');
document.body.insertBefore(app, scripts[0]);
ReactDOM.render(<App />, app);

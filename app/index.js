import 'babel-polyfill';
import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';

import { hashHistory, Router, Route, IndexRoute} from 'react-router'

import Nav from './components/NAV/Nav';
import A from './components/A/A';
import B from './components/B/B';

import {Provider} from 'react-redux';
import generatorStore from './redux/store';
const store = generatorStore();

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Router history={hashHistory}>
					<Route path="/" component={Nav}>
						<IndexRoute component={A}/>
						<Route path="left" component={A} />
						<Route path="right" component={B} />
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

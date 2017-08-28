/**
 * Created by Administrator on 2017/8/28.
 */
import "babel-polyfill";
import "./index.less";

import React from 'react';
import ReactDOM from 'react-dom';

import { hashHistory} from 'react-router'

import generatorStore from './redux/store';
import {Provider} from 'react-redux';

import RouterComponent from './container/RouterComponent';

class App extends React.Component {
	render() {
		return (
			<Provider store={generatorStore()}>
				<RouterComponent history={hashHistory} />
			</Provider>
		);
	}
}

const app = document.createElement('div');
const scripts = document.getElementsByTagName('script');
document.body.insertBefore(app, scripts[0]);
ReactDOM.render(<App />, app);

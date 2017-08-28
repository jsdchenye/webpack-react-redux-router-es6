/**
 * Created by Administrator on 2017/8/28.
 */
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import index from './reducers/index';

export default function generatorStore() {
	return createStore(combineReducers(index),applyMiddleware(thunk));
}
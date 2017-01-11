import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import index from './reducer/index';

export default function generatorStore() {
	return createStore(index,applyMiddleware(thunk));
}
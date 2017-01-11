import { combineReducers } from 'redux';
import accountReducer from './accountReducer';
import channelReducer from './channelReducer';

const index = combineReducers({
	accountReducer,
	channelReducer,
});

export default index;
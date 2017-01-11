import {
	
} from '../constants';

const defaultState = {
	
};

const channelReducer = (state=defaultState,action)=> {
	switch (action.type) {
		case 'FETCH_CITY_SOURCE':
			return state;
		default:
			return state;
	}
};
export default channelReducer;
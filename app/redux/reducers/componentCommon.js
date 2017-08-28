import {
	INCREASE_NUM,
	DECREASE_NUM,
} from '../constants';

const defaultState = {
	number: 0,
};
const componentLeft = (state=defaultState, action)=>{
	switch(action.type) {
		case 'INCREASE_NUM':
			return {
				...state,
				number: action.param,
			};
			break;
		
		case 'DECREASE_NUM':
			return {
				...state,
				number: action.param,
			};
			break;
			
		default:
			return state;
	}
};

export default componentLeft;
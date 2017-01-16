import {
	EDIT_NUMBER,
} from '../constants';

const defaultState = {
	initNum: 10,  //默认初始化number为10，
};

const reducer = (state=defaultState,action)=> {
	switch (action.type) {
		case 'EDIT_NUMBER':
			return {
				...state,
				initNum: action.param,
			};
		default:
			return state;
	}
};
export default reducer;
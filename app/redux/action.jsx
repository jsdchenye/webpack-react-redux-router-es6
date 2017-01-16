import ajaxPromise from '../lib/ajaxPromise';
import {
	EDIT_NUMBER,
} from './constants';

//修改输入框中的number值
export const editNumber = (value,flag)=> {
	return (dispatch)=> {
		dispatch({
			type: EDIT_NUMBER,
			param: (flag == 'increase' ? parseInt(value) + 1 : parseInt(value) - 1),
		});
	}
};

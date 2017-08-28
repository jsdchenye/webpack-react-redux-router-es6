/**
 * Created by Administrator on 2017/8/28.
 */
import ajaxPromise from '../../lib/ajaxPromise';  //预留用来进行数据获取

import {
	DECREASE_NUM,
} from './../constants';

//减少输入框中的number值
export const decreaseNum = (value)=>{
	return (dispatch)=> {
		dispatch({
			type: DECREASE_NUM,
			param: parseInt(value) - 1,
		});
	}
};
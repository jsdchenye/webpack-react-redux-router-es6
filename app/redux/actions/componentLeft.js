/**
 * Created by Administrator on 2017/8/28.
 */
import ajaxPromise from '../../lib/ajaxPromise';  //预留用来进行数据获取

import {
	INCREASE_NUM,
} from './../constants';

//增加输入框中的number值
export const increaseNum = (value)=>{
	return (dispatch)=>{
		dispatch({
			type: INCREASE_NUM,
			param: parseInt(value) + 1,
		})
	}
};

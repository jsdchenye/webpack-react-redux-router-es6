import ajaxPromise from '../lib/ajaxPromise';
import { notification } from 'antd';
import {
	FETCH_BASE_INFO,
	FETCH_NOTICE_INFO,
	FETCH_INIT_PWD,
	UPDATE_BASE_INFO,
	SET_SIDE_BAR_STATE,
} from './constants';

/*------- 获取数据源的 -------*/
//获取基本信息
export const fetchBaseInfo = ()=>{
	return async(dispatch)=> {
		let meta = await ajaxPromise('/account/query',{
			type: 'POST',
		});
		dispatch({
			type: FETCH_BASE_INFO,
			param: meta.data,
		});
	};
};
//获取通知消息
export const fetchNoticeInfo = (value)=>{
	let args = {
		beginIndex: value.begin,
		length: value.len,
		isNewNotify: value.state,
	};
	return async(dispatch)=> {
		let meta = await ajaxPromise('/account/notify',{
			type: 'POST',
			args: args,
		});
		dispatch({
			type: FETCH_NOTICE_INFO,
			param: meta.data,
			flag: (value.len == -1) ? true : false,
		});
	};
};
//获取原始密码操作
export const fetchInitPwd = ()=> {
	return async(dispatch)=>{
		let meta = await ajaxPromise('/dim/oldPwd',{
			type: 'POST',
		});
		dispatch({
			type: FETCH_INIT_PWD,
			param: meta.data,
		});
	};
};


/*------- 设置数据的 -------*/
//修改联系人信息
export const updateBaseInfo = (value)=>{
	let args = {
		contactPerson: value.linker,
		contactPhone: value.tel,
		emailAddress: value.email,
	};
	return async(dispatch)=>{
		let meta = await ajaxPromise('/account/update',{
			type: 'POST',
			args: args,
		});
		if(meta.status) {
			notification['success']({
				message: '提示',
				description: meta.msg,
				duration: 3,
			});
			dispatch({
				type: UPDATE_BASE_INFO,
				param: value,
			});
		}
	};
};
//修改密码操作
export const changePassword = (value)=>{
	let args = {
		pwd: value.oldPassword,
		newPwd: value.newPassword,
		rePwd: value.confirmPassword,
	};
	return async(dispatch)=>{
		let meta = await ajaxPromise('/account/changePwd',{
			type: 'POST',
			args: args,
		});
		if(meta.status) {
			dispatch(setSideBarState({  //密码设置成功，重新恢复侧边栏可点击
				baseInfo: false,
				editPwd: false,
				channelReport: false,
				infoCenter: false,
			}));
			notification['success']({
				message: '提示',
				description: meta.msg,
				duration: 3,
			});
		}else {
			notification['error']({
				message: '提示',
				description: meta.msg,
				duration: 3,
			});
		}
	};
};
//设置已读通知消息标识
export const setReadInfo = (value)=>{
	let args ={
		id: value,
	};
	return async(dispatch)=>{
		let meta = await ajaxPromise('/account/notify/markRead',{
			type: 'POST',
			args: args,
		});
	};
};
//设置侧边栏的"可选"状态
export const setSideBarState = (value)=> {
	let meta = value;
	return (dispatch)=> {
		dispatch({
			type: SET_SIDE_BAR_STATE,
			param: meta,
		});
	}
};

import {
	FETCH_BASE_INFO,
	FETCH_NOTICE_INFO,
	FETCH_INIT_PWD,
	
	UPDATE_BASE_INFO,
	SET_SIDE_BAR_STATE,
} from '../constants';

const defaultState = {
	alertInfoSource: {},  //"弹窗"的消息数据源
	baseInfoSource: {},  //"账户管理"中的基本信息数据源
	noticeInfoSource: {},  //"通知中心"的通知信息数据源
	initPwd: '',  //"修改密码"中获取对应用户的初始密码
	sidebarMenuState: {baseInfo: false, editPwd: false, channelReport: false, infoCenter: false},  //侧边栏导航的可选状态
};

const accountReducer = (state=defaultState,action)=> {
	switch (action.type) {
		case FETCH_BASE_INFO:
			return {
				...state,
				baseInfoSource: action.param,
			};
		case FETCH_NOTICE_INFO:
			if(action.flag) {
				return {
					...state,
					alertInfoSource: action.param,
				};
			}else {
				return {
					...state,
					noticeInfoSource: action.param,
				};
			}
		case FETCH_INIT_PWD:
			return {
				...state,
				initPwd: action.param,
			};
		case UPDATE_BASE_INFO:
			return {
				...state,
				baseInfoSource: {
					...state.baseInfoSource,
					contactPerson: action.param.linker,
					contactPhone: action.param.tel,
					emailAddress: action.param.email,
				}
			};
		case SET_SIDE_BAR_STATE:
			return {
				...state,
				sidebarMenuState: {
					...state.sidebarMenuState,
					baseInfo: action.param.baseInfo,
					editPwd: action.param.editPwd,
					channelReport: action.param.channelReport,
					infoCenter: action.param.infoCenter,
				}
			};
		default:
			return state;
	}
};
export default accountReducer;
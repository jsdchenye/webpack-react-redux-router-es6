import React from 'react';
import {connect} from 'react-redux';
import { Input, Button } from 'antd';
import {
	fetchInitPwd,
	changePassword,
} from '../../../redux/action';
class ChangePassword extends React.Component {
	constructor(props) {
		super(props);
		this.checkInputValue = this.checkInputValue.bind(this);
		this.handleSubmitPasswordEdit = this.handleSubmitPasswordEdit.bind(this);
		
		this.state = {
			inputValue : {oldPassword: '', newPassword: '', confirmPassword: ''},  //用来保存输入框中的内容信息
			tipContent: {oldPassword: '原密码不能为空!', newPassword: '新密码不能为空!', confirmPassword: '确认新密码不能为空!'},  //用来保存提示的内容
			tipState : {oldPassword: false, newPassword: false, confirmPassword: false},   //用来保存提示的状态
		};
	}
	validateValue(id,value) {
		const _this = this;
		let refer = _this.props.initPwd;
		if (id == 'oldPassword') {
			if(!value.length) {  //原密码校验
				_this.setState({tipContent: {
					..._this.state.tipContent,
					oldPassword: '原密码不能为空!'
				}});
				return true;
			}else if(hex_md5(value) != refer) {
				_this.setState({tipContent: {
					..._this.state.tipContent,
					oldPassword: '原密码错误!'
				}});
				return true;
			}else {
				_this.setState({inputValue: {
					..._this.state.inputValue,
					[id]: value,
				}});
				return false;
			}
		} else if (id == 'newPassword') {  //新密码校验
			if(!value.length) {
				_this.setState({tipContent: {
					..._this.state.tipContent,
					newPassword: ' 新密码不能为空!'
				}});
				return true;
			}else if(!(/^\w{8,20}$/).test(value) || (/^\d*$/.test(value)) || (/^[A-Za-z]*$/.test(value)) || (/^_*$/).test(value) ) {
				_this.setState({tipContent: {
					..._this.state.tipContent,
					newPassword: '8到20位字母、数字、_的任意组合!'
				}});
				return true;
			}else if(hex_md5(value) == refer){
				_this.setState({tipContent: {
					..._this.state.tipContent,
					newPassword: ' 新密码不能与原密码相同!'
				}});
				return true;
			}else {
				_this.setState({inputValue: {
					..._this.state.inputValue,
					[id]: value,
				}
				});
				return false;
			}
		} else if (id == 'confirmPassword') {  //确认新密码校验
			console.error(value,value.length);
			if(!value.length) {
				_this.setState({tipContent: {
					..._this.state.tipContent,
					confirmPassword: '确认新密码不能为空!'
				}});
				return true;
			}else if(value != this.state.inputValue.newPassword) {
				_this.setState({tipContent: {
					..._this.state.tipContent,
					confirmPassword: '两次输入的密码不一致!'
				}});
				return true;
			}else {
				_this.setState({inputValue: {
					..._this.state.inputValue,
					[id]: value,
				}
				});
				return false;
			}
		}
	}
	checkInputValue(e) {
		let id = e.target.getAttribute('data-id');
		let value = e.target.value;
		/*----- 根据输入内容，控制tip提示框是否显示 ----*/
		this.setState({
			tipState: {
				...this.state.tipState,
				[id]: this.validateValue(id,value),
			}
		});
	}
	handleSubmitPasswordEdit() {
		let value = this.state.inputValue;
		if(!value.oldPassword.length || !value.newPassword.length || !value.confirmPassword.length) {
			this.setState({
				tipState: {
					...this.state.tipState,
					oldPassword: !value.oldPassword.length,
					newPassword: !value.newPassword.length,
					confirmPassword: !value.confirmPassword.length,
				}
			});
		}else {
			this.props.dispatch(changePassword(value));
		}
	}
	componentWillMount() {
		this.props.dispatch(fetchInitPwd());
	}
	render() {
		const _this = this.state;
		return(
			<div className="content-change-password">
				<div className="change-password-module">
					<div className="change-password-module-title">修改密码</div>
					<div className="change-password-module-index">
						<span className="change-password-module-left">原密码：</span>
						<Input className="change-password-module-right"
						       type="password"
						       data-id="oldPassword"
						       defaultValue={_this.inputValue.oldPassword}
						       onBlur={this.checkInputValue}
						       onChange={this.checkInputValue}
						/>
						{_this.tipState.oldPassword ?
							<span className="change-password-module-tip">{_this.tipContent.oldPassword}</span>
							: ''
						}
					</div>
					<div className="change-password-module-index">
						<span className="change-password-module-left">新密码：</span>
						<Input className="change-password-module-right"
						       type="password"
						       data-id="newPassword"
						       defaultValue={_this.inputValue.newPassword}
						       onBlur={this.checkInputValue}
						       onChange={this.checkInputValue}
						/>
						{_this.tipState.newPassword ?
							<span className="change-password-module-tip">{_this.tipContent.newPassword}</span>
							: ''
						}
					</div>
					<div className="change-password-module-index">
						<span className="change-password-module-left">确认新密码：</span>
						<Input className="change-password-module-right"
						       type="password"
						       data-id="confirmPassword"
						       defaultValue={_this.inputValue.confirmPassword}
						       onBlur={this.checkInputValue}
						       onChange={this.checkInputValue}
						/>
						{_this.tipState.confirmPassword ?
							<span className="change-password-module-tip">{_this.tipContent.confirmPassword}</span>
							:''
						}
					</div>
					<Button
						type="primary"
						disabled={(_this.tipState.oldPassword || _this.tipState.newPassword || _this.tipState.confirmPassword)}
						className="change-password-module-edit"
						onClick={this.handleSubmitPasswordEdit}
					>
						提交
					</Button>
				</div>
			</div>
		);
	}
}
function select(state) {
	return state.accountReducer;
}
export default connect (select)(ChangePassword);
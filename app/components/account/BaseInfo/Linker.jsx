import React from 'react';
import { Input, Button, notification } from 'antd';
import _ from 'underscore';

class Linker extends React.Component {
	constructor(props) {
		super(props);
		this.setInputValue = this.setInputValue.bind(this);
		this.checkInputValue = this.checkInputValue.bind(this);
		this.editLinkerInfo = this.editLinkerInfo.bind(this);
		
		this.state = {
			inputValue : {linker: '', tel: '', email: ''},  //用来保存输入框中的内容信息
			tipContent: {linker: '', tel: '', email: ''},  //用来保存提示的内容
			tipState: {linker: false, tel: false, email: false},  //用来保存提示的状态
		};
	}
	setInputValue(e) {
		this.setState({
			inputValue: {
				...this.state.inputValue,
				[e.target.getAttribute('data-id')]: e.target.value,
			}
		});
	}
	checkInputValue(e) {
		const _this = this;
		let id = e.target.getAttribute('data-id');
		let value = e.target.value;
		if(id == "linker") {  //联系人的校验
			if(!value.length) {
				_this.setState({
					tipContent: {
					..._this.state.tipContent,
					linker: '联系人不能为空!'
					},
					tipState: {
						..._this.state.tipState,
						linker: true,
					}
				});
			}else {
				_this.setState({
					tipState: {
						..._this.state.tipState,
						linker: false,
					}
				});
			}
		}else if(id == "tel") {  //联系人电话校验
			if(!value.length) {
				_this.setState({
					tipContent: {
						..._this.state.tipContent,
						tel: '联系电话不能为空!'
					},
					tipState: {
						..._this.state.tipState,
						tel: true,
					}
				});
			}else if(!(/^1\d{10}$/).test(value)){
				_this.setState({
					tipContent: {
						..._this.state.tipContent,
						tel: '请输入格式正确的手机号!'
					},
					tipState: {
						..._this.state.tipState,
						tel: true,
					}
				});
			}else {
				_this.setState({
					tipState: {
						..._this.state.tipState,
						tel: false,
					}
				});
			}
		}else if(id == 'email') {  //邮箱的校验
			if(!value.length) {
				_this.setState({
					tipContent: {
						..._this.state.tipContent,
						email: '邮箱不能为空!'
					},
					tipState: {
						..._this.state.tipState,
						email: true,
					}
				});
			}else if(!(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/).test(value)){
				_this.setState({
					tipContent: {
						..._this.state.tipContent,
						email: '请输入正确邮箱格式!'
					},
					tipState: {
						..._this.state.tipState,
						email: true,
					}
				});
			}else {
				_this.setState({
					tipState: {
						..._this.state.tipState,
						email: false,
					}
				});
			}
		}
	}
	editLinkerInfo(){
		let refer = this.props;
		let newData = this.state.inputValue;
		if((refer.contactPerson == newData.linker) && (refer.contactPhone == newData.tel) && (refer.emailAddress == newData.email)) {
			notification['warning']({
				message: '提示',
				description: '不应该与修改前的内容相同！',
				duration: 3,
			});
		}else {
			this.props.editBaseInfo(this.state.inputValue);
		}
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			inputValue: {
				...this.state.inputValue,
				linker: nextProps.contactPerson,
				tel: nextProps.contactPhone,
				email: nextProps.emailAddress,
			},
		});
	}
	shouldComponentUpdate(nextProps,nextState) {
		return !_.isEqual(this.props,nextProps) || !_.isEqual(this.state,nextState);
	}
	render() {
		const _this = this.state;
		return (
			<div>
				<div className="base-info-module-index">
					<span className="base-info-module-linker-left">联系人：</span>
					<Input
						className="base-info-module-linker-right"
						value={_this.inputValue.linker}
						data-id="linker"
					    onChange={this.setInputValue}
					    onBlur={this.checkInputValue}
					/>
					{_this.tipState.linker ?
						<span className="base-info-module-linker-tip">{_this.tipContent.linker}</span>
						: ''
					}
				</div>
				<div className="base-info-module-index">
					<span className="base-info-module-linker-left">联系电话：</span>
					<Input
						className="base-info-module-linker-right"
						value={_this.inputValue.tel}
						data-id="tel"
						onChange={this.setInputValue}
						onBlur={this.checkInputValue}
					/>
					{_this.tipState.tel ?
						<span className="base-info-module-linker-tip">{_this.tipContent.tel}</span>
						: ''
					}
				</div>
				<div className="base-info-module-index">
					<span className="base-info-module-linker-left">邮箱：</span>
					<Input
						className="base-info-module-linker-right"
						value={_this.inputValue.email}
						data-id="email"
						onChange={this.setInputValue}
						onBlur={this.checkInputValue}
					/>
					{_this.tipState.email ?
						<span className="base-info-module-linker-tip">{_this.tipContent.email}</span>
						: ''
					}
				</div>
				<Button
					type="primary"
					className="base-info-module-linker-edit"
				    disabled={_this.tipState.linker || _this.tipState.tel || _this.tipState.email}
				    onClick={this.editLinkerInfo}
				>
					修改
				</Button>
			</div>
		);
	}
};

export default Linker;
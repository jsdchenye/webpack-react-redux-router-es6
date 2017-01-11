import React from 'react';
import {connect} from 'react-redux';
import _ from 'underscore';
import Linker from './Linker';

import {
	fetchBaseInfo,
	updateBaseInfo,
} from '../../../redux/action';

class BaseInfo extends React.Component {
	constructor(props) {
		super(props);
		this.editBaseInfo = this.editBaseInfo.bind(this);
		
		this.state = {
			baseInfoSource: {platform: [], company: [], bank: []},  //默认基本信息数据源
		};
	}
	editBaseInfo(value) {
		this.props.dispatch(updateBaseInfo(value));
	}
	componentWillMount() {
		this.props.dispatch(fetchBaseInfo());
	}
	componentWillReceiveProps(nextProps) {
		let baseInfoSource = {
			platform: [{title: '账号名',value: nextProps.baseInfoSource.partnerId}],
			company: [
				{title: '合作商名称',value: nextProps.baseInfoSource.partnerName},
				{title: '公司名称',value: nextProps.baseInfoSource.companyName},
				{title: '公司地址',value: nextProps.baseInfoSource.companyAddress},
				{title: '邮编',value: nextProps.baseInfoSource.postCode},
			],
			bank: [
				{title: '银行账号',value: nextProps.baseInfoSource.bankNumber},
				{title: '所属银行',value: nextProps.baseInfoSource.bankName},
				{title: '纳税标志',value: nextProps.baseInfoSource.taxIdentification},
			],
		};
		this.setState({
			baseInfoSource: {...baseInfoSource},
		});
	}
	shouldComponentUpdate(nextProps,nextState) {
		return !_.isEqual(this.props,nextProps) || !_.isEqual(this.state,nextState);
	}
	renderDetailIndex(arr) {
		return arr.map((item,i)=>{
			return (
				<div className="base-info-module-index" key={i}>
					<span className="base-info-module-index-left">{item.title}：</span>
					<span className="base-info-module-index-right">{item.value}</span>
				</div>
			);
		});
	}
	render() {
		let baseInfoSource = this.state.baseInfoSource;
		let {
			contactPerson,
			contactPhone,
			emailAddress,
		} = {...this.props.baseInfoSource};
		let linker = {contactPerson,contactPhone,emailAddress};
		return(
			<div className="content-base-info">
				<div className="base-info-module">
					<div className="base-info-module-title">平台账号</div>
					{this.renderDetailIndex(baseInfoSource.platform)}
				</div>
				<div className="base-info-module">
					<div className="base-info-module-title">公司信息</div>
					{this.renderDetailIndex(baseInfoSource.company)}
				</div>
				<div className="base-info-module">
					<div className="base-info-module-title">银行信息</div>
					{this.renderDetailIndex(baseInfoSource.bank)}
				</div>
				<div className="base-info-module">
					<div className="base-info-module-title">联系人信息</div>
					<Linker
						{...linker}
						editBaseInfo={this.editBaseInfo}
					/>
				</div>
			</div>
		);
	}
}
function select(state) {
	return state.accountReducer;
}
export default connect(select)(BaseInfo);
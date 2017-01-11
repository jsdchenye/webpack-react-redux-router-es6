import React from 'react';
import { Table, Breadcrumb } from 'antd';
import {connect} from 'react-redux';
import ClassNames from 'classnames';
import _ from 'underscore';
import generatorColumns from './generatorColumns';
import {
	fetchNoticeInfo,
} from '../../redux/action';

class InfoCenter extends React.Component {
	constructor(props) {
		super(props);
		this.changeTitleColor = this.changeTitleColor.bind(this);
		this.handleTableChange = this.handleTableChange.bind(this);
		
		this.state = {
			titleState: true,  //默认选中“未读信息”
			source: [],  //对应表格要展示的数据源信息
			pagination: {pageSize: 5, current: 0},  //后端分页相关设置
			loading: true,  //loading状态
		};
	}
	changeTitleColor(ev) {
		let ele = ev.target.getAttribute('data-flag');
		let status = (ele == 'no' ? true : false);
		this.props.dispatch(fetchNoticeInfo({begin: 0, len: 5,state: status}));
		this.setState({
			titleState: status,
			loading: true,
			pagination: {
				...this.state.pagination,
				current: 0,
			}
		});
	}
	handleTableChange(pagination) {
		this.setState({
			loading: true,
			pagination: {
				...this.state.pagination,
				current: pagination.current
			}
		});
		this.props.dispatch(fetchNoticeInfo({begin: pagination.current-1, len: 5,state: this.state.titleState}));
	}
	componentWillMount() {
		this.props.dispatch(fetchNoticeInfo({begin: 0, len: 5,state: this.state.titleState}));
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			loading: false,
			source: nextProps.noticeInfoSource.data,
			pagination: {
				...this.state.pagination,
				total: nextProps.noticeInfoSource.totalCount,
			}
		});
	}
	shouldComponentUpdate(nextProps,nextState) {
		return !_.isEqual(this.props,nextProps) || !_.isEqual(this.state,nextState);
	}
	render() {
		return (
			<div className="content-info-center">
				<div className="info-center-module-title">
					<Breadcrumb>
						<Breadcrumb.Item><a className={ClassNames({'info-center-active': this.state.titleState})} data-flag="no" onClick={this.changeTitleColor}>未读消息</a></Breadcrumb.Item>
						<Breadcrumb.Item><a className={ClassNames({'info-center-active': !this.state.titleState})} data-flag="yes" onClick={this.changeTitleColor}>已读消息</a></Breadcrumb.Item>
					</Breadcrumb>
				</div>
				<Table
					style={{marginTop: 20}}
					pagination={this.state.pagination}
					columns={generatorColumns()}
				    dataSource={this.state.source}
					loading={this.state.loading}
					onChange={this.handleTableChange}
				/>
			</div>
		);
	}
};
function select(state) {
	return state.accountReducer;
}
export default connect(select)(InfoCenter);
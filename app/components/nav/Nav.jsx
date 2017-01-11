import React from 'react';
import { Menu, Icon, Badge, Modal, Button } from 'antd';
import { Link, IndexLink } from 'react-router'
import {connect} from 'react-redux';


class Nav extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.onOpenChange = this.onOpenChange.bind(this);
		this.setInfoCenter = this.setInfoCenter.bind(this);
		
		this.state = {
			current: '',  //默认展示的侧边栏指标
			openKeys: ['sub1'],  //默认展开的SubMenu菜单项
			alertInfoSource: {},  //"弹窗"通知信息数据源
			sidebarMenuState: {baseInfo: false, editPwd: false, channelReport: false, infoCenter: false},  //侧边栏导航的可选状态
		}
	}
	render() {
		return (
			<div>
				<div className="header">
					<div className="header-title">渠道合作商平台</div>
					<div className="header-user">
						<span className="header-user-info-center" onClick={this.setInfoCenter}>
							<Link disabled={this.state.sidebarMenuState.infoCenter} to="/infocenter">通知中心</Link>
							<Badge count={Object.keys(this.state.alertInfoSource).length ? this.state.alertInfoSource.noReadCount : 0} style={{top: -10, left: -2, right: -3, marginRight: -12}} />
						</span>
						<span>|</span>
						<span className="header-user-partner">合作商名称</span>
						<span>|</span>
						<span className="header-user-exit">退出</span>
					</div>
				</div>
				<div className="body">
					<div className="side-nav">
						<Menu
							mode="inline"
							openKeys={this.state.openKeys}
							selectedKeys={[this.state.current]}
							onOpenChange={this.onOpenChange}
							onClick={this.handleClick}
						>
							<SubMenu key="sub1" title={<span><Icon type="setting" /><span>账户管理</span></span>}>
								<Menu.Item key="1" disabled={this.state.sidebarMenuState.baseInfo}><Link to="/account/baseinfo">基本信息</Link></Menu.Item>
								<Menu.Item key="2" disabled={this.state.sidebarMenuState.editPwd}><Link id="edit-pwd-alert" to="/account/changepassword">修改密码</Link></Menu.Item>
							</SubMenu>
							<SubMenu key="sub2" title={<span><Icon type="appstore" /><span>渠道管理</span></span>}>
								<Menu.Item key="3" disabled={this.state.sidebarMenuState.channelReport}>渠道报表</Menu.Item>
							</SubMenu>
						</Menu>
					</div>
					<div className="content">
						{this.props.children}
					</div>
				</div>
			</div>
		);
	}
}

function select(state){
	return state.accountReducer;
}
export default connect(select)(Nav);
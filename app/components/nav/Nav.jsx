import React from 'react';
import { Link } from 'react-router';

class Nav extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}
	render() {
		return (
			<div style={{fontSize: 16, fontWeight: 'bold'}}>
				<Link to="/left" style={{marginRight: 20}} activeClassName="top-nav-active">左侧</Link>
				<Link to="/right" activeClassName="top-nav-active">右侧</Link>
				{this.props.children}
			</div>
		);
	}
}
export default Nav;
import React from 'react';
import {connect} from 'react-redux';
import _ from 'underscore';
import {
	editNumber,
} from '../../redux/action';

class A extends React.Component {
	constructor(props) {
		super(props);
		this.handleEditNumber = this.handleEditNumber.bind(this);
		
		this.state = {
			number: 10,
		}
	}
	handleEditNumber(e) {
		this.props.dispatch(editNumber(this.state.number,'increase'));
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			number: nextProps.initNum,
		});
	}
	shouldComponentUpdate(nextProps,nextState) {
		return !_.isEqual(this.props,nextProps) || !_.isEqual(this.state,nextState);
	}
	render() {
		return (
			<div style={{marginTop: 20}}>
				<p>TAB1中的内容</p>
				<input type="text" value={this.state.number} readOnly="value"/>
				<button style={{width: 60, textAlign: 'center', marginLeft: -1}} onClick={this.handleEditNumber}>+</button>
			</div>
		);
	}
}
function select(state){
	return state;
}
export default connect (select)(A);
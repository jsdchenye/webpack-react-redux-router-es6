import React from 'react';
import {connect} from 'react-redux';
import _ from 'underscore';
import {
	editNumber,
} from '../../redux/action';

class B extends React.Component {
	constructor(props) {
		super(props);
		this.handleEditNumber = this.handleEditNumber.bind(this);
		
		this.state = {
			number: 10,
		}
	}
	handleEditNumber() {
		this.props.dispatch(editNumber(this.state.number,'decrease'));
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
				<input type="text" value={this.state.number} readOnly="value" />
				<button style={{width: 60, textAlign: 'center', marginLeft: -1}} onClick={this.handleEditNumber}>-</button>
			</div>
		);
	}
}

function select(state){
	return state;
}
export default connect (select)(B);
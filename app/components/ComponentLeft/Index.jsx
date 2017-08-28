import React from 'react';

class Index extends React.Component {
	constructor(props) {
		super(props);
		this.state = {}
	}
	handleEditNumber = ()=>{
		let {number,editNum} = this.props;
		editNum(number);
	};
	render() {
		let {number} = this.props;
		return (
			<div style={{marginTop: 20}}>
				<p>TAB1中的内容.<br/>这是一个新的页面内容AAAAAAA!</p><br/>
				<input type="text" value={number} readOnly="value"/>
				<button style={{width: 60, textAlign: 'center', marginLeft: -1}} onClick={this.handleEditNumber}>+</button>
			</div>
		);
	}
}

export default Index;
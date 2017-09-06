import React from 'react';
import { connect } from 'react-redux';

import {
	increaseNum
} from '../redux/actions/componentLeft';
import Index from '../components/ComponentLeft/Index';

class ComponentLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { number } = this.props;
    const IndexProps = { number };
    return (
      <Index
        {...IndexProps}
        editNum={(value) => this.props.dispatch(increaseNum(value))}
      />
    );
  }
}

function select(state) {
  return state.componentCommon;
}
export default connect (select)(ComponentLeft);
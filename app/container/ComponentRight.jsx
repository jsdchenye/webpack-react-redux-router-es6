import React from 'react';
import { connect } from 'react-redux';

import {
	decreaseNum
} from '../redux/actions/componentRight';

import Index from '../components/ComponentRight/Index';

class ComponentRight extends React.Component {
  constructor(props) {
    super(props);
      this.state = {};
  }

  render() {
    let { number } = this.props;
    let IndexProps = { number};
    return (
      <Index
        {...IndexProps}
        editNum={(value)=>this.props.dispatch(decreaseNum(value))}
      />
    );
  }
}

function select(state) {
  return state.componentCommon;
}
export default connect (select)(ComponentRight);
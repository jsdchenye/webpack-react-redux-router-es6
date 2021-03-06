import React from 'react';
import { Link } from 'react-router';

class NavComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div style={{ fontSize: 16, fontWeight: 'bold', padding: '5px 5px' }}>
        <Link to="/left" style={{ marginRight: 20 }} activeClassName="top-nav-active">左侧</Link>
        <Link to="/right" activeClassName="top-nav-active">右侧</Link>
        {this.props.children}
      </div>
    );
  }
}
export default NavComponent;
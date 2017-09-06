import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import NavComponent from './NavComponent';
import ComponentLeft from './ComponentLeft';
import ComponentRight from './ComponentRight';

class RouterComponent extends React.Component {
  render() {
    return (
      <Router history={this.props.history}>
        <Route path="/" component={NavComponent}>
          <IndexRoute component={ComponentLeft} />
          <Route path="left" component={ComponentLeft} />
          <Route path="right" component={ComponentRight} />
        </Route>
      </Router>
    );
  }
}

export default RouterComponent;
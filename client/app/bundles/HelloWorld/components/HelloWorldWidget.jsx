// HelloWorldWidget is an arbitrary name for any "dumb" component. We do not recommend suffixing all your
// dump component names with Widget.

import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import _ from 'lodash';
import { Row, Col } from 'react-bootstrap';

// Simple example of a React "dumb" component
export default class HelloWorldWidget extends React.Component {
  static propTypes = {
    // We prefix all property and variable names pointing to Immutable.js objects with '$$'.
    // This allows us to immediately know we don't call $$helloWorldStore['someProperty'], but instead use
    // the Immutable.js `get` API for Immutable.Map
    actions: PropTypes.shape({
      updateName: PropTypes.func.isRequired,
    }).isRequired,
    $$helloWorldStore: PropTypes.instanceOf(Immutable.Map).isRequired,
  };

  constructor(props, context) {
    super(props, context);

    // Uses lodash to bind all methods to the context of the object instance, otherwise
    // the methods defined here would not refer to the component's class, not the component
    // instance itself.
    _.bindAll(this, '_handleChange');
  }

  // React will automatically provide us with the event `e`
  _handleChange(e) {
    const name = e.target.value;
    this.props.actions.updateName(name);
  }

  render() {
    const $$helloWorldStore = this.props.$$helloWorldStore;
    const name = $$helloWorldStore.get('name');
    return (
      <div className="container">
        <h3>
          Hello, {name}!
        </h3>
        <Row>
          <Col sm={2}>
            Say hello to:
          </Col>
          <Col sm={10}>
            <input type="text" value={name} onChange={this._handleChange} />
          </Col>
        </Row>
      </div>
    );
  }
}

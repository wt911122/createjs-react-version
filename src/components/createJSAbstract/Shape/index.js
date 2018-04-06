import React, { Component } from 'react'
import PropTypes from 'prop-types';
import 'latest-createjs/lib/easeljs/easeljs'
import {
  connectTimer,
} from '../Timer'

class ShapeComponent extends Component {
  constructor(props, context) {
    super(props);

    this.state = {};
    this.instance = new createjs.Shape();
    context.stage.addChild(this.instance);
  }

  componentDidMount(){
    this.props.children.call(this, this.instance);
  }

  componentWillReceiveProps(nextProps){
    const deltaS = nextProps.deltaS;
    if(this.props.tick)
      this.props.tick.call(this, deltaS, this.instance);
  }

  render() {
    return null;
  }
}
ShapeComponent.contextTypes = {
  stage: PropTypes.object,
  resource: PropTypes.object,
};
ShapeComponent.propTypes = {

  deltaS: PropTypes.number
}

const mapContextToProps = (context) => {
  return {
    deltaS: context.delta.deltaS
  }
}

export default connectTimer(mapContextToProps)(ShapeComponent);

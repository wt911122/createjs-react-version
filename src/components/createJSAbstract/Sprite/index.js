import React, { Component } from 'react'
import PropTypes from 'prop-types';
import 'latest-createjs/lib/easeljs/easeljs'
import {
  connectTimer,
} from '../Timer'

class SpriteComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount(){
    const spriteSheet = new createjs.SpriteSheet(this.props.config.call(this));
    this.instance = new createjs.Sprite(spriteSheet, this.props.initialAction);
    this.context.stage.addChild(this.instance);
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
SpriteComponent.contextTypes = {
  stage: PropTypes.object,
  resource: PropTypes.object,
};
SpriteComponent.propTypes = {
  config: PropTypes.func.isRequired,
  initialAction: PropTypes.string.isRequired,
  deltaS: PropTypes.number,
  name: PropTypes.string,
}

const mapContextToProps = (context) => {
  return {
    deltaS: context.delta.deltaS
  }
}

export default connectTimer(mapContextToProps)(SpriteComponent);

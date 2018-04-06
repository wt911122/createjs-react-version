import React, { Component } from 'react'
import PropTypes from 'prop-types';
import 'latest-createjs/lib/easeljs/easeljs'
import {
  connectTimer,
} from '../Timer'

class BitmapComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};

  }

  componentDidMount(){
    this.instance = new createjs.Bitmap(this.context.resource.getResult(this.props.bitmap));
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
BitmapComponent.contextTypes = {
  stage: PropTypes.object,
  resource: PropTypes.object,
};
BitmapComponent.propTypes = {
  bitmap: PropTypes.string.isRequired,
  deltaS: PropTypes.number
}

const mapContextToProps = (context) => {
  return {
    deltaS: context.delta.deltaS
  }
}

export default connectTimer(mapContextToProps)(BitmapComponent);

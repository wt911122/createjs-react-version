import React, { Component } from 'react'
import PropTypes from 'prop-types'
import 'latest-createjs/lib/easeljs/easeljs'

class StageComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stage: null
    };
  }
  componentDidMount() {
    //console.log(createjs.Stage)
    const stage = new createjs.StageGL(this.canvas)

    if(this.props.events && this.props.events.length > 0) {
      this.props.events.forEach((evt) => {
        stage.addEventListener(evt.event, evt.handler);
      })
    }
    this.setState({
      stage
    })
  }


  getChildContext() {
    return  {
      stage: this.state.stage,
    }
  }

  render() {
    return <canvas {...this.props} ref={(ele) => {this.canvas = ele}}>
    </canvas>
  }
}

StageComponent.childContextTypes = {
  stage: PropTypes.object,
}

export default StageComponent;

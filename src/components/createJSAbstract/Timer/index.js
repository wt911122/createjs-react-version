import React, { Component } from 'react'
import PropTypes from 'prop-types';
import 'latest-createjs/lib/easeljs/easeljs'

class TimerProvider extends Component{
  constructor(props) {
    super(props);
    this.state = {
      delta:{}
    }
  }


  getChildContext() {
    return  { delta: this.state.delta }
  }


  componentDidMount(){
    // 设置timer项 todo
    if(this.props.timingMode) createjs.Ticker.timingMode = this.props.timingMode;

    //开启timer监听
    const stage = this.context.stage
    createjs.Ticker.addEventListener("tick", (event) => {
      this.setState({
        delta: {
          deltaS: event.delta / 1000
        }
      })
      stage.update(event);
    });
  }

  render(){
    return this.props.children;
  }
}
TimerProvider.propTypes = {
  timingMode: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]).isRequired
}
TimerProvider.childContextTypes = {
  delta: PropTypes.object,
}
TimerProvider.contextTypes = {
  stage: PropTypes.object,
}

function connectTimer(mapTimerToProps){


  return function wrapWithConnect(Comp){

    return class extends Component{
      static contextTypes = {
        delta: PropTypes.object
      }
      constructor(props, context) {
        super(props);
      }

      render(){

        this.mergedProps = mapTimerToProps(this.context);
        const prop = Object.assign({}, this.props, this.mergedProps)
        return <Comp {...prop}/>
      }
    }
  }
}


export {
  TimerProvider,
  connectTimer
}

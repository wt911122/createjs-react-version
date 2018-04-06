import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import 'latest-createjs/lib/preloadjs/preloadjs';


class Loader extends Component{
  constructor(props) {
    super(props);
    this.state = {
      resource: null
    };
  }

  getChildContext() {
    return  { resource: this.state.resource }
  }

  componentDidMount(){
    const loader = new createjs.LoadQueue(this.props.useXHR, '', true);
    loader.addEventListener("complete", (msg) => {
      console.log("resource complete")
      this.setState({
        resource: loader,
      })
    });
    loader.addEventListener("error", (err) => {
      console.error(err);
    })
    loader.loadManifest(this.props.manifest);
  }

  render() {
    if(this.state.resource){
      console.log('loaded')
      return this.props.children;
    }
    return null;
  }
}

Loader.propTypes = {
  useXHR: PropTypes.bool.isRequired,
  manifest: PropTypes.array.isRequired,
  children: PropTypes.element.isRequired,
}
Loader.childContextTypes = {
  resource: PropTypes.object,
}
export default Loader;

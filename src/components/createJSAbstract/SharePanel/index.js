import React, { Component } from 'react';
import PropTypes from 'prop-types';

function SharePanel(panel={}) {
  this.state = panel;
}
SharePanel.prototype.mergePanel = function(member){
  Object.assign(this.state, member);
}

const instance = new SharePanel();

export default instance;

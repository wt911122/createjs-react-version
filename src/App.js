import React, { Component } from 'react';
import StageComponent from './components/createJSAbstract/Stage'
import 'latest-createjs/lib/easeljs/easeljs'
import {
  TimerProvider,
} from './components/createJSAbstract/Timer'
import ShapeComponent from './components/createJSAbstract/Shape'
import Loader from './components/createJSAbstract/Loader'
import BitmapComponent from './components/createJSAbstract/Bitmap'
import SpriteComponent from './components/createJSAbstract/Sprite'
import SharePanel from './components/createJSAbstract/SharePanel'

import spritesheet_grant from '../statics/img/spritesheet_grant.png';
import sky from '../statics/img/sky.png';
import ground from '../statics/img/ground.png';
import hill1 from '../statics/img/hill1.png';
import hill2 from '../statics/img/hill2.png';

const manifest = [
    {src: spritesheet_grant, id: "grant"},
    {src: sky, id: "sky"},
    {src: ground, id: "ground"},
    {src: hill1, id: "hill"},
    {src: hill2, id: "hill2"}
]

const w = 960;
const h = 400;


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <StageComponent
          width={w}
          height={h}
          events={[{
            event:  "stagemousedown",
            handler: () => {
              SharePanel.state.grant.gotoAndPlay("jump");
            }
          }]}
        >
          <Loader useXHR={false} manifest={manifest}>
            <TimerProvider timingMode={createjs.Ticker.RAF}>

              <ShapeComponent name="sky">
                { function(instance){
                    instance.graphics.beginBitmapFill(this.context.resource.getResult("sky")).drawRect(0, 0, w, h);
                    instance.cache(0, 0, w, h);
                }}
              </ShapeComponent>
              <ShapeComponent
                name="ground"
                tick={(deltaS, instance) => {
                  instance.x = (instance.x - deltaS * 150) % instance.tileW;
                }}>
                 { function(instance){
                    const groundImg = this.context.resource.getResult("ground");
                    instance.graphics.beginBitmapFill(groundImg).drawRect(0, 0, w + groundImg.width, groundImg.height);
                    instance.tileW = groundImg.width;
                    instance.y = h - groundImg.height;
                    instance.cache(0, 0, w + groundImg.width, groundImg.height);
                    SharePanel.mergePanel({'groundImg':groundImg})
                }}
              </ShapeComponent>
              <BitmapComponent
                name="hill"
                bitmap="hill"
                tick={(deltaS, hill) => {
                    hill.x = (hill.x - deltaS * 30);
                    if (hill.x + hill.image.width * hill.scaleX <= 0) {
                      hill.x = w;
                    }
                }}>
              {
                function(hill){
                  const groundImg = SharePanel.state.groundImg;
                  hill.setTransform(Math.random() * w, h - hill.image.height * 4 - groundImg.height, 4, 4);
                  hill.alpha = 0.5;
                }
              }
              </BitmapComponent>
              <BitmapComponent
                name="hill2"
                bitmap="hill2"
                tick={(deltaS, hill2) => {
                  hill2.x = (hill2.x - deltaS * 45);
                  if (hill2.x + hill2.image.width * hill2.scaleX <= 0) {
                    hill2.x = w;
                  }
                }}>
              {
                function(hill2){
                  const groundImg = SharePanel.state.groundImg;
                  hill2.setTransform(Math.random() * w, h - hill2.image.height * 3 - groundImg.height, 3, 3);
                }
              }
              </BitmapComponent>

              <SpriteComponent
                name="grant"
                config={function(){
                  return {
                    framerate: 30,
                    "images": [this.context.resource.getResult("grant")],
                    "frames": {"regX": 82, "height": 292, "count": 64, "regY": 0, "width": 165},
                    // define two animations, run (loops, 1.5x speed) and jump (returns to run):
                    "animations": {
                      "run": [0, 25, "run", 1.5],
                      "jump": [26, 63, "run"]
                    }
                  }}}
                initialAction="run"
                tick={(deltaS, grant) => {
                  var position = grant.x + 150 * deltaS;
                  var grantW = grant.getBounds().width * grant.scaleX;
                  grant.x = (position >= w + grantW) ? -grantW : position;
                }}
                >
                {
                  function(grant){
                    grant.y = 35;
                    SharePanel.mergePanel({'grant':grant})
                  }
                }
              </SpriteComponent>
            </TimerProvider>
          </Loader>
        </StageComponent>
      </div>
    );
  }
}

export default App;

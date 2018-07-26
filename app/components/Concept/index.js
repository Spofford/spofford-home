import React from "react"
import * as contentful from 'contentful'
const ReactMarkdown = require('react-markdown')
import style from "./style.css"
import classNames from 'classnames';
import FontAwesome from "react-fontawesome";

export class Concept extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      model: this.props.concept,
      orientation: window.screen.orientation.type,
      currentSketch: 0,
      allSketches: this.props.concept.fields.sketches,
      isOverlayOn: false
    };

    this.prevSketch = this.prevSketch.bind(this);
    this.nextSketch = this.nextSketch.bind(this);
    this.toggleOverlay = this.toggleOverlay.bind(this);
  }


  client = contentful.createClient({
    space: 'cahjy08ew1qz',
    accessToken: '37c6ec31a1a6cb3f533f51fa4c4af8fee88e2f910d9879eb79b2d073ae8cc499'
  })

  componentDidMount() {
    let self = this
    window.addEventListener("orientationchange", function() {
      self.setState({
        orientation: window.screen.orientation.type
      })
    });
  }

  prevSketch() {
    var self = this
    this.setState({
      currentSketch: --self.state.currentSketch
    })
  }

  nextSketch() {
    var self = this
    this.setState({
      currentSketch: ++self.state.currentSketch
    })
  }

  toggleOverlay() {
    this.setState(prevState => ({
      isOverlayOn: !prevState.isOverlayOn
    }));
  }

  render() {
    var sketchClasses = classNames('sketch-container', this.state.orientation);

    console.log(this.state.isOverlayOn)

    return (
      <div className='concept'>
        <h2 onClick={this.toggleOverlay}>{this.state.model.conceptName}</h2>
        <img src={this.state.model.fields.primaryImage.fields.file.url} />
        <div className={sketchClasses}>
          <div className="sketches-top-bar">
            <div>Slide {this.state.currentSketch + 1} of {this.state.allSketches.length}</div>
            <FontAwesome onClick={this.toggleOverlay} name='times' size='2x' />
            {this.state.isOverlayOn}
          </div>
          <div className="sketch">
            <img src={this.state.allSketches[this.state.currentSketch].fields.sketch.fields.file.url} />
            <div className="caption">{this.state.allSketches[this.state.currentSketch].fields.caption}</div>
            <FontAwesome onClick={this.prevSketch} name='chevron-left' size='3x' />
            <FontAwesome onClick={this.nextSketch} name='chevron-right' size='3x' />
          </div>
        </div>
      </div>
    )
  }
}

export default Concept

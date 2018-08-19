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
      currentSketch: 0,
      allSketches: this.props.concept.fields.sketches,
      isOverlayOn: false,
      showPrev: false,
      showNext: true,
      orientation:''
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
    this.setOrientation()
    window.addEventListener("resize", function() {
      self.setOrientation()
    });
    if (this.state.allSketches.length==1) {
      this.setState({
        showNext: false
      })
    }
  }

  setOrientation() {
    var self = this;
    if (window.innerHeight > window.innerWidth) {
      self.setState({
        orientation: 'portrait'
      })
    } else if (window.innerWidth > window.innerHeight) {
      self.setState({
        orientation: 'landscape'
      })
    }
  }

  prevSketch() {
    var currentSketch = --this.state.currentSketch
    var self = this

    if (currentSketch==0) {
      this.setState({
        showPrev: false
      })
    }
    this.setState({
      currentSketch: currentSketch,
      showNext: true
    })
  }

  nextSketch() {
    var currentSketch = ++this.state.currentSketch
    var self = this

    if (currentSketch==(this.state.allSketches.length-1)) {
      this.setState({
        showNext: false
      })
    }
    this.setState({
      currentSketch: currentSketch,
      showPrev: true
    })

  }

  toggleOverlay() {
    this.setState(prevState => ({
      isOverlayOn: !prevState.isOverlayOn
    }));
    var elem = document.getElementsByTagName("body")[0];
    if (elem.style.overflow=="hidden") {
      elem.style.overflow="auto"
    } else {
      elem.style.overflow="hidden"
    }
    if (this.state.isOverlayOn==true) {
      this.setState({
        currentSketch:0,
        showPrev: false,
        showNext: true
      })
    }
  }

  render() {
    var sketchClasses = classNames('sketch-container', this.state.orientation, {"visible": this.state.isOverlayOn});

    var chevrons = classNames({'showNext': this.state.showNext}, {'showPrev': this.state.showPrev}, 'sketch')

    return (
      <div className='concept'>
        <div onClick={this.toggleOverlay} className="tile-overlay"></div>
        <h3>{this.state.model.fields.conceptName}</h3>
        <h3>Click image to view sketches</h3>
        <img src={this.state.model.fields.primaryImage.fields.file.url} />
        <div className={sketchClasses}>
          <div className="inner-container">
            <div className="sketches-top-bar">
              <div>Slide {this.state.currentSketch + 1} of {this.state.allSketches.length}</div>
              <FontAwesome onClick={this.toggleOverlay} name='times' size='2x' />
              {this.state.isOverlayOn}
            </div>
            <div className={chevrons}>
              <img src={this.state.allSketches[this.state.currentSketch].fields.sketch.fields.file.url} />
              <div className="caption">{this.state.allSketches[this.state.currentSketch].fields.caption}</div>
              <FontAwesome onClick={this.prevSketch} name='chevron-left' size='3x' />
              <FontAwesome onClick={this.nextSketch} name='chevron-right' size='3x' />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Concept

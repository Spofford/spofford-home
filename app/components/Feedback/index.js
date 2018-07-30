import React from "react"
import * as contentful from 'contentful'
const ReactMarkdown = require('react-markdown')
import style from "./style.css"
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import { default as Concept } from "../Concept"

export class Feedback extends React.Component {

  // Added this:
  constructor(props) {
    super(props);

    this.state = {
      model: {},
      children: [],
      concepts: [],
      firstChild: {}
    }

    this.reset = this.reset.bind(this);
  }



  client = contentful.createClient({
    space: 'cahjy08ew1qz',
    accessToken: '37c6ec31a1a6cb3f533f51fa4c4af8fee88e2f910d9879eb79b2d073ae8cc499'
  })

  componentDidMount() {
    this.reset()
    window.addEventListener('hashchange', this.reset);
  }

  reset() {
    console.log('heard')
    let query = this.props.match.params.object
    this.fetchModel().then(this.setModel);
    if (query==='start') {
      this.fetchChildren().then(this.setChildren)
    } else if (query==='finish') {

    } else {
      this.fetchConcepts().then(this.setConcepts)
    }
  }

  fetchModel() {
    if (this.props.match.params.object==='start') {
      return this.client.getEntry('3XtovxD6w0AQ6U4ieSiIow')
    } else if (this.props.match.params.object==='finish') {
      return this.client.getEntry('6ofWITems0U0OqGM6W42GU')
    } else {
      return this.client.getEntry(this.props.match.params.object)
    }
  }

  fetchChildren() {
    return this.client.getEntries({ content_type: 'object' })
  }

  fetchConcepts() {
    return this.client.getEntries({
      content_type: 'concept',
      'fields.object.sys.id': this.props.match.params.object
    })
  }

  setModel = response => {
    this.setState({
      model: response.fields
    })
  }

  setChildren = response => {
    this.setState({
      children: response.items,
      firstChild: response.items[0]
    })
  }

  setConcepts = response => {
    this.setState({
      concepts: response.items
    })
  }

  render() {

    if (this.props.match.params.object==='start') {

      if (this.state.firstChild.sys) {
        var firstChild = this.state.firstChild.sys.id
      }

      return (
      <div className="feedbackBody">
        <h2>{this.state.model.head}</h2>
        <h3>{this.state.model.subhead}</h3>
        <ReactMarkdown source={this.state.model.bodyText} />
        <Link to={'/feedback/' + firstChild}>Start</Link>
      </div>
      )
    } else if (this.props.match.params.object==='finish') {
      return (
        <div className="feedbackBody">
          <h2>{this.state.model.head}</h2>
          <h3>{this.state.model.subhead}</h3>
          <ReactMarkdown source={this.state.model.bodyText} />
        </div>
      )
    } else {
      return (
        <div className="feedbackBody">
          <h2>{this.state.model.head}</h2>
          <ReactMarkdown source={this.state.model.background} />
          <h2>{this.state.model.problemInsights}</h2>
          <ReactMarkdown source={this.state.model.problem} />
          {this.state.concepts.map(item =>
            <Concept key={item.sys.id} concept={item} />
          )}

          <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfuhBskbN9iodujDAA2te9kDuXct-e79L2KOgV2z-SW2Nabpg/viewform?embedded=true" width="100%" height="1250">Loading...</iframe>

        </div>
      )
    }
  }
}

export default Feedback
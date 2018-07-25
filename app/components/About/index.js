import React from "react"
import HubspotForm from 'react-hubspot-form'
const ReactMarkdown = require('react-markdown')
import * as contentful from 'contentful'
import style from "./style.css"

export class About extends React.Component {
  state = {
    model: {}
  }

  client = contentful.createClient({
    space: 'cahjy08ew1qz',
    accessToken: '37c6ec31a1a6cb3f533f51fa4c4af8fee88e2f910d9879eb79b2d073ae8cc499'
  })

  componentDidMount() {
    this.fetchModel().then(this.setModel);
  }

  fetchModel = () => this.client.getEntry('wKhyV2HRBeSgK4UcOoiEi')

  setModel = response => {
    this.setState({
      model: response.fields
    })
  }

  render() {
    return (
      <div className="about">
        <h2>{this.state.model.head}</h2>
        <ReactMarkdown source={this.state.model.bodyText} />

      </div>
    )
  }
}

export default About

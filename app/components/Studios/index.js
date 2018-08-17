import React from "react"
import * as contentful from 'contentful'
const ReactMarkdown = require('react-markdown')
import style from "./style.css"
import { Link } from 'react-router-dom'
import FontAwesome from "react-fontawesome";

import { default as Header } from "../Header"

export class Studios extends React.Component {
  state = {
    model: {},
    asset1: "",
    asset2: ""
  }

  client = contentful.createClient({
    space: 'cahjy08ew1qz',
    accessToken: '37c6ec31a1a6cb3f533f51fa4c4af8fee88e2f910d9879eb79b2d073ae8cc499'
  })

  componentDidMount() {
    window.scrollTo(0, 0);
    this.fetchModel().then(this.setModel);
  }

  fetchModel = () => this.client.getEntry('68s1X4SuTmk6CS8oc2couM')

  setModel = response => {
    var self = this
    this.setState({
      model: response.fields
    })
    self.client.getAsset(this.state.model.visual.sys.id).then(self.setAsset1)
    self.client.getAsset(this.state.model.visual2.sys.id).then(self.setAsset2)
  }

  setAsset1 = response => {
    this.setState({
      asset1: response.fields.file.url
    })
  }

  setAsset2 = response => {
    this.setState({
      asset2: response.fields.file.url
    })
  }

  render() {
    return (
      <div className="studios">
        <Header />
        <div className="hero">
          <div className="copy-container">
            <h2>{this.state.model.head}</h2>
            <ReactMarkdown source={this.state.model.bodyText} />
          </div>
        </div>
        <div className="body-container">

          <div className="copy-container">
            <h2>{this.state.model.subhead2}</h2>
            <img src={this.state.asset1} />
            <ReactMarkdown source={this.state.model.bodyText2} />
            <Link to='/feedback/start'>start designing<FontAwesome name='chevron-right' /></Link>
            <hr />
          </div>

          <div className="copy-container">
            <h2>{this.state.model.subhead3}</h2>
            <img src={this.state.asset2} />
            <ReactMarkdown source={this.state.model.bodyText3} />
            <a target="_blank" href="http://may-insights.spofforddesign.com/">read on<FontAwesome name='chevron-right' /></a>
          </div>
        </div>
      </div>
    )
  }
}

export default Studios

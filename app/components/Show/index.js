import React from "react"
const ReactMarkdown = require('react-markdown')
import * as contentful from 'contentful'
import style from "./style.css"
import { connect } from "react-redux"
import cssModules from "react-css-modules"
import { default as Header } from "../Header"
import { Link } from 'react-router-dom'
import FontAwesome from "react-fontawesome";

export class Show extends React.Component {
  state = {
    model: {}
  }

  client = contentful.createClient({
    space: 'cahjy08ew1qz',
    accessToken: '37c6ec31a1a6cb3f533f51fa4c4af8fee88e2f910d9879eb79b2d073ae8cc499'
  })

  componentDidMount() {
    /* window.scrollTo(0, 0); */
    this.fetchModel().then(this.setModel);
  }

  fetchModel = () => this.client.getEntry('6mwsq2p1ewaw0sOay2uCEw')

  setModel = response => {
    this.setState({
      model: response.fields
    })
  }

  render() {
    return (
      <div className="show">
        <Header headerStart={true} />
        <div className="hero">
          <div className="copy-container">
            <h2>{this.state.model.head}</h2>
            <h3>Bringing together circular design, regionality, and human-centeredness to imagine New England furniture's future.</h3>
          </div>
        </div>
        <div className="body-container">

          <div className="copy-container">
            <h2>{this.state.model.subhead2}</h2>
            <ReactMarkdown source={this.state.model.bodyText2} />
            <Link to='/signup'>start your submission<FontAwesome name='chevron-right' /></Link>
            <hr />
          </div>

          <div className="copy-container">
            <h2>{this.state.model.subhead3}</h2>
            <ReactMarkdown source={this.state.model.bodyText3} />
            <Link to='/signup'>start your submission<FontAwesome name='chevron-right' /></Link>
          </div>

          <div className="copy-container">
            <h2>{this.state.model.subhead4}</h2>
            <ReactMarkdown source={this.state.model.bodyText4} />
            <Link to='/signup'>start your submission<FontAwesome name='chevron-right' /></Link>
          </div>

          <div className="copy-container">
            <h2>{this.state.model.subhead4}</h2>
            <ReactMarkdown source={this.state.model.bodyText4} />
            <Link to='/signup'>start your submission<FontAwesome name='chevron-right' /></Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(cssModules(Show, style))

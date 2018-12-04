import React from "react"
import HubspotForm from 'react-hubspot-form'
const ReactMarkdown = require('react-markdown')
import style from "./style.css"
import * as contentful from 'contentful'
import { connect } from "react-redux"
import cssModules from 'react-css-modules'
import { fetchContent} from "../../redux/actions"

import { default as Header } from "../Header"

export class About extends React.Component {

  state = {
    model: {}
  }

  componentDidMount() {
    this.props.dispatch(fetchContent('wKhyV2HRBeSgK4UcOoiEi'))
  }

  componentDidUpdate(prevProps) {
    if (prevProps.content != this.props.content) {
      console.log(this.props.content)
      this.setState({
        model: this.props.content.fields
      })
    }
  }

  render() {
    return (
      <div className="about">
        <Header headerStart={true} />
        <div className="hero">
          <div className="copy-container">
            <h2>{this.state.model.head}</h2>
            <h3>{this.state.model.subhead}</h3>
          </div>
        </div>
        <div className="body-container">
          <div className="copy-container">

            <ReactMarkdown source={this.state.model.bodyText} />
            <HubspotForm
               portalId='4042167'
               formId='d1e13228-c396-4338-bbe3-67cd84f53065'
               />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  content: state.content
})

export default connect(mapStateToProps)(cssModules(About, style))

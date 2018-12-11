import React from "react"
const ReactMarkdown = require('react-markdown')
import style from "./style.css"
import { Link } from 'react-router-dom'
import FontAwesome from "react-fontawesome";
import { connect } from "react-redux"
import cssModules from 'react-css-modules'
import { fetchContent} from "../../redux/actions"

import { default as Header } from "../Header"

export class Studios extends React.Component {
  state = {
    model: {},
    assets: []
  }

  componentDidMount() {
    this.props.getContent('68s1X4SuTmk6CS8oc2couM')
  }

  componentDidUpdate(prevProps) {
    if (prevProps.content != this.props.content) {
      this.setState({
        model: this.props.content.items[0].fields,
        assets: this.props.content.includes.Asset
      })
    }
  }



  render() {
    if (this.state.assets.length>0) {
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
            <h2>{this.state.model.subhead4}</h2>
            <img src={'http:' + this.state.assets[2].fields.file.url}  />
            <ReactMarkdown source={this.state.model.bodyText4} />
            <Link to='/show'>Submit a design<FontAwesome name='chevron-right' /></Link>
          </div>

            <div className="copy-container">
              <h2>{this.state.model.subhead2}</h2>
              <img src={'http:' + this.state.assets[0].fields.file.url}  />
              <ReactMarkdown source={this.state.model.bodyText2} />
              <Link to='/feedback/start'>view designs<FontAwesome name='chevron-right' /></Link>
              <hr />
            </div>

            <div className="copy-container">
              <h2>{this.state.model.subhead3}</h2>
              <img src={'http:' + this.state.assets[1].fields.file.url}  />
              <ReactMarkdown source={this.state.model.bodyText3} />
              <a target="_blank" href="http://may-insights.spofforddesign.com/">read on<FontAwesome name='chevron-right' /></a>
            </div>
          </div>
        </div>
      )
    }
  }
}

const mapDispatchToProps = {
  getContent: fetchContent
};

const mapStateToProps = state => ({
  content: state.content
})

export default connect(mapStateToProps, mapDispatchToProps)(cssModules(Studios, style))

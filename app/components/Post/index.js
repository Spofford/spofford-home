import React from "react"
import * as contentful from 'contentful'
const ReactMarkdown = require('react-markdown')
import style from "./style.css"
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import FontAwesome from "react-fontawesome";
import { connect } from "react-redux"
import cssModules from 'react-css-modules'
import { fetchContent} from "../../redux/actions"

import { default as Header } from "../Header"

export class Post extends React.Component {
  state = {
    model: {}
  }

  componentDidMount() {
    this.props.getContent(this.props.match.params.entity)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.content != this.props.content) {
      this.setState({
        model: this.props.content.items[0].fields
      })
    }
  }

  render() {

    return (
      <div className="post">
        <Header />
        <div className="body-container">
          <div className="copy-container">
            <h2>{this.state.model.head}</h2>
            <h3>{this.state.model.subhead}</h3>
            <ReactMarkdown source={this.state.model.bodyText} />
            <Link to='/' className="return-home"><FontAwesome name='chevron-left' />Return to home</Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  getContent: fetchContent
};

const mapStateToProps = state => ({
  content: state.content
})

export default connect(mapStateToProps, mapDispatchToProps)(cssModules(Post, style))

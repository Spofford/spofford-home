import React from "react"
const ReactMarkdown = require('react-markdown')
import style from "./style.css"
import { connect } from "react-redux"
import cssModules from "react-css-modules"
import { default as Header } from "../Header"
import { Link } from 'react-router-dom'
import FontAwesome from "react-fontawesome";
import { fetchContent} from "../../redux/actions"

export class Show extends React.Component {
  state = {
    model: {}
  }

  componentDidMount() {
    this.props.getContent('6mwsq2p1ewaw0sOay2uCEw')
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
      <div className="show">
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
            <Link to='/signup'>start your submission<FontAwesome name='chevron-right' /></Link>
            <hr />
          </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(cssModules(Show, style))

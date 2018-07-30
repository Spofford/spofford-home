import React from "react"
import * as contentful from 'contentful'
const ReactMarkdown = require('react-markdown')
import style from "./style.css"

export class Post extends React.Component {
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

  fetchModel = () => this.client.getEntry(this.props.match.params.entity)

  setModel = response => {
    this.setState({
      model: response.fields
    })
  }

  render() {

    return (
      <div className="post">
        <h2>{this.state.model.head}</h2>
        <h3>{this.state.model.subhead}</h3>
        <ReactMarkdown source={this.state.model.bodyText} />
      </div>
    )
  }
}

export default Post
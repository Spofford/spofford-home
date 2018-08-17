import React from "react"
const ReactMarkdown = require('react-markdown')
import * as contentful from 'contentful'
import style from "./style.css"
import { Link } from 'react-router-dom'
import FontAwesome from "react-fontawesome";

import { default as Header } from "../Header"

const client = contentful.createClient({
  space: 'cahjy08ew1qz',
  accessToken: '37c6ec31a1a6cb3f533f51fa4c4af8fee88e2f910d9879eb79b2d073ae8cc499'
})


export class Search extends React.Component {
  state = {
    query: this.props.match.params.query,
    posts: []
  }


  componentDidMount() {
    var self = this
    client.getEntries({
      content_type: 'blogPost',
      'query': self.state.query
    })
    .then((response) => this.setState({posts:response.items}))
    .catch(console.error)
  }

  render() {
    const myData = [].concat(this.state.posts)
      .sort((a, b) => a.fields.datePublished < b.fields.datePublished)
      .map((item, i) =>
          <div className="postContainer" key={i}>
            <img src={item.fields.primaryImage.fields.file.url} />
            <h2>{item.fields.head}</h2>
            <h3>{item.fields.subhead}</h3>
            <Link to={'/post/' + item.sys.id}>Read More</Link>
          </div>
      );

    return (
      <div className="search">
        <Header />
        <div className="body-container">
          <div className="posts">
            <h2>Search results for "{this.state.query}"</h2>
            {myData}
            <Link to='/'><FontAwesome name='chevron-left' />Return to home</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Search

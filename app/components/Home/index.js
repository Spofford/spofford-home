import React from "react"
import cssModules from "react-css-modules"
import style from "./style.css"
import * as contentful from 'contentful'
import { Link } from 'react-router-dom'
import { default as Header } from "../Header"
import { default as Footer } from "../Footer"

export class Home extends React.Component {

  state = {
    model: {},
    posts: []
  }

  client = contentful.createClient({
    space: 'cahjy08ew1qz',
    accessToken: '37c6ec31a1a6cb3f533f51fa4c4af8fee88e2f910d9879eb79b2d073ae8cc499'
  })

  componentDidMount() {
    this.fetchModel().then(this.setModel);
    this.fetchPosts().then(this.setPosts);
  }

  fetchModel = () => this.client.getEntry('2RAz4CbUQwYcIMSgmuQQQ4')

  fetchPosts = () => this.client.getEntries({ content_type: 'blogPost' })

  setModel = response => {
    this.setState({
      model: response.fields
    })
  }

  setPosts = response => {
    this.setState({
      posts: response.items
    })
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
      <div div className="home">
        <div className="hero">
          <img src="https://s3.us-east-2.amazonaws.com/brand-collateral/logo-light-blue-big.svg" />
          <h1>spofford</h1>
        </div>
        <Header />
        <div className="body-container">
          <div className="copy-container">
            <h2>{this.state.model.head}</h2>
            <h3>{this.state.model.subhead}</h3>
            <Link to="/about">learn more</Link>
          </div>
          <div className="posts">
          <hr />
            <h2>Conversations</h2>
            {myData}
          </div>
        </div>
      </div>
    )
  }
}

export default cssModules(Home, style)

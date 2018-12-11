import React from "react"
const ReactMarkdown = require('react-markdown')
import style from "./style.css"
import { Link } from 'react-router-dom'
import FontAwesome from "react-fontawesome";
import { fetchSearch } from "../../redux/actions"
import { connect } from "react-redux"
import cssModules from 'react-css-modules'


import { default as Header } from "../Header"


export class Search extends React.Component {
  state = {
    query: this.props.match.params.query,
    posts: []
  }


  componentDidMount() {
    this.props.getContent(this.state.query)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.posts != this.props.posts) {
      this.setState({
        posts: this.props.posts.items
      })
    }
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

const mapDispatchToProps = {
  getContent: fetchSearch
};

export const mapStateToProps = state => ({
  posts: state.posts
})

export default connect(mapStateToProps, mapDispatchToProps)(cssModules(Search, style))

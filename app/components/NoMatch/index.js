import React from "react"
import cssModules from "react-css-modules"
import style from "./style.css"
import { connect } from "react-redux"
import { default as Header } from "../Header"
import { Link } from 'react-router-dom'

export class NoMatch extends React.Component {
  render() {
    return (
      <div className="no-match">
        <Header />
        <div className="body-container">
          <div className="copy-container">
          <h2>Nothing to see here.</h2>
          <p>Check the address, <Link to="/">return to home</Link> or <Link to="/login">login</Link>.</p>
          </div>
        </div>
      </div>
    )
  }
}

export default NoMatch

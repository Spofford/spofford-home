import React from "react"
import ReactDOM from 'react-dom'
import cssModules from "react-css-modules"
import style from "./style.css"
import { default as Header } from "../Header"
import Actions from "../../redux/actions"
import { connect } from "react-redux"

export class Submission extends React.Component {
  componentDidMount() {
    // console.log(this.props.match.params)
  }

  render() {
    return (
      <div className="submissions">
        <Header />
        <div className="body-container">
          <div className="copy-container">
            <h2>Submission</h2>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  submission: state.submission
})

export default connect(mapStateToProps)(cssModules(Submission, style))

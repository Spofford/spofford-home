import React from "react"
import cssModules from "react-css-modules"
import style from "./style.css"
import { connect } from "react-redux"
import Actions from "../../redux/actions"

export class NewSubmission extends React.Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  submit() {
    const submission = {
      screenshot: document.getElementById("submission-screenshot").value,
      file: document.getElementById("submission-file").value,
      description: document.getElementById("submission-description").value,
      manufacturing: document.getElementById("submission-manufacturing").value
    }
    //this.props.dispatch(Actions.userLogin(user))
    console.log(submission)
  }

  render() {
    return (
      <div className="wrapper">
        <div className="form">
          <div className="inputGroup">
            <input
              className="input"
              type="file"
              autoComplete="screenshot"
              name="submission['screenshot']"
              id="submission-screenshot" />
          </div>
          <div className="inputGroup">
            <input
              className="input"
              type="file"
              autoComplete="cad-file"
              name="submission['cad-file']"
              id="submission-file" />
          </div>
          <div className="inputGroup">
            <input
              placeholder="Description"
              className="input"
              type="text"
              autoComplete="description"
              id="submission-description" />
          </div>
          <div className="inputGroup">
            <input
              placeholder="Manufacturing"
              className="input"
              type="text"
              autoComplete="manufacturing"
              id="submission-manufacturing" />
          </div>
          <button onClick={this.submit}>Submit</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(cssModules(NewSubmission, style))

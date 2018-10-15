import React from "react"
import cssModules from "react-css-modules"
import { connect } from "react-redux"
import style from "./style.css"
import Actions from "../../redux/actions"

export class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  submit() {
    const user = {
      email: document.getElementById("signup-email").value,
      password: document.getElementById("signup-password").value,
      password_confirmation: document.getElementById("signup-password-confirmation").value
    }
    this.props.dispatch(Actions.userNew(user))
  }

  render() {
    return (
      <div className="wrapper">
        <div className="form">
          <div className="inputGroup">
            <input
              placeholder="Email"
              className="input"
              type="text"
              autoComplete="username"
              id="signup-email" />
          </div>
          <div className="inputGroup">
            <input
              placeholder="Password"
              className="input"
              type="password"
              autoComplete="new-password"
              id="signup-password" />
          </div>
          <div className="inputGroup">
            <input
              placeholder="Confirm Password"
              className="input"
              type="password"
              autoComplete="new-password"
              id="signup-password-confirmation" />
          </div>
          <button onClick={this.submit}>Submit</button>
        </div>
      </div>
    )
  }
}

export default connect()(cssModules(Signup, style))

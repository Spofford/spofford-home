import React from "react"
import cssModules from "react-css-modules"
import style from "./style.css"

export class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  submit() {
    const user = {
      first_name: document.getElementById("signup-first-name").value,
      last_name: document.getElementById("signup-last-name").value,
      email: document.getElementById("signup-email").value,
      password: document.getElementById("signup-password").value
    }
    fetch("http://localhost:4000/api/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user })
    })
    .then((res) => { return res.json() })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.warn(err);
    })
  }

  render() {
    return (
      <div className="wrapper">
        <div className="form">
          <div className="inputGroup">
            <input
              placeholder="First Name"
              className="half-input"
              type="text"
              id="signup-first-name" />
          </div>
          <div className="inputGroup">
            <input
              placeholder="Last Name"
              className="half-input"
              type="text"
              id="signup-last-name" />
          </div>
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
              id="signup-confirm-password" />
          </div>
          <button onClick={this.submit}>Submit</button>
        </div>
      </div>
    )
  }
}

export default cssModules(Signup, style)

import React from "react"
import cssModules from "react-css-modules"
import style from "./style.css"
import { connect } from "react-redux"
import Actions from "../../redux/actions"
import { Redirect } from 'react-router-dom'
import { default as Header } from "../Header"

export class Reset extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      form: true
    }

    this.submit = this.submit.bind(this)

  }

  submit() {
    const email = document.getElementById("signup-email").value
    this.props.dispatch(Actions.resetRequest(email))

    this.setState({
      form:false
    })
  }

  componentDidMount() {
  }

/*
  componentDidUpdate(prevProps) {
    if (prevProps.user.id != this.props.user.id) {
      this.setState({
        redirect: true
      })
    }
  }
  */

  render() {
    if (this.state.form) {
      return (
        <div className="login">
          <Header />
          <div className="body-container">
          <div className="copy-container">
        <div className="wrapper">
          <h2>Password Reset</h2>
          <div className="form">
            <div className="inputGroup">
            <label>Email
              <input
                className="input"
                type="text"
                autoComplete="username"
                id="signup-email" />
              </label>
            </div>
            <button className="green" onClick={this.submit}>Submit</button>
          </div>
        </div>
        </div>
        </div>
        </div>
      )
    } else {
      return (
      <div className="login">
        <Header />
        <div className="body-container">
          <div className="copy-container">
            <p>We've received your request. Check your email!</p>
          </div>
        </div>
      </div>)
    }
  }
}

const mapStateToProps = state => ({
  user: state.user,
  isAuthenticated: state.auth.isAuthenticated

})

export default connect(mapStateToProps)(cssModules(Reset, style))

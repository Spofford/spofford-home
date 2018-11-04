import React from "react"
import cssModules from "react-css-modules"
import { connect } from "react-redux"
import style from "./style.css"
import Actions from "../../redux/actions"
import { Redirect, Link } from 'react-router-dom'
import { default as Header } from "../Header"

export class Signup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      redirect: false
    }

    this.submit = this.submit.bind(this)
  }

  submit() {
    const user = {
      email: document.getElementById("signup-email").value,
      password: document.getElementById("signup-password").value,
      password_confirmation: document.getElementById("signup-password-confirmation").value,
      first_name: document.getElementById("signup-first-name").value,
      last_name: document.getElementById("signup-last-name").value,
      role_id:1,
    }
    this.props.dispatch(Actions.userNew(user))
  }

  componentDidMount() {

  }

  componentDidUpdate(prevProps) {
    if (prevProps.user.id != this.props.user.id) {
      this.setState({
        redirect: true
      })
    }
  }

  render() {


    if (this.state.redirect) {
      return <Redirect to='/submissions'/>;
    }



    return (
      <div className="signup">
        <Header />
        <div className="body-container">
        <div className="copy-container">
        <div className="wrapper">
        <h2>Sign Up</h2>
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
            <div className="inputGroup">
              <label>First Name
              <input
                className="input"
                type="text"
                autoComplete="first-name"
                id="signup-first-name" />
                </label>
            </div>
            <div className="inputGroup">
            <label>Last Name
              <input
                className="input"
                type="text"
                autoComplete="last-name"
                id="signup-last-name" />
              </label>
            </div>
            <div className="inputGroup">
            <label>Password
              <input
                className="input"
                type="password"
                autoComplete="new-password"
                id="signup-password" />
              </label>
            </div>
            <div className="inputGroup">
              <label>Confirm Password
              <input
                className="input"
                type="password"
                autoComplete="new-password"
                id="signup-password-confirmation" />
              </label>
            </div>
            <button className="green" onClick={this.submit}>Submit</button>
            <div className="bottom-links">
              <Link to="login">I have an account</Link>
            </div>
          </div>
        </div>
        </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(cssModules(Signup, style))

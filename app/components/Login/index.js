import React from "react"
import cssModules from "react-css-modules"
import style from "./style.css"
import { connect } from "react-redux"
import Actions from "../../redux/actions"
import { Redirect } from 'react-router-dom'
import { default as Header } from "../Header"

export class Login extends React.Component {
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
      password: document.getElementById("signup-password").value
    }
    this.props.dispatch(Actions.userLogin(user))
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
      <div className="login">
        <Header />
        <div className="body-container">
        <div className="copy-container">
      <div className="wrapper">
        <h2>Login</h2>
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
          <label>Password
            <input
              className="input"
              type="password"
              autoComplete="current-password"
              id="signup-password" />
            </label>
          </div>
          <button className="green" onClick={this.submit}>Submit</button>
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

export default connect(mapStateToProps)(cssModules(Login, style))

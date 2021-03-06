import React from "react"
import cssModules from "react-css-modules"
import style from "./style.css"
import { connect } from "react-redux"
import { userLogin } from "../../redux/actions"
import { Redirect, Link } from 'react-router-dom'
import { default as Header } from "../Header"

export class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      redirect: false
    }

    this.submit = this.submit.bind(this)

  }

  submit(event) {
    event.preventDefault()
    const user = {
      email: document.getElementById("signup-email").value,
      password: document.getElementById("signup-password").value
    }
    this.props.userLogin(user)
  }

  componentDidMount() {
    if (this.props.user.id && typeof this.props.user.id != 'undefined') {
      this.setState({
        redirect: true
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user.id != this.props.user.id) {
      this.setState({
        redirect: true
      })
    }
    if (prevProps.error != this.props.error) {
      this.setState({
        error: this.props.error
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
        <form onSubmit={this.submit}>
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
          <button className="green" type="submit">Submit</button>
          <div className="error">{this.state.error}</div>
          <div className="bottom-links">
            <Link to="signup">Sign up for an account</Link>
            <br />
            <Link to="reset">Reset your password</Link>
          </div>
        </form>
      </div>
      </div>
      </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  userLogin: userLogin
};

const mapStateToProps = state => ({
  user: state.user,
  error: state.error
})

export default connect(mapStateToProps, mapDispatchToProps)(cssModules(Login, style))

import React from "react"
import cssModules from "react-css-modules"
import style from "./style.css"
import { connect } from "react-redux"
import Actions from "../../redux/actions"
import { Redirect } from 'react-router-dom'

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
    if (prevProps.isAuthenticated !== this.props.isAuthenticated) {
      this.setState({
        redirect:true
      })
    }
  }

  render() {

    if(this.state.redirect) {
      return <Redirect to='/submissions'/>;
    }


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
              autoComplete="current-password"
              id="signup-password" />
          </div>
          <button onClick={this.submit}>Submit</button>
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

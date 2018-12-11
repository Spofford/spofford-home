import React from "react"
import cssModules from "react-css-modules"
import style from "./style.css"
import { connect } from "react-redux"
import { reset } from "../../redux/actions"
import { Redirect } from 'react-router-dom'
import { default as Header } from "../Header"

export class ResetToken extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      token: "",
      redirect: false
    }

    this.submit = this.submit.bind(this)

  }

  submit() {
    const reset = {
      password: document.getElementById("reset-password").value,
      token: this.state.token
    }

    this.props.reset(reset)
  }

  componentDidMount = () => {
    this.setState({
      token: this.props.location.search.split('=')[1]
    })
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
                <h2>Password Reset</h2>
                <div className="form">
                  <div className="inputGroup">
                    <label>New Password
                      <input
                      className="input"
                      type="text"
                      autoComplete="password"
                      id="reset-password" />
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

const mapDispatchToProps = {
  reset: reset
};

const mapStateToProps = state => ({
  user: state.user

})

export default connect(mapStateToProps, mapDispatchToProps)(cssModules(ResetToken, style))

import React from "react"
import cssModules from "react-css-modules"
import style from "./style.css"
import { connect } from "react-redux"
import { resetRequest } from "../../redux/actions"
import { Redirect } from 'react-router-dom'
import { default as Header } from "../Header"
import { default as FormField } from "../../components/FormField"

export class Reset extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      form: true,
      error: ""
    }

    this.submit = this.submit.bind(this)
  }

  submit() {
    const email = document.getElementById("signup-email").value
    this.props.resetRequest(email)
  }

  componentDidMount() {
  }

  formChange() {

  }


  componentDidUpdate(prevProps) {
    if (prevProps.error != this.props.error) {
      if (this.props.error=="green") {
        this.setState({form: false})
      } else {
        this.setState({
          error: this.props.error
        })
      }
    }
  }

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
          <FormField
            name="email"
            id="signup-email"
            autcomplete="email"
            label="Email"
            type="text"
            onValidate={this.formChange}
          />
          <div className="error">{this.state.error}</div>
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

const mapDispatchToProps = {
  resetRequest: resetRequest
};

const mapStateToProps = state => ({
  user: state.user,
  error: state.error.message
})

export default connect(mapStateToProps, mapDispatchToProps)(cssModules(Reset, style))

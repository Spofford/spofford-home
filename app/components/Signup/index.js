import React from "react"
import cssModules from "react-css-modules"
import { connect } from "react-redux"
import style from "./style.css"
import { userNew, contactCreate } from "../../redux/actions"
import { Redirect, Link } from 'react-router-dom'
import { default as Header } from "../Header"
import { default as FormField } from "../../components/FormField"

export class Signup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      redirect: false,
      validation: {
        email: false,
        firstName: false,
        lastName: false,
        password: false,
        passwordConfirmation: false
      }
    }

    this.submit = this.submit.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  submit = (e) => {
    e.preventDefault();
    const user = {
      email: document.getElementById("signup-email").value,
      password: document.getElementById("signup-password").value,
      password_confirmation: document.getElementById("signup-password-confirmation").value,
      first_name: document.getElementById("signup-first-name").value,
      last_name: document.getElementById("signup-last-name").value,
      role_id:1,
    }
    this.props.userNew(user)
  }

  componentDidMount() {
    if (this.props.user.id && typeof this.props.user.id != 'undefined') {
      this.setState({
        redirect: true
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user.id != this.props.user.id && typeof this.props.user.id != 'undefined') {
      if (env.production) {
        this.props.contactCreate(this.props.user)
      }

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

  formChange(response) {
    var elements = document.forms["sign-up"].getElementsByTagName("input");
    var arr = Array.from(elements);

    var keyword = response['name']

    var self = this;

    var result = false

    var allTrue = null

    var validation = {...this.state.validation}

    validation[keyword] = response["bool"]

    this.setState(
      { validation },
      function(){
        allTrue = Object.keys(self.state.validation).every(function(k){ return self.state.validation[k] === true });

        if (allTrue) {
          document.getElementById("signup-button").disabled = false
        }
      }
    )

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
              <form name="sign-up" onSubmit={this.submit}>
                <p>All fields required</p>
                <FormField
                  name="email"
                  id="signup-email"
                  autcomplete="username"
                  label="Email"
                  type="text"
                  onValidate={this.formChange}
                />
                <FormField
                  name="firstName"
                  id="signup-first-name"
                  autcomplete="first-name"
                  label="First Name"
                  type="text"
                  onValidate={this.formChange}
                />
                <FormField
                  name="lastName"
                  id="signup-last-name"
                  autcomplete="last-name"
                  label="Last Name"
                  type="text"
                  onValidate={this.formChange}
                />
                <FormField
                  name="password"
                  id="signup-password"
                  autcomplete="password"
                  label="Password (8 character minimum)"
                  type="password"
                  onValidate={this.formChange}
                />
                <FormField
                  name="passwordConfirmation"
                  id="signup-password-confirmation"
                  autcomplete="confirm-password"
                  label="Confirm Password"
                  type="password"
                  onValidate={this.formChange}
                />
                <button disabled="disabled" id="signup-button" className="green">Sign up</button>
                <div className="error">{this.state.error}</div>
                <div className="bottom-links">
                  <Link to="login">I have an account</Link>
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
  userNew: userNew,
  contactCreate: contactCreate
};

const mapStateToProps = state => ({
  user: state.user,
  error: state.error.message
})

export default connect(mapStateToProps, mapDispatchToProps)(cssModules(Signup, style))

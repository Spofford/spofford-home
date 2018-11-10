import React from "react";
import FontAwesome from "react-fontawesome";
import cssModules from 'react-css-modules';
import style from "./style.css";

export class FormField extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      errorMessage: ""
    }

    this.inlineValidation = this.inlineValidation.bind(this);
  }

  inlineValidation(event) {
    var element = document.getElementById(this.props.id)
    var responseObj = {name:event.target.name}
    if (event.target.value == "") {
      element.style = "border-color:red"
      responseObj.bool = false
      this.props.onValidate(responseObj)
    } else {
      if (event.target.name=="email") {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(event.target.value)) {
          element.style = "border-color:red"
          this.setState({errorMessage: "Not a valid email address"})
          responseObj.bool = false
          this.props.onValidate(responseObj)
        } else {
          element.style = "border-color:#ccc"
          this.setState({errorMessage: ""})
          responseObj.bool = true
          this.props.onValidate(responseObj)
        }
      }
      if (event.target.name=="passwordConfirmation") {
        if (event.target.value != document.getElementById("signup-password").value) {
          element.style = "border-color:red"
          this.setState({errorMessage: "Passwords do not match"})
          responseObj.bool = false
          this.props.onValidate(responseObj)
        } else {
          element.style = "border-color:#ccc"
          this.setState({errorMessage: ""})
          responseObj.bool = true
          this.props.onValidate(responseObj)
        }
      }
      if (event.target.name=="password") {
        if (event.target.value.length < 8) {
          element.style = "border-color:red"
          this.setState({errorMessage: "8 characters required"})
          responseObj.bool = false
          this.props.onValidate(responseObj)
        } else {
          element.style = "border-color:#ccc"
          this.setState({errorMessage: ""})
          responseObj.bool = true
          this.props.onValidate(responseObj)
        }
      }
      if (event.target.name=="firstName") {
        element.style = "border-color:#ccc"
        this.setState({errorMessage: ""})
        responseObj.bool = true
        this.props.onValidate(responseObj)
      }
      if (event.target.name=="lastName") {
        element.style = "border-color:#ccc"
        this.setState({errorMessage: ""})
        responseObj.bool = true
        this.props.onValidate(responseObj)
      }
    }

  }


  render() {
    return (
      <div className="inputGroup">
        <label>{this.props.label}
          <input
            name={this.props.name}
            id={this.props.id}
            className="input"
            type={this.props.type}
            autoComplete={this.props.autocomplete}
            onChange={this.inlineValidation}
          />
          <div className="error-message">{this.state.errorMessage}</div>
        </label>
      </div>
    )
  }
};

export default cssModules(FormField, style);

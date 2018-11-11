import React from 'react'
import ReactDOM from 'react-dom'
import cssModules from "react-css-modules"
import style from "./style.css"
import { connect } from "react-redux"
import Actions from "../../redux/actions"
import { default as Header } from "../Header"
import {default as ImageUpload} from "../ImageUpload"
import classNames from 'classnames';
import { Link, Redirect } from 'react-router-dom'
import FontAwesome from "react-fontawesome";

export class NewSubmission extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      redirect: false,
      imageData: "",
      userRedirect: false
    }
    this.submit = this.submit.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.submission.id !== this.props.submission.id) {
      this.setState({
        redirect:true
      })
    }
    if (prevProps.user.id && prevProps.user.id != this.props.user.id) {
      this.setState({
        redirect: true
      })
    }
  }

  componentDidMount() {
    if (!this.props.user.id || typeof this.props.user.id == 'undefined') {
      this.setState({
        userRedirect: true
      })
    }
  }

  submit() {
    const submission = {
      description: document.getElementById("submission-description").value,
      manufacturing: document.getElementById("submission-manufacturing").value,
      cad_url: document.getElementById("submission-cad").value,
      user_id: this.props.user.id
    }
    const image = this.state.imageData.split(',')[1]

    this.props.dispatch(Actions.imageUpload(submission, image, "create"))
  }

  handleImage = (imageValue) => {

    this.setState({imageData: imageValue});
  }

  render() {
    if (this.state.userRedirect) {
      return <Redirect to='/login'/>;
    }


     if(this.state.redirect) {
       return <Redirect to={{
            pathname: '/submissions',
            state: { submission: this.props.submission }
        }} />;
     }


    return (
      <div className="new-submission">
        <Header />
        <div className="body-container">
          <div className="submission-form-container">
            <h2>New Submission</h2>
            <label>Thumbnail image</label>
            <ImageUpload onSelectImage={this.handleImage} />
            <div className="inputGroup">
              <label>Description
              <textarea
                className="input"
                type="text"
                autoComplete="description"
                id="submission-description" />
                </label>
            </div>
            <div className="inputGroup">
            <label>Manufacturing Description
              <textarea
                className="input"
                type="text"
                autoComplete="manufacturing"
                id="submission-manufacturing" />
                </label>
            </div>
            <div className="inputGroup">
            <label>CAD File
              <input
                className="input"
                type="text"
                autoComplete="cad-file"
                id="submission-cad" />
                </label>
            </div>
            <button className="green" onClick={this.submit}>Submit</button>
            <Link to="/submissions"><FontAwesome name='chevron-left' />Cancel</Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  submission: state.submission
})

export default connect(mapStateToProps)(cssModules(NewSubmission, style))

import React from 'react'
import ReactDOM from 'react-dom'
import cssModules from "react-css-modules"
import style from "./style.css"
import { connect } from "react-redux"
import Actions from "../../redux/actions"
import { default as Header } from "../Header"
import {default as ImageUpload} from "../ImageUpload"
import classNames from 'classnames';
import { Redirect } from 'react-router-dom'

export class NewSubmission extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      redirect: false,
      imageData: ""
    }
    this.submit = this.submit.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.submission.id !== this.props.submission.id) {
      this.setState({
        redirect:true
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

    const { redirect } = this.state;



     if(this.state.redirect) {
       return <Redirect to={{
            pathname: '/submissions',
            state: { submission: this.props.submission }
        }} />;
     }


    return (
      <div className="submissions">
        <Header />
        <div className="body-container">
          <div className="submission-form-container">
            <h2>New Submission</h2>
            <ImageUpload onSelectImage={this.handleImage} />
            <div className="inputGroup">
              <textarea
                placeholder="Description"
                className="input"
                type="text"
                autoComplete="description"
                id="submission-description" />
            </div>
            <div className="inputGroup">
              <textarea
                placeholder="Manufacturing Description"
                className="input"
                type="text"
                autoComplete="manufacturing"
                id="submission-manufacturing" />
            </div>
            <div className="inputGroup">
              <input
                placeholder="CAD file"
                className="input"
                type="text"
                autoComplete="cad-file"
                id="submission-cad" />
            </div>
            <button onClick={this.submit}>Submit</button>
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

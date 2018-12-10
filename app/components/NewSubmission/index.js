import React from 'react'
import ReactDOM from 'react-dom'
import cssModules from "react-css-modules"
import style from "./style.css"
import { connect } from "react-redux"
import { initialUpload } from "../../redux/actions"
import { default as Header } from "../Header"
import {default as ImageUpload} from "../ImageUpload"
import classNames from 'classnames';
import { Link, Redirect } from 'react-router-dom'
import FontAwesome from "react-fontawesome";
import ReactTooltip from 'react-tooltip';

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

    this.props.initialUpload(submission, image, "create")
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
        <ReactTooltip />
        <Header />
        <div className="body-container">
          <div className="submission-form-container">
            <h2>New Submission</h2>
            <label>Thumbnail image <FontAwesome name='question-circle' data-tip="PNG or JPG that best respresents your idea in one look. Maximum size of 10 MB."/></label>
            <ImageUpload onSelectImage={this.handleImage} />
            <div className="inputGroup">
              <label>Description <FontAwesome name='question-circle' data-tip="How is the design innovative from the perspective of someone who lives with it? Exemplary designs should make clear the user problem being solved and general usability. Designers should also seek to draw from the regional character of New England, whether in a traditional sense or more urban or contemporary themes, and describe how the design fits into a New England home. Maximum 500 words."/>
              <textarea
                className="input"
                type="text"
                autoComplete="description"
                id="submission-description" />
                </label>
            </div>
            <div className="inputGroup">
            <label>Manufacturing <FontAwesome name='question-circle' data-tip="How your design will take advantage of innovations in the manufacturing process in 500 words. Assuming that the model relies on various components of different materials, walk us through each component and describe the sourcing and manufacturing process by which the material reenters the economy. How is it manufactured to be maintained, repaired, recycled, or reused? Maximum 500 words."/>
              <textarea
                className="input"
                type="text"
                autoComplete="manufacturing"
                id="submission-manufacturing" />
                </label>
            </div>
            <div className="inputGroup">
            <label>CAD File <FontAwesome name='question-circle' data-tip="Visit the Autodesk Viewer (https://viewer.autodesk.com/) and create a free user profile. Upload your CAD file (Autodesk’s viewer supports over 50 file formats...check with them with you’re worried your design isn’t supported). Once your design is uploaded, click the option to share and copy the url. This is the url that you’ll provide on the form to create a new submission. "/>
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

const mapDispatchToProps = {
  initialUpload: initialUpload
};

const mapStateToProps = state => ({
  user: state.user,
  submission: state.submission
})

export default connect(mapStateToProps, mapDispatchToProps)(cssModules(NewSubmission, style))

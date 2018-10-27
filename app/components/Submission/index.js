import React from "react"
import ReactDOM from 'react-dom'
import cssModules from "react-css-modules"
import style from "./style.css"
import { default as Header } from "../Header"
import Actions from "../../redux/actions"
import { connect } from "react-redux"
import {default as ImageUpload} from "../ImageUpload"
import classNames from 'classnames';
import { Redirect } from 'react-router-dom'

export class Submission extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      model: {},
      isEditing: false,
      isDirty: false,
      imageData: null,
      imageDirty: false
    }

    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.submit = this.submit.bind(this);
  }

  submit() {

    const submission = {
      id: this.props.submission.id,
      description: document.getElementById("submission-description").value,
      manufacturing: document.getElementById("submission-manufacturing").value,
      cad_url: document.getElementById("submission-cad").value,
      user_id: this.props.user.id
    }

    if (this.state.imageDirty) {
      this.props.dispatch(Actions.imageUpload(submission, this.state.imageData.split(',')[1], "update"))
    } else {
      submission.photo_url = this.state.model.photo_url
      this.props.dispatch(Actions.submissionUpdate(submission.id, submission))
    }


    this.setState({
      isEditing: false,
      isDirty: false,
      model: this.props.submission
    })
  }

  handleImage = (imageValue) => {

    this.setState({
      imageData: imageValue,
      isDirty: true,
      imageDirty: true
    });
  }

  componentDidMount() {
    let query = this.props.match.params.id

    this.props.dispatch(Actions.submission(query))
  }

  componentDidUpdate(prevProps) {
     if (prevProps.submission !== this.props.submission) {
       this.setState({
         model: this.props.submission
       })
     }
   }

   showUpdateTrigger = () => {
     if (this.state.model.user_id===this.props.user.id) {
       return <button id="edit-button" onClick={this.toggleEditMode}>Edit this Submission</button>
     }
   }

   toggleEditMode = () => {
     this.setState(prevState => ({
       isEditing: !prevState.isEditing
     }));
   }

   handleChange = (event) => {
     if (event.target.defaultValue != event.target.value) {
       this.setState({
         isDirty:true
       })
     } else {
       this.setState({
         isDirty:false
       })
     }
   }

   cancelEdit = () => {
     this.setState({
       isEditing: false
     })
   }

  render() {
    var editClasses = classNames(
      {'edits': this.state.isDirty},
    )

    var child = this.state.isEditing ?
      <div className="copy-container">
        <ImageUpload onSelectImage={this.handleImage} src={this.state.model.photo_url} />
        <h2>Description</h2>
        <div className="inputGroup">
          <textarea
            placeholder="Description"
            className="input"
            type="text"
            autoComplete="description"
            id="submission-description"
            defaultValue={this.state.model.description}
            onChange={this.handleChange}
            />
        </div>
        <h2>Manufacturing</h2>
        <div className="inputGroup">
          <textarea
            placeholder="Manufacturing"
            className="input"
            type="text"
            autoComplete="manufacturing"
            id="submission-manufacturing"
            defaultValue={this.state.model.manufacturing}
            onChange={this.handleChange}
            />
        </div>
        <h2>CAD URL</h2>
        <div className="inputGroup">
          <input
            placeholder="CAD URL"
            className="input"
            type="text"
            autoComplete="description"
            id="submission-cad"
            defaultValue={this.state.model.cad_url}
            onChange={this.handleChange}
            />
        </div>
        <button id="update-submission" className={editClasses} onClick={this.submit}>Update Submission</button>
        <button id="cancel-edit" onClick={this.cancelEdit}>Cancel</button>
      </div> :

      <div className="copy-container">
        <h2>Image</h2>
        <img src={this.state.model.photo_url} />
        <h2>Description</h2>
        <p>{this.state.model.description}</p>
        <h2>Manufacturing</h2>
        <p>{this.state.model.manufacturing}</p>
        <h2>CAD File</h2>
        <p>{this.state.model.cad_url}</p>
        <h2>User</h2>
        <p>{this.state.model.user_id}</p>
        {this.showUpdateTrigger()}
      </div>


    return (
      <div className="submissions">
        <Header />
        <div className="body-container">
          <h2>Submission #{this.state.model.id}</h2>
          {child}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  submission: state.submission
})

export default connect(mapStateToProps)(cssModules(Submission, style))

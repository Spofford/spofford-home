import React from "react"
import ReactDOM from 'react-dom'
import cssModules from "react-css-modules"
import style from "./style.css"
import { default as Header } from "../Header"
import Actions from "../../redux/actions"
import { connect } from "react-redux"
import {default as ImageUpload} from "../ImageUpload"
import classNames from 'classnames';
import { Link, Redirect } from 'react-router-dom'
import FontAwesome from "react-fontawesome";

const Timestamp = require('react-timestamp');

export class Submission extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      model: {},
      isEditing: false,
      isDirty: false,
      imageData: null,
      imageDirty: false,
      judgeApproved: true,
      myComment: {},
      editingComment: false
    }

    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.submit = this.submit.bind(this);
    this.submitComment = this.submitComment.bind(this);
    this.editComment = this.editComment.bind(this);
    this.cancelEditComment = this.cancelEditComment.bind(this);
  }

  submitComment() {

    const comment = {
      submission_id: this.props.submission.id,
      approved: this.state.judgeApproved,
      comments: document.getElementById("comment").value,
      submission_id: this.state.model.id,
      user_id: this.props.user.id,
      version: this.props.submission.updated_at
    }

    if (this.state.myComment.id) {
      this.props.dispatch(Actions.commentUpdate(this.state.myComment.id, comment))
    } else {
      this.props.dispatch(Actions.commentCreate(comment))
    }
  }

  submit() {

    const comment = {
      //id: this.props.submission.id,
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
      imageDirty: true,
      redirect: false
    });
  }

  componentDidMount() {
    let query = this.props.match.params.id

    this.props.dispatch(Actions.submission(query))


    if (!this.props.user.id || typeof this.props.user.id == 'undefined') {
      this.setState({
        redirect: true
      })
    }

  }

  setComment = () => {
    var self = this
    if (this.props.user.role == "judge") {
      if (this.props.submission.comments) {
        this.props.submission.comments.forEach(function(element) {
          if (element.user_id == self.props.user.id) {
            self.setState({
              myComment: element,
              judgeApproved: element.approved
            })
          }
        })
      }
    }
  }

  handleJudgingChange = () => {
    this.setState(prevState => ({
      judgeApproved: !prevState.judgeApproved
    }));
  }

  componentDidUpdate(prevProps) {
     if (prevProps.submission !== this.props.submission) {
       this.setComment()
       this.setState({
         model: this.props.submission
       })
       if (this.props.user.role == "designer" && this.props.submission.user_id != this.props.user.id) {
         this.setState({
           redirect:true
         })
       }
     }
     if (prevProps.mySubmissions.length != this.props.mySubmissions.length) {
       this.props.dispatch(Actions.mySubmissions(this.props.user.id))
     }

     if (prevProps.comment.updated_at != this.props.comment.updated_at) {
       this.setState({
         myComment: this.props.comment,
         editingComment: false
       })
     }
     if (prevProps.user.id && prevProps.user.id != this.props.user.id) {
       this.setState({
         redirect: true
       })
     }

   }

   showUpdateTrigger = () => {
     if (this.state.model.user_id===this.props.user.id) {
       return <button id="edit-button" className="green" onClick={this.toggleEditMode}>Edit this Submission</button>
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

   editComment = () => {
     this.setState({
       editingComment: true
     })
   }

   cancelEditComment = () => {
     this.setState({
       editingComment: false
     })
   }

   myComment = () => {
     if (this.props.user.role=="judge") {
       if (this.state.myComment.id && !this.state.editingComment) {
         if (this.state.myComment.approved) {
           return(
           <div className="comment-body">
           <hr />
            <h3>My Review</h3>
            <p>Approved <Timestamp format="full" time={this.state.myComment.created_at}/></p>
            <button onClick={this.editComment} className="green">Edit Comment</button>
           </div>)
         } else if (!this.state.myComment.approved) {
           return(
           <div className="comment-body">
           <hr />
            <h3>My Review</h3>
            <p>Unapproved <Timestamp format="full" time={this.state.myComment.created_at}/></p>
            <p>{this.state.myComment.comments}</p>
            <button onClick={this.editComment} className="green">Edit Comment</button>
           </div>)
         }

       } else if (this.state.myComment.id == null || this.state.editingComment) {
         var commentClasses = classNames(
           {"no-comment": this.state.judgeApproved,
            'input-group': true
           }
         )
         // end if is editing or is creating
         return <div className="new-comment">
         <hr />
         <label className="radio-container">
         Approved
             <input
               type="radio"
               checked={this.state.judgeApproved}
               onChange={this.handleJudgingChange} />
               <span className="checkmark"></span>
           </label>
           <label className="radio-container">
           Needs Revision
               <input
                 type="radio"
                 checked={!this.state.judgeApproved}
                 onChange={this.handleJudgingChange} />
                 <span className="checkmark"></span>
             </label>
             <div className={commentClasses}>
               <textarea
                 placeholder="Comments"
                 className="input"
                 type="text"
                 autoComplete="comments"
                 id="comment"
                 />
             </div>
             <button id="create-update-comment" className="green" onClick={this.submitComment}>Submit Feedback</button>
             <button id="cancel-comment-edit" className="red" onClick={this.cancelEditComment}>Cancel</button>
            </div>
        }
      }
   }

   comments = () => {
     var self = this
     if (this.state.model.user_id===this.props.user.id || this.props.user.role=="admin") {
       if (this.state.model.comments) {
         var commentsList = this.state.model.comments.map(function(thing){
                      if(thing.approved) {
                        return <div key={thing} className="line-item"><p>Judge ID #0{thing.user_id}</p><p>APPROVED</p></div>;
                      } else {
                        return <div key={thing} className="line-item"><p>Judge ID #0{thing.user_id}</p><p>UNAPPROVED</p><p>{thing.comments}</p></div>;
                      }

                       })
         return  <div><hr />{ commentsList }</div>
       } else {
         return <div>NO FEEDBACK YET!</div>
       }
     } else if (this.props.user.role=="judge") {
       if (this.state.model.comments) {
         var comments = this.state.model.comments
         var commentsList = comments.map(function(thing){
           if (thing.user_id != self.props.user.id) {
           //return comment that isn't judge's
           }
         })
       }
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/login'/>;
    }

    var editClasses = classNames(
      {'edits': this.state.isDirty},
      'green'
    )

    var child = this.state.isEditing ?
      <div>
        <label>Screen Shot</label>
        <ImageUpload onSelectImage={this.handleImage} src={this.state.model.photo_url} />
        <div className="inputGroup">
          <label>Description
          <textarea
            placeholder="Description"
            className="input"
            type="text"
            autoComplete="description"
            id="submission-description"
            defaultValue={this.state.model.description}
            onChange={this.handleChange}
            />
            </label>
        </div>
        <div className="inputGroup">
        <label>Manufacturing
          <textarea
            placeholder="Manufacturing"
            className="input"
            type="text"
            autoComplete="manufacturing"
            id="submission-manufacturing"
            defaultValue={this.state.model.manufacturing}
            onChange={this.handleChange}
            />
            </label>
        </div>
        <div className="inputGroup">
        <label>CAD URL
          <input
            placeholder="CAD URL"
            className="input"
            type="text"
            autoComplete="description"
            id="submission-cad"
            defaultValue={this.state.model.cad_url}
            onChange={this.handleChange}
            />
            </label>
        </div>
        <button id="update-submission" className={editClasses} onClick={this.submit}>Update Submission</button>
        <button id="cancel-edit" className="red" onClick={this.cancelEdit}>Cancel</button>
      </div> :

      <div>
        <label>Image</label>
        <img src={this.state.model.photo_url} />
        <a href={this.state.model.cad_url} target="_blank">Click here to view CAD file</a>
        <label>Description</label>
        <p>{this.state.model.description}</p>
        <label>Manufacturing Description</label>
        <p>{this.state.model.manufacturing}</p>
        {this.showUpdateTrigger()}
      </div>


    return (
      <div className="submission">
        <Header />
        <div className="body-container">
          <div className="copy-container">
          <h2>Submission #{this.state.model.id}</h2>
          {child}
          {this.comments()}
          {this.myComment()}
          <Link className="return-link" to="/submissions"><FontAwesome name='chevron-left' />return to submissions</Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  comment: state.comment,
  user: state.user,
  submission: state.submission,
  mySubmissions: state.mySubmissions
})

export default connect(mapStateToProps)(cssModules(Submission, style))

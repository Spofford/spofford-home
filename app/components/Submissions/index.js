import React from "react"
import ReactDOM from 'react-dom'
import cssModules from "react-css-modules"
import style from "./style.css"
import { default as Header } from "../Header"
import Actions from "../../redux/actions"
import { connect } from "react-redux"
import { Link, Redirect } from 'react-router-dom'
import classNames from 'classnames';
import shallowCompare from 'react-addons-shallow-compare';
import FontAwesome from "react-fontawesome";

export class Submissions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mySubmissions: [],
      canFinalize: false,
      isLoaded: false
    }
  }

  componentDidMount() {
    if (this.props.user.role=="designer") {
      this.props.dispatch(Actions.mySubmissions(this.props.user.id)).then(this.setModel())
    } else if (this.props.user.role=="judge" || this.props.user.role=="admin" ) {
      this.props.dispatch(Actions.submissions()).then(this.setModel())
    }
  }

  componentDidUpdate(prevProps) {
     if (prevProps.mySubmissions.length != this.props.mySubmissions.length) {
       this.setModel()
     }
   }

   setModel = () => {
     this.setState({
       mySubmissions: this.props.mySubmissions,
       isLoaded: true
     })
   }

  render() {
    if  (this.props.user.role=="designer" || this.props.user.role == "admin") {
      var approved = this.state.mySubmissions.filter(function(thing) {
        return thing.approved == true
      })
      var unapproved = this.state.mySubmissions.filter(function(thing) {
        return thing.approved != true
      })

      if (approved && approved.length == 0) {
        var approvedItems = <p className="empty-message">No published items yet</p>
      } else {
        var approvedItems = approved.map((item) =>
          <div className="submission-tile" key={item.id}><Link to={'/submission/' + item.id}><img src={item.photo_url} /></Link><span>Submission #0{item.id}</span></div>
        );
      }

      if (unapproved && unapproved.length == 0) {
        var unapprovedItems = <p className="empty-message">No unpublished items</p>
      } else {
        var unapprovedItems = unapproved.map((item) =>
          <div className="submission-tile" key={item.id}><Link to={'/submission/' + item.id}><img src={item.photo_url} /></Link><span>Submission #0{item.id}</span></div>
        );
      }

      if (unapproved.length > 0) {
        var finalizeButton =
          <div className="finalize-fixed">
            <span>Pay your entry fees and/or finalize your submissions</span>
            <Link to="finalize">
              <button className="green">Finalize</button>
            </Link>
          </div>
      }

      if (this.props.user.role == "designer") {
        if (this.state.mySubmissions.length===0) {
          return(

          <div className="submissions">
            <Header />
            <div className="body-container">
              <div className="copy-container">
                <p className="empty-container"><Link to="/new-submission">Add your first submission.</Link> You will be able to edit any of your submissions before submissions are closed. You will not be charged for submissions until you indicate that you are ready.</p>
                <Link to="new-submission"><button className="new-submission-fixed"><FontAwesome name='plus' />New Submission</button></Link>
              </div>
            </div>
          </div>)
        } else {
          if (this.state.isLoaded) {
            return (
              <div className="submissions">
                <Header />
                <div className="body-container">
                {finalizeButton}
                  <div className="copy-container">

                    <div>
                     <h2>Unpublished Submissions</h2>
                     <div className="list-container">{unapprovedItems}</div>
                     <h2>Published Submissions</h2>
                     <div className="list-container">{approvedItems}</div>
                   </div>
                   <Link to="new-submission"><button className="new-submission-fixed"><FontAwesome name='plus' /> New Submission</button></Link>
                 </div>
               </div>
             </div>
            );
         }
        }
      } else if (this.props.user.role == "admin") {
        if (this.state.mySubmissions.length===0) {
          return(

          <div className="submissions">
            <Header />
            <div className="body-container">
              <div className="copy-container">
                <p className="empty-container">No submissions yet</p>
              </div>
            </div>
          </div>)
        } else {
          if (this.state.isLoaded) {
            return (
              <div className="submissions">
                <Header />
                <div className="body-container">
                  <div className="copy-container">
                    <div>
                     <h2>Unpublished Submissions</h2>
                     <div className="list-container">{unapprovedItems}</div>
                     <h2>Published Submissions</h2>
                     <div className="list-container">{approvedItems}</div>
                   </div>
                 </div>
               </div>
             </div>
            );
          }
        }
      }
    } else if (this.props.user.role == "judge") {
      var self = this
      var commentArray = []
      var noCommentArray = []

      this.state.mySubmissions.forEach(function(element) {
        if (element.comments.length > 0) {
          element.comments.forEach(function(subElement) {
            if (subElement.user_id == self.props.user.id && element.updated_at == subElement.version) {
              commentArray.push(element)
            } else if (subElement.user_id == self.props.user.id && element.updated_at != subElement.version) {
              noCommentArray.push(element)
            }
          })
        } else {
          noCommentArray.push(element)
        }
      })

      if (commentArray.length == 0) {
        var commentedItems = <p>Nothing to see here, folks.</p>
      } else {
        var commentedItems = commentArray.map((item) =>
          <div className="submission-tile" key={item.id}><Link to={'/submission/' + item.id}><img src={item.photo_url} /></Link><span>Submission #0{item.id}</span></div>
        );
      }

      if (noCommentArray.length == 0) {
        var uncommentedItems = <p>Nothing to see here, folks.</p>
      } else {
        var uncommentedItems = noCommentArray.map((item) =>
          <div className="submission-tile" key={item.id}><Link to={'/submission/' + item.id}><img src={item.photo_url} /></Link><span>Submission #0{item.id}</span></div>
        );
      }

      return (
      <div className="submissions">
        <Header />
        <div className="body-container">
          <div className="copy-container">
            <h2>Awaiting Comment</h2>
            <div className="list-container">{uncommentedItems}</div>
            <h2>Already Reviewed</h2>
            <div className="list-container">{commentedItems}</div>
          </div>
        </div>
      </div>
    );
    }
  }
}

const mapStateToProps = state => ({
  user: state.user,
  mySubmissions: state.mySubmissions
})

export default connect(mapStateToProps)(cssModules(Submissions, style))

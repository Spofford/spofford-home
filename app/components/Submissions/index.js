import React from "react"
import ReactDOM from 'react-dom'
import cssModules from "react-css-modules"
import style from "./style.css"
import { default as Header } from "../Header"
import Actions from "../../redux/actions"
import { connect } from "react-redux"
import { Link, Redirect } from 'react-router-dom'
import classNames from 'classnames';

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
    //console.log(this.props)
    this.props.dispatch(Actions.mySubmissions(this.props.user.id)).then(this.setModel)
  }

  componentDidUpdate(prevProps) {

  }

  setModel = () => {
    var submissions = this.props.mySubmissions

    if (this.props.location.state.submission.id) {
      submissions.push(this.props.location.state.submission)
    }

    this.setState({
      mySubmissions: submissions,
      isLoaded: true
    })
  }

  render() {
    const ms = this.state.mySubmissions
    const approved = ms.filter(function(thing) {
      return thing.approved == true
    })
    const unapproved = ms.filter(function(thing) {
      return thing.approved != true
    })
    const approvedItems = approved.map((item) =>
      <li key={item.id}><Link to={'/submission/' + item.id}>{item.id}</Link></li>
    );
    const unapprovedItems = unapproved.map((item) =>
      <li key={item.id}><Link to={'/submission/' + item.id}>{item.id}</Link></li>
    );

    if (unapproved.length > 0) {
      var finalizeButton =
        <Link to="finalize">
          <button className="finalize-fixed">Finalize</button>
        </Link>
    }

    if (ms.length===0) {
      return

      <div className="submissions">
        <Header />
        <div className="body-container">
          <div className="copy-container">
            <p>You have no submissions. <Link to="/new-submission">Start one now.</Link></p>
            <Link to="new-submission"><button className="new-submission-fixed">New Submission</button></Link>
          </div>
        </div>
      </div>
    } else {
      if (this.state.isLoaded) {
        return (
          <div className="submissions">
            <Header />
            <div className="body-container">
              <div className="copy-container">
                {finalizeButton}
                <h2>Submissions</h2>
                <div>
                 <h2>Unpublished Submissions</h2>
                 <ul>{unapprovedItems}</ul>
                 <h2>Published Submissions</h2>
                 <ul>{approvedItems}</ul>
               </div>
               <Link to="new-submission"><button className="new-submission-fixed">New Submission</button></Link>
             </div>
           </div>
         </div>
        );
      }
    }
  }
}

const mapStateToProps = state => ({
  user: state.user,
  mySubmissions: state.mySubmissions
})

export default connect(mapStateToProps)(cssModules(Submissions, style))

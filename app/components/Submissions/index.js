import React from "react"
import ReactDOM from 'react-dom'
import cssModules from "react-css-modules"
import style from "./style.css"
import { default as Header } from "../Header"
import Actions from "../../redux/actions"
import { connect } from "react-redux"
import { Link, Redirect } from 'react-router-dom'

export class Submissions extends React.Component {
  componentDidMount() {
    this.state = {
      mySubmissions: []
    }
  }

  componentDidUpdate(prevProps) {
     if (prevProps.user.id !== this.props.user.id) {
       this.props.dispatch(Actions.mySubmissions(this.props.user.id))
     }
   }

   mySubmissions(props) {
     const ms = this.props.mySubmissions;
     const msItems = ms.map((item) =>
       <li key={item.id}><Link to={"/submission/" + item.id}>GOOOOOO</Link></li>
     );
     return (
       <ul>{msItems}</ul>
     );
   }

  render() {

    //this.getModel()

    return (
      <div className="submissions">
        <Header />
        <div className="body-container">
          <div className="copy-container">
            <h2>Submissions</h2>
            {this.mySubmissions()}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  mySubmissions: state.mySubmissions
})

export default connect(mapStateToProps)(cssModules(Submissions, style))

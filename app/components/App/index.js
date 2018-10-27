import React from "react"
import { connect } from "react-redux"
import Actions from "../../redux/actions"
import { default as Footer } from "../Footer"
import cssModules from "react-css-modules"
import { Route } from 'react-router-dom'
import style from "./style.css"
import { Redirect } from 'react-router-dom'
import { default as About } from "../../components/About"
import { default as Home } from "../../components/Home"
import { default as Settings } from "../../components/Settings"
import { default as Studios } from "../../components/Studios"
import { default as Post } from "../../components/Post"
import { default as Search } from "../../components/Search"
import { default as Feedback } from "../../components/Feedback"
import { default as Show } from "../../components/Show"
import { default as Submissions } from "../../components/Submissions"
import { default as Login } from "../../components/Login"
import { default as Submission } from "../../components/Submission"
import { default as NewSubmission } from "../../components/NewSubmission"
import { default as Finalize } from "../../components/Finalize"

export class App extends React.Component {
  constructor(props) {
      super(props)

      this.state = {
        isAuthenticated:false,
        loaded:false
      }
  }

  componentDidMount() {
    if (localStorage.token==="" || localStorage.token==null) {
      this.setState({
        loaded:true
      })
    } else {
      this.props.dispatch(Actions.userAuth())
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isAuthenticated !== this.props.isAuthenticated) {
      this.setState({
        loaded:true
      })
    }
  }

  render() {
    if (this.state.loaded) {
      const PrivateRoute = ({ component: Component, ...rest }) => (
        <Route {...rest} render={(props) => (
          this.props.isAuthenticated === true
            ? <Component {...props} />
            : <Redirect to='/login' />
        )} />
      )

      return (
        <div>
          <div className="page-wrap">
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About} />
            <Route path="/settings" component={Settings} />
            <Route path="/studios" component={Studios} />
            <Route path="/show" component={Show} />
            <Route path="/login" component={Login} />
            <Route path="/post/:entity" component={Post} />
            <Route path="/search/:query" component={Search} />
            <Route path="/feedback/:object" component={Feedback} />
            <PrivateRoute path="/submission/:id" component={Submission} />
            <PrivateRoute path="/new-submission" component={NewSubmission} />
            <PrivateRoute path="/finalize" component={Finalize} />
            <PrivateRoute path='/submissions' component={Submissions}  />
          </div>
          <Footer />
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  user: state.user,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(cssModules(App, style))

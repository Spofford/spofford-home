import React from "react"
import { connect } from "react-redux"
import Actions from "../../redux/actions"
import { withRouter } from 'react-router-dom'
import PropTypes from "prop-types";
import cssModules from "react-css-modules"
import style from "./style.css"


export class App extends React.Component {

  componentDidMount() {
    if (localStorage.token) {
      this.props.dispatch(Actions.userAuth())
    }
    window.addEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);

    }
    /*
    if (prevProps.user.id != this.props.user.id) {
      if (this.props.user.id == "") {
        this.setState({
          redirect: false
        })
      } else {
        this.setState({
          redirect: true
        })
      }
    }
    */
  }

  render() {
    /*
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        this.state.redirect === false
          ? <Component {...props} />
          : <Redirect to='/login' />
      )} />
    )
    */

    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default withRouter(connect(mapStateToProps)(cssModules(App, style)))
//export default withRouter(App);

import React from "react"
import { connect } from "react-redux"
import { userAuth } from "../../redux/actions"
import { withRouter } from 'react-router-dom'

export class App extends React.Component {

  componentDidMount() {
    this.props.userAuth()
    window.addEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

const mapDispatchToProps = {
  userAuth: userAuth
};

const mapStateToProps = state => ({
  content: state.content
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
//export default withRouter(App);

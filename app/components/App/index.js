import React from "react"
import { connect } from "react-redux"
import Actions from "../../redux/actions"
import { withRouter } from 'react-router-dom'


export class App extends React.Component {

  componentDidMount() {
    this.props.dispatch(Actions.userAuth())
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

export default withRouter(connect()(App))
//export default withRouter(App);

import React from "react"
import { connect } from "react-redux"
import Actions from "../../redux/actions"
import { default as Footer } from "../Footer"

export class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(Actions.userAuth())
  }

  render() {
    return (
      <div className="page-wrap">
        {this.props.children}
        <Footer />
      </div>
    )
  }
}

export default connect()(App)

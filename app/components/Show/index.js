import React from "react"
import cssModules from "react-css-modules"
import style from "./style.css"
import { connect } from "react-redux"
import { Redirect } from 'react-router-dom'

import { default as Signup } from "../Signup"

export class Show extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      redirect:false
    }
  }

  componentDidMount = () => {


  }

  componentDidUpdate(prevProps) {

   }

  render() {
    if(this.props.user.isAuthenticated) {
      return <Redirect to='/submissions'/>;
    }

    return (
      <div>
        <Signup />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(cssModules(Show, style))

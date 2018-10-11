import React from "react"
import cssModules from "react-css-modules"
import style from "./style.css"

export class Submission extends React.Component {
  render() {
    return (
      <div>Submission</div>
    )
  }
}

export default cssModules(Submission, style)

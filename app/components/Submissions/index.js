import React from "react"
import cssModules from "react-css-modules"
import style from "./style.css"

export class Submissions extends React.Component {
  render() {
    return (
      <div>Submissions</div>
    )
  }
}

export default cssModules(Submissions, style)

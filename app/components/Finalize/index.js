import React from "react"
import cssModules from "react-css-modules"
import style from "./style.css"

export class Finalize extends React.Component {
  render() {
    return (
      <div>Finalize</div>
    )
  }
}

export default cssModules(Finalize, style)

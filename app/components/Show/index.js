import React from "react"
import cssModules from "react-css-modules"
import style from "./style.css"

import { default as Signup } from "../Signup"

export class Show extends React.Component {
  render() {
    return (
      <div>
        <Signup />
      </div>
    )
  }
}

export default cssModules(Show, style)

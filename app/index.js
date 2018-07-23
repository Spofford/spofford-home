import "./styles/reset.css"
import React from "react"
import ReactDOM from "react-dom"
import { Switch, HashRouter, Route, Redirect } from 'react-router-dom'

import { default as About } from "./components/About"
import { default as Home } from "./components/Home"
import { default as List } from "./components/List"
import { default as Settings } from "./components/Settings"
import { default as Studios } from "./components/Studios"

const App = props => (<div>{props.children}</div>)

ReactDOM.render(
  <HashRouter>
    <Switch>
      <App>
        <Route path="/about" component={About} />
        <Route exact path='/' component={Home} />
        <Route path="/list" component={List} />
        <Route path="/settings" component={Settings} />
        <Route path="/studios" component={Studios} />
      </App>
    </Switch>
  </HashRouter>,
  document.getElementById("root")
)

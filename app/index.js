import "./styles/main.css"
import React from "react"
import ReactDOM from "react-dom"
import { Switch, HashRouter, Route, Redirect } from 'react-router-dom'

import { default as About } from "./components/About"
import { default as Home } from "./components/Home"
import { default as List } from "./components/List"
import { default as Settings } from "./components/Settings"
import { default as Studios } from "./components/Studios"
import { default as Header } from "./components/Header"
import { default as Footer } from "./components/Footer"

const App = props => (<div>{props.children}</div>)

ReactDOM.render(
  <HashRouter>
    <Switch>
      <App>
        <Header />
        <div className="page-wrap">
          <Route path="/about" component={About} />
          <Route exact path='/' component={Home} />
          <Route path="/list" component={List} />
          <Route path="/settings" component={Settings} />
          <Route path="/studios" component={Studios} />
        </div>
        <Footer />
      </App>
    </Switch>
  </HashRouter>,
  document.getElementById("root")
)

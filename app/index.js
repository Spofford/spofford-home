import "./styles/main.css"
import React from "react"
import ReactDOM from "react-dom"
import { Switch, HashRouter, Route, Redirect } from 'react-router-dom'

import { default as About } from "./components/About"
import { default as Home } from "./components/Home"
import { default as Settings } from "./components/Settings"
import { default as Studios } from "./components/Studios"
import { default as Header } from "./components/Header"
import { default as Footer } from "./components/Footer"
import { default as Post } from "./components/Post"
import { default as Feedback } from "./components/Feedback"

const App = props => (<div>{props.children}</div>)

ReactDOM.render(
  <HashRouter>
    <Switch>
      <App>
        <Header />
        <div className="page-wrap">
          <Route path="/about" component={About} />
          <Route exact path='/' component={Home} />
          <Route path="/settings" component={Settings} />
          <Route path="/studios" component={Studios} />
          <Route path="/post/:entity" component={Post} />
          <Route path="/feedback/:object" component={Feedback} />
        </div>
        <Footer />
      </App>
    </Switch>
  </HashRouter>,
  document.getElementById("root")
)

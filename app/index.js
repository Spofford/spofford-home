import "./styles/main.css"
import React from "react"
import ReactDOM from "react-dom"
import { Switch, BrowserRouter, Route, Redirect } from 'react-router-dom'
import { Provider } from "react-redux"
import store from "./redux/store"

import { default as About } from "./components/About"
import { default as Home } from "./components/Home"
import { default as Settings } from "./components/Settings"
import { default as Studios } from "./components/Studios"
import { default as Post } from "./components/Post"
import { default as Search } from "./components/Search"
import { default as Feedback } from "./components/Feedback"
import { default as Footer } from "./components/Footer"
import { default as Show } from "./components/Show"
import { default as Submissions } from "./components/Submissions"
import { default as Login } from "./components/Login"
import { default as Submission } from "./components/Submission"
import { default as Finalize } from "./components/Finalize"

const App = props => (<div>{props.children}</div>)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <App>
          <div className="page-wrap">
            <Route path="/about" component={About} />
            <Route exact path='/' component={Home} />
            <Route path="/settings" component={Settings} />
            <Route path="/studios" component={Studios} />
            <Route path="/show" component={Show} />
            <Route path="/submissions" component={Submissions} />
            <Route path="/login" component={Login} />
            <Route path="/submission" component={Submission} />
            <Route path="/finalize" component={Finalize} />
            <Route path="/post/:entity" component={Post} />
            <Route path="/search/:query" component={Search} />
            <Route path="/feedback/:object" component={Feedback} />
          </div>
          <Footer />
        </App>
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
)

import "./styles/main.css"
import React from "react"
import ReactDOM from "react-dom"
import { Switch, BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux"
import store from "./redux/store"
import { default as App } from "./components/App"

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
     <Switch>
        <App />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
)

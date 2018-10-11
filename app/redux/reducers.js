import { combineReducers } from "redux"

function user(state = {
  first_name: "",
  last_name: "",
  email: "",
  id: ""
}, action) {
  switch (action.type) {
    case "USER_NEW":
      return Object.assign({}, state, {
        email: action.payload.user.email,
        first_name: action.payload.user.first_name,
        last_name: action.payload.user.last_name,
        id: action.payload.user.id
      })
    case "USER_LOGIN":
      return Object.assign({}, state, {
        email: action.payload.user.email,
        id: action.payload.user.id
      })
    default: return state
  }
}

const reducers = combineReducers({
  user
})

export default reducers

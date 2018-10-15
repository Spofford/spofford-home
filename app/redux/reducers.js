import { combineReducers } from "redux"

function user(state = {
  first_name: "",
  last_name: "",
  email: "",
  id: ""
}, action) {
  switch (action.type) {
    case "USER_AUTH":
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

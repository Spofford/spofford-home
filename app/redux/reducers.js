import { combineReducers } from "redux"

function user(state = {
  username: "",
  id: "",
}, action) {
  switch (action.type) {
    case "USER_NEW":
      return Object.assign({}, state, {
        username: action.payload.user.username,
        id: action.payload.user.id,
      })
    case "USER_LOGIN":
      return Object.assign({}, state, {
        username: action.payload.user.username,
        id: action.payload.user.id,
      })
    case "USER_AUTH":
      return Object.assign({}, state, {
        username: action.payload.user.username,
        id: action.payload.user.id,
      })
    default: return state
  }
}

const reducers = combineReducers({
  user
})

export default reducers

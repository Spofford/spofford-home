import { combineReducers } from "redux"

function user(state = {
  first_name: "",
  last_name: "",
  email: "",
  role: "",
  id: ""
}, action) {
  switch (action.type) {
    case "USER_AUTH":
      return Object.assign({}, state, {
        email: action.payload.user.email,
        first_name: action.payload.user.first_name,
        last_name: action.payload.user.last_name,
        role: action.payload.user.role,
        id: action.payload.user.id
      })
    default: return state
  }
}

function submission(state = {
  description: "",
  manufacturing: "",
  advance: "",
  approved: "",
  cad_url: "",
  photo_url: "",
  id: ""
}, action) {
  switch (action.type) {
    case "SUBMISSION":
      return Object.assign({}, state, {
        description: action.payload.submission.description,
        manufacturing: action.payload.submission.manufacturing,
        advance: action.payload.submission.advance,
        approved: action.payload.submission.approved,
        cad_url: action.payload.submission.cad_url,
        photo_url: action.payload.submission.photo_url,
        user_id: action.payload.submission.user_id,
        id: action.payload.submission.id
      })
    default: return state
  }
}

function mySubmissions(state = [], action) {
  switch (action.type) {
    case "MYSUBMISSIONS":
      return Object.assign([], state, action.payload.submissions)
    default: return state
  }
}

const reducers = combineReducers({
  user,
  mySubmissions,
  submission
})

export default reducers

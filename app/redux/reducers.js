import { combineReducers } from "redux"
import { LOCATION_CHANGE } from 'react-router-redux';

function auth(state = {
  isAuthenticated: false
}, action) {
  switch (action.type) {
    case "PAGE_AUTH":
      return Object.assign({}, state, {
        isAuthenticated: action.payload.page
      })
    default: return state
  }
}

function user(state = {
  first_name: "",
  last_name: "",
  email: "",
  role: "",
  id: "",
  charges: []
}, action) {
  switch (action.type) {
    case "USER_AUTH":
      return Object.assign({}, state, {
        email: action.payload.user.email,
        first_name: action.payload.user.first_name,
        last_name: action.payload.user.last_name,
        role: action.payload.user.role,
        id: action.payload.user.id,
        charges: action.payload.user.charges
      })
    default: return state
  }
}

function charge(state = {
  user_id: "",
  id: "",
  amount: ""
}, action) {
  switch (action.type) {
    case "CHARGE":
      return Object.assign({}, state, {
        user_id: action.charge.user_id,
        id: action.charge.id,
        amount: action.charge.amount
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
  id: "",
  comments: [],
  updated_at: ""
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
        id: action.payload.submission.id,
        comments: action.payload.submission.comments,
        updated_at: action.payload.submission.updated_at
      })
    default: return state
  }
}

function mySubmissions(state = [], action) {
  switch (action.type) {
    case LOCATION_CHANGE: {
      return {};
    }
    case "MYSUBMISSIONS":
      return Object.assign([], state, action.payload.submissions)
    default: return state
  }
}

const reducers = combineReducers({
  user,
  mySubmissions,
  submission,
  auth,
  charge
})

export default reducers

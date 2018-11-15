const Actions = {}

Actions.reset = function reset(reset) {
  return dispatch => fetch(`${env.API_HOST}/api/v1//users/reset`, {
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      token: reset.token,
      password: reset.password
    })
  })
  .then((res) => { return res.json() })
  .then((res) => {
    /* If success, log the user in */
    localStorage.token = res.jwt
    dispatch(Actions.userAuth())
  })
  .catch((err) => {
    console.warn(err)
  })
}

Actions.resetRequest = function resetRequest(email) {
  return dispatch => fetch(`${env.API_HOST}/api/v1/users/reset-request`, {
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email
    })
  })
  .then((res) => { return res.json() })
  .then((res) => {
    dispatch({
      type: "ERROR",
      payload: res.error.message
    })
  })
  .catch((err) => {
    console.warn(err)
  })
}

Actions.charge = function charge(token, amount, user) {
  return dispatch => fetch(`${env.API_HOST}/api/v1/charges`, {
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}` || ""
    },
    body: JSON.stringify({
      token: token.id,
      amount: amount,
      user: user
    })
  })
  .then((res) => { return res.json() })
  .then((res) => {
    dispatch({
      type: "CHARGE",
      charge: res.data
    })
    //
  //}).then((res) => {
    //console.log(res)

  })
  .catch((err) => {
    console.warn(err)
  })
}

Actions.finalizeSubmissions = function finalizeSubmissions(submissions) {
  return dispatch => fetch(`${env.API_HOST}/api/v1/submissions/finalize`, {
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}` || ""
    },
    body: JSON.stringify({
      submissions: submissions
    })
  })
  .then((res) => { return res.json() })
  .then((res) => {
    dispatch({
      type: "MYSUBMISSIONS",
      payload: {
        submissions: res.data
      }
    })
  })
  .catch((err) => {
    console.warn(err)
  })
}

Actions.logout = function logout() {
  return dispatch => fetch(`${env.API_HOST}/api/v1/sign_out`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}` || ""
    }
  })
  .then(() => {
    localStorage.token = ""
    dispatch({
      type: "USER_AUTH",
      payload: {
        user: {
          email: "",
          first_name: "",
          last_name: "",
          role: "",
          id: ""
        }
      }
    })
  })
  /*
  .then(() => {
    dispatch({
      type: "PAGE_AUTH",
      payload: {
        page: false
      }
    })
  })
  */
  .catch((err) => {
    console.warn(err)
  })
}

Actions.userAuth = function userAuth() {
    return dispatch => fetch(`${env.API_HOST}/api/v1/my_user`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}` || ""
      }
    })
    .then((res) => { return res.json() })
    .then((res) => {
      dispatch({
        type: "USER_AUTH",
        payload: {
          user: res
        }
      })
      /*
        dispatch({
          type: "PAGE_AUTH",
          payload: {
            page: true
          }
        })
        */
    })
    .catch((err) => {
      console.warn(err)
    })
}

Actions.userNew = function userNew(user) {
  return dispatch => fetch(`${env.API_HOST}/api/v1/sign_up`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ user })
  })
  .then((res) => {
    return res.json()
  })
  .then((res) => {
    var x = Object.keys(res)
    if (x.includes("error")) {
      var message = `${Object.keys(res.error.errors)[0]} ${res.error.errors[Object.keys(res.error.errors)[0]]}`
      dispatch({
        type: "ERROR",
        payload: message
      })
    } else {
    /* If success, log the user in */
      localStorage.token = res.jwt
      dispatch(Actions.userAuth())
    }
  })
  .catch((err) => {
    //console.log(err)
    //console.warn(err.message)
  })
}

Actions.contactCreate = function contactCreate(user) {
  return dispatch => fetch("https://api.hubapi.com/contacts/v1/contact/?hapikey=1a620137-903f-427d-b97b-daadabc4bae8", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      properties: [
        {
          "property": "email",
          "value": user.email
        },
        {
          "property": "firstname",
          "value": user.first_name
        },
        {
          "property": "lastname",
          "value": user.last_name
        }
      ]
    })
  })
  .then((res) => { return res.json() })
  .catch((err) => {
    console.log(err)
  })
}

Actions.userLogin = function userLogin(user) {
  return dispatch => fetch(`${env.API_HOST}/api/v1/sign_in`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}` || ""
    },
    body: JSON.stringify({
      email: user.email,
      password: user.password
    })
  })
  .then((res) => { return res.json() })
  .then((res) => {
    var x = Object.keys(res)
    if (x.includes("error")) {
      var message = `${res.error}`
      dispatch({
        type: "ERROR",
        payload: message
      })
    } else {
      /* If success, log the user in */
      localStorage.token = res.jwt
      /* Then send action to reducer */
      dispatch(Actions.userAuth())
    }
  })
  .catch((err) => {
    console.warn(err)
  })
}

Actions.imageUpload = function imageUpload(submission, image, action) {
  return dispatch => fetch(`${env.API_HOST}/api/v1/submission/image`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}` || ""
    },
    body: JSON.stringify({ image })
  })
  .then((res) => { return res.json() })
  .then((res) => {
    submission.photo_url = res.image
    if (action=="create") {
      dispatch(Actions.submissionNew(submission))
    } else if (action=="update") {
      dispatch(Actions.submissionUpdate(submission.id, submission))
    }
  })
  .catch((err) => {
    console.warn(err)
  })
}

Actions.submissionNew = function submissionNew(submission) {
  return dispatch => fetch(`${env.API_HOST}/api/v1/submissions`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}` || ""
    },
    body: JSON.stringify({ submission })
  })
  .then((res) => { return res.json() })
  .then((res) => {
    dispatch({
      type: "SUBMISSION",
      payload: {
        submission: res.data
      }
    })
  })
  .catch((err) => {
    console.warn(err)
  })
}

Actions.submissionUpdate = function submissionUpdate(id, submission) {
  return dispatch => fetch(`${env.API_HOST}/api/v1/submission/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}` || ""
    },
    body: JSON.stringify({ submission })
  })
  .then((res) => { return res.json() })
  .then((res) => {
    dispatch({
      type: "SUBMISSION",
      payload: {
        submission: res.data
      }
    })
  })
  .catch((err) => {
    console.warn(err)
  })
}

Actions.submissions = function submissions() {
  return dispatch => fetch(`${env.API_HOST}/api/v1/submissions`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}` || ""
    }
  })
  .then((res) => { return res.json() })
  .then((res) => {
    dispatch({
      type: "MYSUBMISSIONS",
      payload: {
        submissions: res.data
      }
    })
  })
  .catch((err) => {
    console.warn(err)
  })
}

Actions.mySubmissions = function mySubmissions(user) {
  return dispatch => fetch(`${env.API_HOST}/api/v1/submissions/designer/${user}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}` || ""
    }
  })
  .then((res) => { return res.json() })
  .then((res) => {
    dispatch({
      type: "MYSUBMISSIONS",
      payload: {
        submissions: res.data
      }
    })
  })
  .catch((err) => {
    console.warn(err)
  })
}

Actions.submission = function submission(submission) {
  return dispatch => fetch(`${env.API_HOST}/api/v1/submission/${submission}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}` || ""
    }
  })
  .then((res) => { return res.json() })
  .then((res) => {
    dispatch({
      type: "SUBMISSION",
      payload: {
        submission: res.data
      }
    })
  })
  .catch((err) => {
    console.warn(err)
  })
}

Actions.commentCreate = function commentCreate(comment) {
  return dispatch => fetch(`${env.API_HOST}/api/v1/comments`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}` || ""
    },
    body: JSON.stringify({ comment })
  })
  .then((res) => { return res.json() })
  .then((res) => {
    dispatch({
      type: "COMMENT",
      comment: res.data
    })
  })
  .catch((err) => {
    console.warn(err)
  })
}

Actions.commentUpdate = function commentUpdate(id, comment) {
  return dispatch => fetch(`${env.API_HOST}/api/v1/comment/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}` || ""
    },
    body: JSON.stringify({ comment })
  })
  .then((res) => { return res.json() })
  .then((res) => {
    dispatch({
      type: "COMMENT",
      comment: res.data
    })
  })
  .catch((err) => {
    console.warn(err)
  })
}

Actions.modal = function modal() {
  return {
    type: "MODAL",
    modal: false
  }
}

export default Actions

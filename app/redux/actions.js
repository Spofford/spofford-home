import * as contentful from 'contentful';
const Actions = {}

export function fetchContent(model) {
  return function(dispatch) {
    const client = contentful.createClient({
      space: 'cahjy08ew1qz',
      accessToken: '37c6ec31a1a6cb3f533f51fa4c4af8fee88e2f910d9879eb79b2d073ae8cc499'
    })
    client.getEntries({
      'sys.id[in]': model })
    .then((res) => {
      dispatch({
        type: "CONTENT",
        payload: res
      })
    });
  }
};

export function fetchLinkedContent(model) {
  return function(dispatch) {
    const client = contentful.createClient({
      space: 'cahjy08ew1qz',
      accessToken: '37c6ec31a1a6cb3f533f51fa4c4af8fee88e2f910d9879eb79b2d073ae8cc499'
    })
    client.getEntries(model)
    .then((res) => {
      dispatch({
        type: "CONTENT",
        payload: res
      })
    });
  }
};

export function fetchPosts() {
  return function(dispatch) {
    const client = contentful.createClient({
      space: 'cahjy08ew1qz',
      accessToken: '37c6ec31a1a6cb3f533f51fa4c4af8fee88e2f910d9879eb79b2d073ae8cc499'
    })
    client.getEntries({ content_type: 'blogPost', order: '-fields.datePublished' })
    .then((res) => {
      dispatch({
        type: "POSTS",
        payload: res
      })
    });
  }
};

export function fetchChildren() {
  return function(dispatch) {
    const client = contentful.createClient({
      space: 'cahjy08ew1qz',
      accessToken: '37c6ec31a1a6cb3f533f51fa4c4af8fee88e2f910d9879eb79b2d073ae8cc499'
    })
    client.getEntries({ content_type: 'object' })
    .then((res) => {
      dispatch({
        type: "OBJECTS",
        payload: res
      })
    });
  }
}

export function fetchConcepts(object) {
  return function(dispatch) {
    const client = contentful.createClient({
      space: 'cahjy08ew1qz',
      accessToken: '37c6ec31a1a6cb3f533f51fa4c4af8fee88e2f910d9879eb79b2d073ae8cc499'
    })
    client.getEntries({
      content_type: 'concept',
      'fields.object.sys.id': object
    })
    .then((res) => {
      dispatch({
        type: "CONCEPTS",
        payload: res
      })
    });
  }
}

export function fetchSearch(query) {
  return function(dispatch) {
    const client = contentful.createClient({
      space: 'cahjy08ew1qz',
      accessToken: '37c6ec31a1a6cb3f533f51fa4c4af8fee88e2f910d9879eb79b2d073ae8cc499'
    })
    client.getEntries({
      content_type: 'blogPost',
      'query': query
    })
    .then((res) => {
      dispatch({
        type: "POSTS",
        payload: res
      })
    });
  }
};

export function fetchAsset(query) {
  return function(dispatch) {
    const client = contentful.createClient({
      space: 'cahjy08ew1qz',
      accessToken: '37c6ec31a1a6cb3f533f51fa4c4af8fee88e2f910d9879eb79b2d073ae8cc499'
    })
    client.getAsset(query)
    .then((res) => {
      dispatch({
        type: "ASSET",
        payload: res
      })
    });
  }
}

export function toggleModal() {
  return {
    type: "MODAL",
    modal: false
  }
}

export function initialUpload(submission, image, action) {
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
      dispatch(submissionNew(submission))
    } else if (action=="update") {
      dispatch(submissionUpdate(submission.id, submission))
    }
  })
  .catch((err) => {
    console.warn(err)
  })
}

export function reset(reset) {
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
    dispatch(userAuth())
  })
  .catch((err) => {
    console.warn(err)
  })
}

export function resetRequest(email) {
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
  .then((res) => {
    if (res.status==204) {
      dispatch({
        type: "ERROR",
        payload: "green"
      })
    } else {
      return res.json().then((res) => {
        dispatch({
          type: "ERROR",
          payload: res.error.message
        })
      })
    }
  })
  .catch((err) => {
    console.warn(err)
  })
}

export function charge(token, amount, user) {
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

export function finalizeSubmissions(submissions) {
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

export function logout() {
  return dispatch => fetch(`${env.API_HOST}/api/v1/sign_out`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}` || ""
    }
  })
  .then((res) => {
    if (res.status==204) {
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
    }
  })
  .catch((err) => {
    console.warn(err)
  })
}

export function userAuth() {
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
        payload: res
      })
    })
    .catch((err) => {
      console.warn(err)
    })
}

export function userNew(user) {
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
      dispatch({
        type: "USER_AUTH",
        payload: {
          user: res
        }
      })
    /* If success, log the user in */
    //  dispatch(Actions.userLogin(res))
      localStorage.token = res.jwt
      dispatch(userAuth())
    }
  })
  .catch((err) => {
    //console.log(err)
    //console.warn(err.message)
  })
}

export function contactCreate(user) {
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

export function userLogin(user) {
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
      dispatch(userAuth())
    }
  })
  .catch((err) => {
    console.warn(err)
  })
}

function submissionNew(submission) {
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

function submissionUpdate(id, submission) {
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

export function submissions() {
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

export function mySubmissions(user) {
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

export function submission(submission) {
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

export function commentCreate(comment) {
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

export function commentUpdate(id, comment) {
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

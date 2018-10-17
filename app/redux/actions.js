const Actions = {}

Actions.logout = function logout() {
  return dispatch => fetch("http://localhost:4000/api/v1/sign_out", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}` || ""
    }
  })
  .then((res) => {
    localStorage.token = ""
    dispatch(Actions.userAuth({user: ""}))
  })
  .catch((err) => {
    console.warn(err)
  })
}

Actions.userAuth = function userAuth() {
  return dispatch => fetch("http://localhost:4000/api/v1/my_user", {
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
  })
  .catch((err) => {
    console.warn(err)
  })
}

Actions.userNew = function userNew(user) {
  return dispatch => fetch("http://localhost:4000/api/v1/sign_up", {
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
    /* If success, log the user in */
    localStorage.token = res.jwt
    dispatch(Actions.userAuth())
  })
  .catch((err) => {
    console.warn(err)
  })
}

Actions.userLogin = function userLogin(user) {
  return dispatch => fetch("http://localhost:4000/api/v1/sign_in", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: user.email,
      password: user.password
    })
  })
  .then((res) => { return res.json() })
  .then((res) => {
    /* If success, log the user in */
    localStorage.token = res.jwt
    /* Then send action to reducer */
    dispatch(Actions.userAuth())
  })
  .catch((err) => {
    console.warn(err)
  })
}

export default Actions

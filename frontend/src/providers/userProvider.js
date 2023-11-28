const {fetchFromBackEnd} = require("./providerBase");

async function userRegister(user) {
  const url = "/user/register";
  const method = "POST";
  const body = user;
  return await fetchFromBackEnd({url, method, body});
}

async function userLogin(user) {
  const url = "/user/login";
  const method = "POST";
  const body = user;
  return await fetchFromBackEnd({url, method, body});
}

async function getCredentials() {
  const url = "/user/credentials";
  return await fetchFromBackEnd({url});
  //return response.status === 200 ? response : null;
}

async function userLogout() {
  const url = "/user/logout";
  const method = "DELETE";
  return await fetchFromBackEnd({url, method});
}

module.exports = {
  userRegister,
  userLogin,
  getCredentials,
  userLogout
};

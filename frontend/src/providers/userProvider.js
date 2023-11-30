const {fetchFromBackEnd} = require("./providerBase");

async function userRegister(user) {
  return await fetchFromBackEnd({url: "/user/register", method: "POST", body: user});
}

async function userLogin(user) {
  return await fetchFromBackEnd({url: "/user/login", method: "POST", body: user});
}

async function getCredentials() {
  return await fetchFromBackEnd({url: "/user/credentials"});
  //return response.status === 200 ? response : null;
}

async function userLogout() {
  return await fetchFromBackEnd({url: "/user/logout", method: "DELETE"});
}

module.exports = {
  userRegister,
  userLogin,
  getCredentials,
  userLogout
};

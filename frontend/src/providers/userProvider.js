async function userRegister(user) {
  const res = await fetch(`/api/user/register`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json"
    }
  });
}

async function userLogin(user) {
  const res = await fetch(`/api/user/login`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json"
    }
  });
  return await res.json();
}

async function getCredentials() {
  const res = await fetch(`/api/user/credentials`);
  return res.status === 200 ? await res.json() : null;
}

async function userLogout() {
  const res = await fetch(`/api/user/logout`, {
    method: "DELETE", headers: {
      "Content-Type": "application/json"
    }
  });
  return res.json();
}

module.exports = {
  userRegister,
  userLogin,
  getCredentials,
  userLogout
};

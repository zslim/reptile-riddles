async function userRegister(user) {
  const res = await fetch(`/user/register`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json"
    }
  });
}

async function userLogin(user) {
  const res = await fetch(`/user/login`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json"
    }
  });
  return await res.json();
}

async function getCredentials() {
  const res = await fetch(`/user/credentials`);
  return res.status === 200 ? await res.json() : null;
}

module.exports = {
  userRegister,
  userLogin,
  getCredentials
};

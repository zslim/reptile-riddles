async function register(user) {
  const res = await fetch(`/user/register`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json"
    }
  });
}

module.exports = {
  register
};
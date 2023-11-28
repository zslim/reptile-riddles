async function get({url}) {
  const response = await fetch(url);
  const json = await response.json();
  json.status = response.status;
  return json;
}

async function fetchWithMethod({url, method}) {
  const response = await fetch(url, {
    method
  });
  const json = await response.json();
  json.status = response.status;
  return json;
}

async function fetchWithMethodAndBody({url, method, body}) {
  const response = await fetch(url, {
    method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  });
  const json = await response.json();
  json.status = response.status;
  return json;
}

async function fetchFromBackEnd(options) {
  if (options.method) {
    if (options.body) {
      return fetchWithMethodAndBody(options);
    }
    return fetchWithMethod(options);
  }
  return get(options);
}

module.exports = {
  fetchFromBackEnd
};

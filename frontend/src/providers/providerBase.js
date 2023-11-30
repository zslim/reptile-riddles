async function get({url}) {
  const response = await fetch(url);
  return parseResponse(response);
}

async function fetchWithMethod({url, method}) {
  const response = await fetch(url, {
    method
  });
  return parseResponse(response);
}

async function fetchWithMethodAndBody({url, method, body}) {
  const response = await fetch(url, {
    method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  });
  return parseResponse(response);
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

async function parseResponse(response) {
  let json = {};
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    json = await response.json();
  }
  json.status = response.status;
  return json;
}

module.exports = {
  fetchFromBackEnd
};

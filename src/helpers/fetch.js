const baseURL = process.env.REACT_APP_API_URL;

export const fetchSinToken = (endpoint, data, method = "GET") => {
  const url = `${baseURL}/${endpoint}`;

  if (method === "GET") {
    return fetch(url).then(res => res.json());
  } else {
    return fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(res => res.json());
  }
};
export const fetchConToken = (endpoint, data, method = "GET") => {
  const url = `${baseURL}/${endpoint}`;
  const token = localStorage.getItem("token") || "";

  if (method === "GET") {
    return fetch(url, {
      method,
      headers: {
        "x-token": token,
      },
    }).then(res => res.json());
  } else {
    return fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
        "x-token": token,
      },
      body: JSON.stringify(data),
    }).then(res => res.json());
  }
};
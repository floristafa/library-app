import axios from "axios";

import auth from "./auth.service";

export const authenticatedGet = (url) => {
  const token = auth.getToken();
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const authenticatedPost = (url, data) => {
  const token = auth.getToken();
  return axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const authenticatedPut = (url, data) => {
  const token = auth.getToken();
  return axios.put(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const authenticatedDelete = (url) => {
    const token = auth.getToken();
    return axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  
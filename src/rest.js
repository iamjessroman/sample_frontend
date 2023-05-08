import React from "react";

class Rest extends React.Component {
  async get(url) {
    const result = await fetch(url)
      .then((response) => response.json())
      .then(
        (res) => {
          return res;
        },
        (err) => {
          return { error: JSON.stringify(err) };
        }
      );
    return result;
  }

  async getAutorization(url, token) {
    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const result = await fetch(url, options)
      .then((response) => response.json())
      .then(
        (res) => {
          return res;
        },
        (err) => {
          return { error: JSON.stringify(err) };
        }
      );
    return result;
  }

  async post(url, body, type) {
    const options = {
      method: "POST",
      body: type === "application/json" ? JSON.stringify(body) : body,
      headers: {
        "Content-Type": type,
      },
    };
    const result = await fetch(url, options)
      .then((response) => response.json())
      .then(
        (res) => {
          return res;
        },
        (err) => {
          return { error: JSON.stringify(err) };
        }
      );
    return result;
  }

  async postAutorization(url, body, token, type) {
    const options = {
      method: "POST",
      body: type === "application/json" ? JSON.stringify(body) : body,
      headers: {
        "Content-Type": type,
        Authorization: "Bearer " + token,
      },
    };
    const result = await fetch(url, options)
      .then((response) => response.json())
      .then(
        (res) => {
          return res;
        },
        (err) => {
          return { error: JSON.stringify(err) };
        }
      );
    return result;
  }

  async postRebrandly(url, body, token, type) {
    const options = {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": type,
        apikey: token,
      },
    };
    const result = await fetch(url, options)
      .then((response) => response.json())
      .then(
        (res) => {
          return res;
        },
        (err) => {
          return { error: JSON.stringify(err) };
        }
      );
    return result;
  }

  async put(url, body, type) {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": type,
      },
      body: type === "application/json" ? JSON.stringify(body) : body,
    };

    const result = await fetch(url, options)
      .then((response) => response.json())
      .then(
        (res) => {
          return res;
        },
        (err) => {
          return { error: JSON.stringify(err) };
        }
      );
    return result;
  }

  async putAutorization(url, body, token, type) {
    const options = {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": type,
      },
      body: type === "application/json" ? JSON.stringify(body) : body,
    };

    const result = await fetch(url, options)
      .then((response) => response.json())
      .then(
        (res) => {
          return res;
        },
        (err) => {
          return { error: JSON.stringify(err) };
        }
      );
    return result;
  }

  async delete(url, body, type) {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": type,
      },
      body: type === "application/json" ? JSON.stringify(body) : body,
    };

    const result = await fetch(url, options)
      .then((response) => response.json())
      .then(
        (res) => {
          return res;
        },
        (err) => {
          return { error: JSON.stringify(err) };
        }
      );
    return result;
  }

  getFormData(obj) {
    const formData = new FormData();
    for (let i = 0; i < Object.keys(obj).length; i += 1) {
      formData.append(Object.keys(obj)[i], Object.values(obj)[i]);
    }
    return formData;
  }

  getQueryString(obj) {
    const keyValuePairs = [];
    for (let i = 0; i < Object.keys(obj).length; i += 1) {
      keyValuePairs.push(
        `${encodeURIComponent(Object.keys(obj)[i])}=${encodeURIComponent(
          Object.values(obj)[i]
        )}`
      );
    }
    return keyValuePairs.join("&");
  }
}
export default new Rest();

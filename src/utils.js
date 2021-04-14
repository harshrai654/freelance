import axios from "axios";

const utils = {
  login: (type, data) => {
    let url;
    if (type == 1) {
      url = "/freelancers/login";
    } else if (type == 2) {
      url = "/employers/login";
    }

    return url ? axios.post(url, data).then((res) => res) : null;
  },
  register: (data) => {
    let url;
    if (data.role == 1) {
      url = "/freelancers/register";
    } else if (data.role == 2) {
      url = "/employers/register";
    }

    return url ? axios.post(url, data).then((res) => res) : null;
  },
  saveToken: ({ token }) => {
    localStorage.setItem("token", token);
  },
  getToken: () => localStorage.getItem("token"),
  logout: () => localStorage.removeItem("token"),
};

export default utils;

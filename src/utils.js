import axios from "axios";

const utils = {
  login: (type, data) => {
    let url;
    if (type === 1) {
      url = "/freelancers/login";
    } else if (type === 2) {
      url = "/employers/login";
    }

    return url ? axios.post(url, data).then((res) => res) : null;
  },
  register: (data) => {
    let url;
    if (data.role === 1) {
      url = "/freelancers/register";
    } else if (data.role === 2) {
      url = "/employers/register";
    }

    return url ? axios.post(url, data).then((res) => res) : null;
  },
  saveToken: ({ token, user }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  },
  getToken: () => localStorage.getItem("token"),
  getUser: () => JSON.parse(localStorage.getItem("user")),
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  fetchProjects: (token) =>
    axios
      .get("/projects", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => res.data),

  addProject: ({ values, token, user }) =>
    axios.post(
      "/projects/create",
      { ...values, employer: user.id },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),

  getProjectsList: ({ token, user }) =>
    axios.post(
      "/employers/projects",
      { id: user.id },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),

  updateProject: (project, token) =>
    axios.post(
      "/projects/update",
      { ...project, id: project._id },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),
  
  applyProject: (project, freelancer, token)=>
      axios.post(
        "/apply/create",
        {project: project, freelancer: freelancer},
        {
          headers:{
            Authorization: "Bearer "+token
          },
        }
      ),
  fetchApplyRequests: (projectID, token)=>
        axios.get(
          "/projects/apply/"+projectID,{
            headers:{
              Authorization: "Bearer "+token,
            },
          }
        ),
};

export default utils;

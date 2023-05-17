import axios from "axios";
import instance from "./axiosService";

const fetchAllUser = (page) => {
  return instance.get(`/api/users?page=${page}`);
};
const addNewUser = (name, job) => {
  return instance.post(`/api/users`, { name, job });
};
const updateUser = (name, job) => {
  return instance.put(`/api/users/`, { name, job });
};

export { fetchAllUser, addNewUser, updateUser };

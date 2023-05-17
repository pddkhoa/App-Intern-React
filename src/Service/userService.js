import axios from "axios";
import instance from "./axiosService";

const fetchAllUser = (page) => {
  return instance.get(`/api/users?page=${page}`);
};

export { fetchAllUser };

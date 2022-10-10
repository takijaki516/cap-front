import axios from "axios";

const baseApi = axios.create({
  baseURL: "/api",
});

export default baseApi;

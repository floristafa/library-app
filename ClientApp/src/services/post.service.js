import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "/api/Authors";

const getAllPublicPosts = () => {
  return axios.get(API_URL ,{ headers: authHeader() });
};

const getAllPrivatePosts = () => {
  return axios.get(API_URL , { headers: authHeader() });
};

const postService = {
  getAllPublicPosts,
  getAllPrivatePosts,
};

export default postService;
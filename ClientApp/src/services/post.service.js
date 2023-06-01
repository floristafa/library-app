import { authenticatedGet } from "./axios.service";

const API_URL = "/api/Authors";

const getAllPublicPosts = () => {
  return authenticatedGet(API_URL);
};

const getAllPrivatePosts = () => {
  return authenticatedGet(API_URL);
};

const postService = {
  getAllPublicPosts,
  getAllPrivatePosts,
};

export default postService;
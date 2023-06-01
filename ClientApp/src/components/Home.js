import React, { useState, useEffect } from "react";
import PostService from "../services/post.service";

const Home = () => {
  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   PostService.getAllPublicPosts().then(
  //     (response) => {
  //       setPosts(response.data);
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }, []);

  return (
    <div>
      <h1>
       WELCOME TO THE LIBRARY APPLICATION!
      </h1>
    </div>
  );
};

export default Home;
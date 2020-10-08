import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog }) => {
  const [expand, setExpand] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  let action = expand ? "collapse" : "expand";

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const addLike = async () => {
    try {
      const blogToUpdate = { ...blog, likes: blog.likes + 1 };
      // await blogService.update({
      //   blogToUpdate,
      // });
      console.log(blogToUpdate);
    } catch {}
  };
  return (
    <div style={blogStyle}>
      {expand ? (
        <div>
          <p>
            {blog.title} {blog.author}
            <span>
              <button onClick={() => setExpand(!expand)}>{action}</button>
            </span>
          </p>
          <p>{blog.url}</p>
          <p>
            {blog.likes}
            <span>
              <button onClick={() => addLike()}>like</button>
            </span>
          </p>
          <p>{blog.user.name}</p>
        </div>
      ) : (
        <div>
          {blog.title} {blog.author}
          <span>
            <button onClick={() => setExpand(!expand)}>{action}</button>
          </span>
        </div>
      )}
    </div>
  );
};

export default Blog;

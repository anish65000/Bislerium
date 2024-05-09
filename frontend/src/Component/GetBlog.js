import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:7274/api/Blogs')
      .then(response => setBlogs(response.data))
      .catch(error => console.error('Error fetching blogs:', error));
  }, []);

  return (
    <div>
      <h1>Blogs</h1>
      <ul>
        {blogs.map(blog => (
          <li key={blog.blogId}>
            <h2>{blog.title}</h2>
            <p>{blog.body}</p>
            <p>Created At: {blog.createdAt}</p>
           
            
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BlogList;

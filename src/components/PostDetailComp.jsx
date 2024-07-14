import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function PostDetailComp() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); // Ensure this matches the parameter in the route

  useEffect(() => {
    getPostById();
  }, []);

  const getPostById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/post/${id}`);
      console.log('API Response:', response.data); // Add this line to check the response structure
      setTitle(response.data.title);
      setContent(response.data.content); // Adjust this line if the content field has a different name
    } catch (error) {
      console.error("There was an error fetching the post!", error);
    }
  };

  return (
    <>
    <div className="p-10">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="mt-4" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
    </>
  );
}

export default PostDetailComp;

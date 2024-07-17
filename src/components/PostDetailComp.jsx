import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "flowbite-react";
import { MdDateRange } from "react-icons/md";
import { FiShare2, FiCopy } from "react-icons/fi";
import { format } from "date-fns";
import Comment from "./Comment";
import CommentList from "./CommentList";
import Subscription from "./Subscription";

function PostDetailComp() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createdAt, setCreated] = useState("");
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const { id } = useParams();

  const titlePage = "Postingan";
  useEffect(() => {
    document.title = titlePage;
    getPostById();
    getCommentsByPostId();
  }, []);

  const getPostById = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/post/${id}`);
      // console.log('API Response:', response.data);
      setTitle(response.data.title);
      setContent(response.data.content);
      setCreated(response.data.createdAt);
      setLoading(false);
    } catch (error) {
      console.error("There was an error fetching the post!", error);
      setLoading(false);
    }
  };

  const getCommentsByPostId = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/comment/${id}`);
      // console.log('Comments Response:', response.data);
      setComments(response.data);
    } catch (error) {
      console.error("There was an error fetching the comments!", error);
    }
  };

  const handleAddComment = (newComment) => {
    setComments(prevComments => [...prevComments, newComment]);
  };

  const handleShareWhatsApp = () => {
    const url = window.location.href;
    const message = encodeURIComponent(`Check out this post: ${url}`);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url)
      .then(() => alert('Link copied to clipboard'))
      .catch((err) => console.error('Failed to copy:', err));
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        {loading ? (
          <Card className="max-w-4xl p-4 mt-8 mb-7 animate-pulse">
            <div className="p-4">
              <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
              <div className="h-40 bg-gray-300 rounded mb-4"></div>
              <div className="flex justify-end mt-4 space-x-2">
                <div className="h-8 bg-gray-300 rounded w-24"></div>
                <div className="h-8 bg-gray-300 rounded w-24"></div>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="max-w-4xl p-1 mt-8 mb-7">
            <div className="p-4">
              <h1 className="text-3xl capitalize font-bold text-center">{title}</h1>
              <p className="text-center text-gray-600 mt-2">
                {createdAt && (
                  <>
                    <MdDateRange className="inline-block mr-2" />
                    {format(new Date(createdAt), "MMMM dd, yyyy")}
                  </>
                )}
              </p>
              <div className="mt-4 text-justify" dangerouslySetInnerHTML={{ __html: content }} />
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 flex items-center"
                  onClick={handleShareWhatsApp}
                >
                  <FiShare2 className="inline-block mr-1" />
                  Share Whats App
                </button>
                <button
                  className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300"
                  onClick={handleCopyLink}
                >
                  <FiCopy className="inline-block mr-1" />
                  Copy Link
                </button>
              </div>
            </div>
          </Card>
        )}
      </div>

      {!loading && (
        <>
          <Comment postId={id} onAddComment={handleAddComment} />
          <CommentList comments={comments} />
          
          <Subscription/>
        </>
      )}
    </>
  );
}

export default PostDetailComp;

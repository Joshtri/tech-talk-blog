"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Head from "next/head"; // Tambahkan import ini
import '@/styles/readPost/precode.css';

import axios from "axios";
import { MdDateRange } from "react-icons/md";
import { FiCopy, FiHeart } from "react-icons/fi";
import { format } from "date-fns";
import { Flip, toast, ToastContainer } from "react-toastify";
import Comment from "@/components/ReadPost/Comment";
import CommentList from "@/components/ReadPost/CommentList";
import ShareButton from "@/components/ReadPost/ShareButton";
import Subscription from "@/components/Subscription"; // Import komponen Subscription
import "react-toastify/dist/ReactToastify.css";
import "highlight.js/styles/monokai-sublime.css";

const createPageTitle = (postTitle) => {
  const siteName = "Tech Talks Blog";
  return postTitle ? `${siteName} | ${postTitle}` : siteName;
};

export default function ReadPost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const params = useParams();
  const slug = params.slug;

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/post/${slug}`
      );
      setPost(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching the post:", err);
      setError("Error fetching the post");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (post && post._id) {
      fetchLikeStatus();
      fetchComments();
    }
  }, [post]);

  const fetchLikeStatus = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/like/${post._id}`
      );
      setLiked(response.data.liked);
      setLikeCount(response.data.likeCount);
    } catch (err) {
      console.error("Error fetching like status:", err);
    }
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/comment/${post._id}`
      );
      setComments(response.data);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  const handleLikeToggle = async () => {
    try {
      const url = liked
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/unlike`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/like`;

      setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
      setLiked(!liked);

      const response = await axios.post(url, { postId: post._id });
      setLikeCount(response.data.likeCount);
    } catch (error) {
      console.error("Error updating like status:", error);

      setLikeCount((prevCount) => (liked ? prevCount + 1 : prevCount - 1));
      setLiked(!liked);
    }
  };

  const handleAddComment = (newComment) => {
    setComments((prev) => [...prev, newComment]);
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("🦄 Link copied to clipboard!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          draggable: true,
          pauseOnHover: true,
          theme: "light",
          transition: Flip,
        });
      })
      .catch((err) => console.error("Failed to copy:", err));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 dark:bg-gray-800 px-4 py-8">
      {post && (
        <Head>
          <title>{createPageTitle(post.title)}</title>
          <meta
            name="description"
            content={post.summary || "Default description"}
          />
          <meta
            property="og:title"
            content={createPageTitle(post.title)}
          />
          <meta
            property="og:description"
            content={post.summary || "Default description"}
          />
          <meta property="og:image" content={post.coverImageUrl} />
          <meta
            property="og:url"
            content={`https://tech-talks-blog.com/post/${post.slug}`}
          />
          <meta property="og:type" content="article" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content={createPageTitle(post.title)}
          />
          <meta
            name="twitter:description"
            content={post.summary || "Default description"}
          />
          <meta name="twitter:image" content={post.coverImageUrl} />
        </Head>
      )}

      {loading ? (
        <div className="max-w-4xl w-full p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
          <div className="animate-pulse">
            <div className="w-full h-64 bg-gray-300 rounded-lg mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      ) : post ? (
        <div className="max-w-4xl w-full bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
          {post.coverImageUrl && (
            <img
              src={post.coverImageUrl}
              alt="Post Cover"
              className="w-full h-64 object-cover rounded-lg"
            />
          )}
          <h1 className="text-3xl font-bold text-center capitalize dark:text-gray-200 mt-4">
            {post.title}
          </h1>
          <p className="text-center text-gray-600 mt-2 dark:text-gray-300">
            <MdDateRange className="inline-block mr-2" />
            {format(new Date(post.createdAt), "MMMM dd, yyyy")}
          </p>
          <div
            className="text-gray-800 dark:text-gray-300 prose text-justify w-full max-w-4xl prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className="flex justify-between mt-4 space-x-2">
            <div>
              <button
                className={`px-3 py-1 rounded-md flex items-center transition duration-300 transform ${
                  liked
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 dark:bg-slate-500 hover:bg-gray-300"
                } ${isAnimating ? "animate-like" : ""}`}
                onClick={handleLikeToggle}
                disabled={loading}
              >
                <FiHeart
                  className={`inline-block mr-1 transition-transform duration-300 ${
                    isAnimating ? "scale-125 text-pink-500" : ""
                  }`}
                />
                {liked ? "Liked" : "Like"}
              </button>

              <p className="text-gray-600 mt-2 text-center">{likeCount} Likes</p>
            </div>
            <div>
              <button
                className="px-3 py-1 rounded-md dark:bg-slate-500 bg-gray-200 hover:bg-gray-300"
                onClick={handleCopyLink}
              >
                <FiCopy className="inline-block mr-1" />
                Copy Link
              </button>
              <ToastContainer />
            </div>
          </div>
          <ShareButton />
        </div>
      ) : (
        <div className="text-center text-red-500">{error}</div>
      )}

      {!loading && post && (
        <div className="grid grid-cols-1 gap-6 mt-8 max-w-4xl w-full">
          <div className="rounded-lg shadow-md">
            <Comment postId={post._id} onAddComment={handleAddComment} />
          </div>
          <div className="rounded-lg shadow-md">
            <CommentList comments={comments} />
          </div>
          {/* <div className=" p-6 rounded-lg shadow-md"> */}
            <Subscription />
          {/* </div> */}
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

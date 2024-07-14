import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from './Layout';
import { Button, Card } from "flowbite-react";
import Welcome from '../components/Welcome';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [postItem, setPostItem] = useState([]);
  const [error, setError] = useState(null);
  const title = "Beranda";

  useEffect(() => {
    document.title = title;
    getPost();
  }, []);

  const getPost = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/post`);
      setPostItem(response.data);
      console.log(response);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Layout>
      <Welcome />
      <div className='p-10'>
        <div className='flex flex-wrap gap-4'>
          {error && <div className="text-red-500">{error}</div>}
          {postItem.map((post) => (
            <Card key={post._id} className="max-w-sm">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {post.title}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {post.body}
              </p>
              <Link to={`post/${post._id}`}>
                <Button>
                  Read more
                  <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                      />
                  </svg>
                </Button>
              </Link>

            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;

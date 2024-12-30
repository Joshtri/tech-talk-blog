import React, { useEffect } from 'react';
import Layout from './Layout';
import ReadPost from '../components/ReadPost/ReadPost';

function ReadPostPage() {
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []); // The empty dependency array ensures this runs only once when the component mounts

  return (
    <Layout>
      <ReadPost />
    </Layout>
  );
}

export default ReadPostPage;

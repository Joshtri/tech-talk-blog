import React from 'react'
import Layout from './Layout'
import LiveChat from '../components/LiveChat/LiveChat'
import { Helmet } from 'react-helmet-async'

function LiveChatPage() {
  return (
    <>
      <Helmet>
        <title>Live Chat - Tech Talk Blog</title>

      </Helmet>
      <Layout>
          <LiveChat/>
      </Layout>
    </>

  )
}

export default LiveChatPage
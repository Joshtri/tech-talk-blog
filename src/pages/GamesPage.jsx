import React from 'react'
import Layout from './Layout'
import Games from '../components/Games/GamesCard'
import { Helmet } from 'react-helmet-async'
import SocialBar from '../components/SocialBar'


function GamesPage() {
  return (
    <>
      {/* Tambahkan Social Bar */}
      <SocialBar />
      <Helmet>
        <title>Games - Tech Talk Blog</title>

      </Helmet>
      <Layout>
          <Games/>
      </Layout>
    </>
  )
}

export default GamesPage
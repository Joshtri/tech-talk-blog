/* eslint-disable react/prop-types */
import React from 'react'
import NavbarComp from '../components/Navbar'
import FooterComp from '../components/Footer';


function Layout({ children }) {
    return (
      <React.Fragment>
        <NavbarComp />
        <main className='mt-7 mb-7'>{children}</main>
        <FooterComp />
        
      </React.Fragment>
    );
  }

export default Layout
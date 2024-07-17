/* eslint-disable react/prop-types */
import React from 'react'
import NavbarComp from '../components/Navbar'
import FooterComp from '../components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Layout({ children }) {
    return (
      <React.Fragment>
        <NavbarComp />
        <ToastContainer />
        <main className='mt-7 mb-7'>{children}</main>
        <FooterComp />
        
      </React.Fragment>
    );
  }

export default Layout
// import React from 'react';

function Welcome() {
    return (
      <div className="text-black dark:text-white py-7">
        <div className="container mx-auto px-10">
          <div className="bg-gradient-to-r from-gray-200 to-white dark:from-gray-800 dark:to-gray-900 bg-opacity-20 p-5 rounded-lg shadow-lg transition-opacity duration-1000 ease-in-out opacity-0 animate-fadeIn">
            <h1 className="text-4xl font-bold mb-4 text-center transition-transform duration-1000 ease-in-out transform translate-y-10 animate-slideIn">
              Selamat Datang di Tech Talks Blog
            </h1>
            <p className="text-lg text-center transition-transform duration-1000 ease-in-out transform translate-y-10 delay-200 animate-slideIn">
              Platform di mana saya berbagi pemikiran dan mengedukasi semua orang seputaran dunia IT dan bahkan mengenai programming / coding.
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  export default Welcome;
  
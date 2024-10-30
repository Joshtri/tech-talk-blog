import React from 'react'

function Welcome() {
  return (
    <div className=" text-black py-7">
      <div className="container mx-auto px-10">
        <div className="bg-gradient-to-r from-gray-200 to-white bg-opacity-20 p-10 rounded-lg shadow-lg transition-opacity duration-1000 ease-in-out opacity-0 animate-fadeIn">
          <h1 className="text-4xl font-bold mb-4 text-center transition-transform duration-1000 ease-in-out transform translate-y-10 animate-slideIn">Selamat Datang di Tech Talk Blog</h1>
          <p className="text-lg text-center transition-transform duration-1000 ease-in-out transform translate-y-10 delay-200 animate-slideIn">
            Platform di mana saya berbagi pemikiran dan mengedukasi semua orang seputaran dunia IT dan bahkan mengenai programming / coding.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Welcome
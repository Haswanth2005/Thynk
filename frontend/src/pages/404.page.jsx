import React from 'react'
import pageNotFoundImage from '../imgs/errorMessage.jpg'
import Logo from "../imgs/black.svg";

const PageNotFound = () => {
  return (
    <section className='h-cover mt-5 relative p-10 flex flex-col items-center gap-4 text-center'>
      <img src={pageNotFoundImage} alt="Page Not Found" className='select-none  w-96 object-cover rounded'/>

      <h1 className='text-2xl font-gelasio leading-7'>We are sorry, but the page you are looking for can be found.</h1>
      <p className='text-dark-grey'>You might try searching our site or visit the <a href="/" className='text-black underline'>Homepage</a></p>

      <div className='mt-auto'>
        <img src={Logo} alt="Logo" className='h-8 object-contain mx-auto' />
        <p className='mt-2 text-dark-grey mb-5' >Read millions of stories around the world</p>
      </div>
    </section>
  )
}

export default PageNotFound

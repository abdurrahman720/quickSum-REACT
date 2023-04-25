// eslint-disable-next-line no-unused-vars
import React from 'react'
import {logo} from '../assets'

const Hero = () => {
  return (
      <header className='w-full flex justify-center items-center flex-col'>
          <nav className='flex justify-between items-center w-full mb-10 pt-3'>
              <img src={logo} alt="logo" className="w-36 object-contain" />
              <button type='button' onClick={()=> window.open("https://github.com/")} className="black_btn">
                  GitHub
              </button>
          </nav>
          <h1 className="head_text">
              Summarize Articles with <br className="max-md:hidden" /> 
              <span className="orange_gradient">
                  OpenAI GPT-4
              </span>
          </h1>
          <h2 className="desc">
          Want to read less and learn more? QuickSum makes it easy! Simply paste any website link and get a clear and concise summary in seconds. Try it now and transform your online reading experience!
          </h2>
    </header>
  )
}

export default Hero
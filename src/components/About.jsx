import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function About() {
    const [scrolling, setScrolling] = useState(false);

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  return (
    <>
        <header className={`text-gray-400 bg-black backdrop-blur-lg body-font fixed top-0 w-full z-50 transition-all ${scrolling ? 'bg-opacity-70' : 'bg-opacity-100'}`}>
        <div className="container mx-auto flex flex-wrap p-[30px] flex-col md:flex-row items-center ">
          <a className="flex title-font font-medium items-center text-white mb-0  md:mb-0 hover:cursor-pointer ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-10 h-10 text-white p-2 bg-purple-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="ml-3 text-xl">Lexora</span>
          </a>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <Link to="/" className="mr-10 hover:text-white transition-colors hover:cursor-pointer">
            <button>Home</button>
          </Link>
          <Link to="/login" className="mr-10 hover:text-white transition-colors hover:cursor-pointer">
            <button>Let's Chat</button>
          </Link>
          <Link to="/about" className="mr-5 hover:text-white transition-colors hover:cursor-pointer">
            <button>About</button>
          </Link>
          
          </nav>
          <a
            href="https://github.com/Coder-philosopher"
            target="_blank"
            rel="noopener noreferrer"
          >
         
          </a>
        </div>
        <div className="w-full h-[0.5px] bg-gray-600"></div>
      </header>

      <div className="pt-[100px]"></div>
      
      <section className="text-gray-400 bg-zinc-950 body-font">
        <div className="container px-5 pb-24 pt-16 mx-auto">
        <div className="flex justify-center mb-8">
            <img
              src="https://avatars.githubusercontent.com/u/177634554?v=4" 
              alt="Shaikh Abdullah"
              className="rounded-full border-4 border-purple-500 w-32 h-32 object-cover"
            />
          </div>
          <div className="text-center mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-white mb-4">
              <span className='text-4xl my-6 md:text-6xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-pulse drop-shadow-xl'>
                About Lexora
              </span><br />
              The Journey Behind the Project
            </h1>
            
            <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-400 text-opacity-80">
              I embarked on the journey of building Lexora, a secure and efficient chat app, which took me around 15-20 days to bring to life. Every line of code is crafted with care to ensure seamless communication, and the project was developed using the MERN stack combined with WebSockets to ensure real-time messaging functionality.
            </p>
            <div className="flex mt-6 justify-center">
              <div className="w-24 h-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse inline-flex" />
            </div>
            <button className="inline-flex mt-4 items-center bg-green-600 hover:bg-green-700 text-white border-0 py-1 px-3 rounded transition-all"
            onClick={() => {
              window.open('https://github.com/Coder-philosopher/lexora', '_blank');
            }}
            >
              Source Code
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          

          <div className="flex flex-col text-center mb-10">
            <h2 className="text-lg font-medium text-white mb-4">Built by Shaikh Abdullah</h2>
            <p className="text-base text-gray-400 mb-4">
              This project was created single-handedly by me, Shaikh Abdullah, with great passion. From planning to execution, every step was meticulously designed to offer a secure and user-friendly experience.
            </p>
            <Link
              to="https://github.com/Coder-philosopher"
              className="inline-flex items-center justify-center mx-auto my-8 bg-blue-800 hover:bg-blue-600 text-white border-0 py-2 px-8 focus:outline-none rounded text-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit My GitHub Profile
            </Link>
          </div>

          <div className="text-center">
            <h3 className="text-xl text-white font-bold mb-6">Technologies Used</h3>
            <ul className="list-none text-base text-gray-400 mb-6">
              <li>🌐 MERN Stack (MongoDB, Express.js, React, Node.js)</li>
              <li>⚡ WebSockets for real-time chat functionality</li>
              <li>🔐 End-to-End Encryption for secure messaging</li>
              <li>🔍 User Search with unique Lexus-ID</li>
            </ul>
            <p className="text-gray-400 text-opacity-80">
              The project is open-source, and you can check out the entire source code on my GitHub profile. Feel free to explore, contribute, or even fork it for your own purposes!
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;

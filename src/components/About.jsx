import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function About() {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolling(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`text-gray-400 bg-black backdrop-blur-md body-font fixed top-0 w-full z-50 transition-all ${
          scrolling ? 'bg-opacity-70' : 'bg-opacity-100'
        }`}
      >
        <div className="container mx-auto flex flex-wrap px-6 py-4 flex-col md:flex-row items-center">
          <Link
            to="/"
            className="flex title-font font-semibold items-center text-white hover:cursor-pointer"
          >
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
          </Link>

          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center gap-6 mt-4 md:mt-0">
            <Link to="/" className="hover:text-white transition-all">
              Home
            </Link>
            <Link to="/login" className="hover:text-white transition-all">
              Let's Chat
            </Link>
            <Link to="/about" className="hover:text-white transition-all">
              About
            </Link>
          </nav>
        </div>
        <div className="w-full h-[1px] bg-gray-700" />
      </header>

      <div className="pt-[100px]" />

      <section className="text-gray-400 bg-zinc-950 body-font">
        <div className="container px-5 pb-24 pt-16 mx-auto">
          <div className="flex justify-center mb-8">
            <img
              src="https://avatars.githubusercontent.com/u/177634554?v=4"
              alt="Shaikh Abdullah"
              className="rounded-full border-4 border-purple-500 w-32 h-32 object-cover"
            />
          </div>

          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-pulse drop-shadow-xl mb-4">
              About Lexora
            </h1>
            <h2 className="text-xl text-white mb-4">The Journey Behind the Project</h2>
            <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-400 text-opacity-80">
              I embarked on the journey of building Lexora, a secure and efficient chat app, over 15–20 days. Every line of code is crafted with care to ensure seamless communication. Built with the MERN stack and WebSockets, it ensures real-time messaging with strong encryption and a smooth user experience.
            </p>
            <div className="flex mt-6 justify-center">
              <div className="w-24 h-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse" />
            </div>
            <button
              onClick={() =>
                window.open('https://github.com/Coder-philosopher/lexora', '_blank')
              }
              className="inline-flex items-center mt-6 bg-green-600 hover:bg-green-700 text-white border-0 py-2 px-5 rounded transition-all"
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

          <div className="text-center mb-16">
            <h2 className="text-lg font-semibold text-white mb-3">
              Built by Abdullah Shaikh
            </h2>
            <p className="text-base text-gray-400 mb-6 max-w-xl mx-auto">
              This project was developed solely by me, Shaikh Abdullah. From planning to execution, I meticulously designed and implemented each step to ensure a secure and user-friendly platform.
            </p>
            <a
              href="https://github.com/Coder-philosopher"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-blue-800 hover:bg-blue-600 text-white border-0 py-2 px-8 rounded text-lg transition-all"
            >
              Visit My GitHub Profile ⭐
            </a>
          </div>

          <div className="text-center">
            <h3 className="text-xl text-white font-bold mb-4">Technologies Used</h3>
            <ul className="text-base text-gray-400 space-y-2 mb-6">
              <li>🌐 MERN Stack (MongoDB, Express.js, React, Node.js)</li>
              <li>⚡ WebSockets for real-time chat functionality</li>
              <li>🔐 End-to-End Encryption for secure messaging</li>
              <li>🔍 User Search with unique Lexus-ID</li>
            </ul>
            <p className="text-gray-400 text-opacity-80 max-w-xl mx-auto">
              The project is fully open-source. You can check out the source code on GitHub, contribute to it, or even fork it to build your own version!
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;

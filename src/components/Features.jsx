import React from 'react'
import { Link } from 'react-router-dom';



function Features() {
  return (
    <>
      <header className="text-gray-400 bg-zinc-950 backdrop-blur-lg body-font fixed top-0 w-full z-50">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
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
            <a className="mr-10 hover:text-white">Home</a>
            <a className="mr-10 hover:text-white">Let's Chat</a>
            <a className="mr-5 hover:text-white">About Project</a>
          </nav>
          <a
            href="https://github.com/Coder-philosopher/projectAI"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="inline-flex items-center bg-green-600 hover:bg-green-500 text-white border-0 py-1 px-3 focus:outline-none rounded text-base mt-4 md:mt-0">
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
          </a>
        </div>
        <div className="w-full h-[0.5px] bg-gray-600"></div>
      </header>
      {/* Adding a top padding so that page content doesn't overlap with the fixed header */}
      <div className="pt-[45px]"></div>
<section className="text-gray-400 bg-zinc-950 body-font">
  <div className="container px-5 pb-24 pt-16  mx-auto">
    <div className="text-center mb-20">
      <h1 className="sm:text-3xl text-2xl font-medium title-font text-white mb-4"><span className='text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-pulse drop-shadow-xl'>Lexora
        </span><br /> Your World of Secure Conversations.</h1>
      <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-400 text-opacity-80">Lexora is a seamless live chat app where privacy meets simplicity. Unique user IDs, and full encryption protect every chat, making secure connections effortless. Access your chat history on any device—no backups needed.</p>
      <div className="flex mt-6 justify-center">
        <div className="w-24 h-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse  inline-flex" />
      </div>
    </div>
    <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
    <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
        <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-gray-800 text-purple-400 mb-5 flex-shrink-0">
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-10 h-10" viewBox="0 0 24 24">
            <circle cx={6} cy={6} r={3} />
            <circle cx={6} cy={18} r={3} />
            <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" />
          </svg>
        </div>
        <div className="flex-grow">
          <h2 className="text-white text-lg title-font font-medium mb-3">End-to-End Encryption – Secure Every Word</h2>
          <p className="leading-relaxed text-base">With end-to-end encryption, only you and your chat partner can read your messages, ensuring confidential, secure communication.</p>
         
        </div>
      </div>
      <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
        <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-gray-800 text-purple-400 mb-5 flex-shrink-0">
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-10 h-10" viewBox="0 0 24 24">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </div>
        <div className="flex-grow">
          <h2 className="text-white text-lg title-font font-medium mb-3">Seamless Chat Recovery Across Devices</h2>
          <p className="leading-relaxed text-base">
          With Lexora, your chats are synced and recoverable across devices upon login—no backups needed. Access your history securely, wherever you are.</p>
         
        </div>
      </div>
      
      <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
        <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-gray-800 text-purple-400 mb-5 flex-shrink-0">
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-10 h-10" viewBox="0 0 24 24">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
            <circle cx={12} cy={7} r={4} />
          </svg>
        </div>
        <div className="flex-grow">
          <h2 className="text-white text-lg title-font font-medium mb-3">Unique Lexus-ID – Your Digital Identity</h2>
          <p className="leading-relaxed text-base">Each user has a unique Lexus-ID, allowing quick, secure connections. Easily searchable, your Lexus-ID keeps you connected without compromising privacy.</p>
         
        </div>
      </div>
    </div>
    <Link to="/login" className=" flex items-center justify-center mx-auto mt-8 bg-blue-800 hover:bg-blue-600 text-white border-0 py-2 px-8 focus:outline-none rounded text-lg">
      <button>Let's Chat</button>
      </Link>

  </div>
</section>

    </>)
}

export default Features
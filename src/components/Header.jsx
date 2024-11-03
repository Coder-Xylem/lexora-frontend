import React from 'react';

function Header() {
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
      <div className="pt-20"></div>
    </>
  );
}

export default Header;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Features() {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolling(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const featuresData = [
    {
      icon: (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        className="w-10 h-10"
        viewBox="0 0 24 24"
      >
        <path d="M16 12V9a4 4 0 10-8 0v3" /> 
        <rect x={5} y={12} width={14} height={10} rx={2} ry={2} />
        <path d="M9 16h6" /> 
        <path d="M12 19v-3" /> 
        <path d="M20 7L16 3" /> 
        <path d="M4 3L8 7" /> 
      </svg>
      
      ),
      title: "End-to-End Encryption – Secure Every Word",
      description:
        "With end-to-end encryption, only you and your chat partner can read your messages, ensuring confidential, secure communication.",
    },
    {
      icon: (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        className="w-10 h-10"
        viewBox="0 0 24 24"
      >
        
        <path d="M20 17.58A5 5 0 0018 7a7.44 7.44 0 00-14 1.5A4.5 4.5 0 004 19h16" />
      
  
        {/* <path d="M12 14c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" /> */}
        <path d="M9 14s2-3 6-3 6 3 6 3M3 14s2-3 6-3" />
      </svg>
      
      
      ),
      title: "Seamless Chat Recovery Across Devices",
      description:
        "Your chats are synced and recoverable across devices upon login—no backups needed. Access your history securely, wherever you are.",
    },
    {
      icon: (
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          className="w-10 h-10"
          viewBox="0 0 24 24"
        >
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
          <circle cx={12} cy={7} r={4} />
        </svg>
      ),
      title: "Unique Lexus-ID – Your Digital Identity",
      description:
        "Each user has a unique Lexus-ID, allowing quick, secure connections. Easily searchable, your Lexus-ID keeps you connected without compromising privacy.",
    },
  ];

  return (
    <>
      <header
        className={`text-gray-400 bg-black fixed top-0 w-full z-50 transition-all ${
          scrolling ? "bg-opacity-70 backdrop-blur-lg" : "bg-opacity-100"
        }`}
      >
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex items-center text-white hover:cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-10 h-10 text-white p-2 mb-2 bg-purple-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M21 14a2 2 0 0 1-2 2H7l-4 4V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8z" />
              <path d="M16 8l-4 2-4-2v3c0 2.5 2 4 4 4s4-1.5 4-4V8z" />
            </svg>
            <span className="ml-3 text-xl">Lexora</span>
          </a>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            {["Home", "Let's Chat", "About"].map((text, index) => (
              <Link
                key={index}
                to={text === "Home" ? "/" : text === "Let's Chat" ? "/login" : `/${text.toLowerCase().replace(" ", "")}`}
                className="mr-10 hover:text-white transition-colors"
              >
                <button>{text}</button>
              </Link>
            ))}
          </nav>
          <a
            href="https://github.com/Coder-philosopher"
            target="_blank"
            rel="noopener noreferrer"
          >
        
          </a>
        </div>
        <div className="w-full h-[0.5px] bg-gray-600" />
      </header>

      <div className="pt-[100px] md:pt-[45px]" />

      <section className="text-gray-400 bg-black pb-24">
        <div className="container px-5 pb-24 pt-16 mx-auto">
          <div className="text-center mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-white mb-4">
              <span className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-pulse">
                Lexora
              </span>
              <br />
              Your World of Secure Conversations.
            </h1>
            <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-opacity-80">
              Lexora is a seamless live chat app where privacy meets simplicity. Unique user IDs, and full encryption protect every chat, making secure connections effortless. Access your chat history on any device—no backups needed.
            </p>
          </div>

          <Link
            to="/login"
            className="flex items-center justify-center mx-auto my-8 bg-blue-800 hover:bg-blue-600 text-white py-2 px-8 rounded transition-all"
          >
            Let's Chat
          </Link>

          <div className="flex flex-wrap -m-4">
            {featuresData.map((feature, index) => (
              <div
                key={index}
                className="p-4 md:w-1/3 flex flex-col text-center items-center"
              >
                <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-black text-purple-400 mb-5">
                  {feature.icon}
                </div>
                <h2 className="text-lg text-white font-medium mb-3">
                  {feature.title}
                </h2>
                <p className="leading-relaxed text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Features;

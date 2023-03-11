import React from "react";

import landing from "../assets/landing.png";

const Dashboard = () => {
  return (
    <>
      <section className="bg-gray-900">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              Get <span className="text-blue-500">ConnecTen</span>
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-200 lg:mb-8 md:text-lg lg:text-xl ">
              Get connected to all your peers seamlessly and without hassle
            </p>

            <a
              href="#qr"
              className="inline-flex items-center hover:bg-blue-500 justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg  focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700  dark:focus:ring-gray-800"
            >
              Get Started
              <svg
                className="w-5 h-5 ml-2 -mr-1 "
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
          <div className=" lg:mt-0 lg:col-span-5 lg:flex h-[600px]">
            <img className="rounded-md ml-32" src={landing} alt="app" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;

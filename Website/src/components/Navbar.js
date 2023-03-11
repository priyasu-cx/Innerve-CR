import React, { useState } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";

const Navbar = () => {
  const { signIn, signInWithGoogle, signOutUser } = useUserAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { user, authState } = useUserAuth();

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithGoogle();
      console.log(user);
      //   navigate("/");
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  };

  const handleGoogleSignOut = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signOutUser();
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };
  return (
    <div className="text-white text-xl ">
      <div className="flex justify-between py-4 items-center bg-gray-900">
        <div className="pl-32">
          <img className="w-[50px]" src={logo} alt="" />
        </div>
        <div className="flex gap-20 font-semibold">
          <p
            className="relative before:content-[''] before:absolute before:block before:w-full before:h-[2px] 
              before:bottom-0 before:left-0 before:bg-blue-500
              before:hover:scale-x-100 before:scale-x-0 before:origin-top-left
              before:transition before:ease-in-out before:duration-300 cursor-pointer"
          >
            <a href="#home">Home</a>
          </p>
          <p
            className="relative before:content-[''] before:absolute before:block before:w-full before:h-[2px] 
              before:bottom-0 before:left-0 before:bg-blue-500
              before:hover:scale-x-100 before:scale-x-0 before:origin-top-left
              before:transition before:ease-in-out before:duration-300 cursor-pointer"
          >
            <a href="#features">Features</a>
          </p>
          <p
            className="relative before:content-[''] before:absolute before:block before:w-full before:h-[2px] 
              before:bottom-0 before:left-0 before:bg-blue-500
              before:hover:scale-x-100 before:scale-x-0 before:origin-top-left
              before:transition before:ease-in-out before:duration-300 cursor-pointer"
          >
            <a href="#qr">Download</a>
          </p>
        </div>
        <div className="flex flex-row justify-between">
          {user && !window.location.href.includes("id") ? (
            <button className="relative mr-5 inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
              <span
                class="relative px-5 py-2.5 transition-all ease-in duration-75  dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
                onClick={() => navigate("/id")}
              >
                Profile
              </span>
            </button>
          ) : null}
          <button
            className="relative mr-20 inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
            onClick={!user ? handleGoogleSignIn : handleGoogleSignOut}
          >
            <span class="relative px-5 py-2.5 transition-all ease-in duration-75  dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              {!user ? `Login with Google` : `Sign Out`}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import {  signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setredirect] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email == "d@1" && password === "123") {
      console.log("work");
      setredirect(true);
    }

    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    setredirect(true);

    console.log(user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode)
  });

  };

  if (redirect) {
    return <Navigate to="/mainPage" />;
  }
  return (
    <div className="w-full ">
      <div className="w-full px-4 flex justify-center items-center h-[40vh] ">
        <form className="w-full   px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button className=" primary" type="submit">
              Sign In
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-primary"
              href="#">
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

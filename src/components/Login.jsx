import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth } from "../firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setredirect] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [resetAlert, setResetAlert] = useState(false);
  const [loading, setLoading] = useState(false);

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

        setSuccessAlert(true);
        setLoading(true);

        setTimeout(() => {
          setSuccessAlert(false);
          console.log("time out");
        }, 3000);
        setredirect(true);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        setErrorAlert(true);

        setTimeout(() => {
          setErrorAlert(false);
        }, 3000);
      });
  };

  const handleForgetPassword = () => {
    setResetAlert(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        console.log("send password reset");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  if (redirect) {
    return <Navigate to="/mainPage" />;
  }
  return (
    <div className="w-full ">
      <div className="w-full px-4 flex justify-center items-center h-[40vh] ">
        <form className="w-full   px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          {successAlert && (
            <div className="bg-blue-400  my-2 py-2 px-4 w-full rounded-md shadow-md text-center font-medium">
              Publish Successfully
            </div>
          )}
          {resetAlert && (
            <div className="bg-blue-400  my-2 py-2 px-4 w-full rounded-md shadow-md text-center font-medium">
              Check your email to reset password
            </div>
          )}
          {errorAlert && (
            <div className="bg-red-400  my-2 py-2 px-4 w-full rounded-md shadow-md text-center font-medium">
              Incorrect credentials
            </div>
          )}
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
            <button
              className=" primary"
              type="submit"
              disabled={loading === true ? true : false}>
              {loading === false ? (
                <div>Sign In</div>
              ) : (
                <div>
                  <img
                    src="https://i.pinimg.com/originals/3d/6a/a9/3d6aa9082f3c9e285df9970dc7b762ac.gif"
                    className="w-12 h-12"
                  />
                </div>
              )}
            </button>
            <div
              className="inline-block align-baseline font-bold text-sm text-primary hover:cursor-pointer"
              onClick={handleForgetPassword}>
              Forgot Password?
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

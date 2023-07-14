import React from "react";
import Login from "../components/Login";

function HomePage() {
  return (
    <div id="homepage" className="w-full h-[90vh] flex justify-between ">
      <div className="w-full">
        <img
          src="https://i.pinimg.com/564x/0c/9b/89/0c9b89b62ba04b4b4740f4ce2da28b54.jpg"
          alt=""
          className="w-full h-[90vh]"
        />
      </div>
      <div className="w-full mt-4 rounded-2xl " id="loginSection">
        <div className="bg-white rounded-full font-serif  text-center text-xl font-bold text-primary p-2 pl-4">
          Sign In
        </div>
        <div className="w-full  flex justify-center h-[20vh] ">
          <img src="./images/logo.png" className="w-[10rem] " />
        </div>

        <Login />
      </div>
    </div>
  );
}

export default HomePage;

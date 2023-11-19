import React from "react";
import Login from "../components/Login";

function HomePage() {
  return (
    <div id="homepage" className="w-full  md:flex md:justify-between ">
      <div className="w-full h-[30vh] ">
        <div className="lg:hidden mt-2  text-center py-2 font-sans font-bold  text-xl uppercase">
          <span className="bg-primary text-white px-8 py-2">Sign in</span>
        </div>
        <img
          src="https://i.pinimg.com/564x/0c/9b/89/0c9b89b62ba04b4b4740f4ce2da28b54.jpg"
          alt=""
          className="w-full h-auto md:h-[90vh]"
        />
      </div>
      <div className="w-full md:mt-4 rounded-2xl " id="loginSection">
        <div className="hidden md:block bg-white rounded-full font-serif  text-center text-xl font-bold text-primary p-2 pl-4">
          Sign In
        </div>
        <div className="w-full  flex justify-center h-[20vh] ">
          <img src="./images/logo.png" className="w-[10rem] hidden md:block " />
        </div>

        <Login />
      </div>
    </div>
  );
}

export default HomePage;

import React from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/Auth";
function Nav() {
  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-[12vh] w-full flex justify-between bg-primary py-2 px-4">
      <div className="flex gap-4">
        <div>
          <img src="./images/logo.png" alt="mmra logo" className="w-[4rem]" />
        </div>
        <Link
          to={user?.email ? "/mainpage" : "/"}
          className="text-2xl font-bold flex justify-center items-center text-white">
          MMRA
        </Link>
      </div>
      {user?.email && (
        <div className="flex items-center text-red-500 rounded-md font-semibold text-xl">
          <button
            onClick={handleSignOut}
            className="bg-white px-4 py-2 rounded-lg ">
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Nav;

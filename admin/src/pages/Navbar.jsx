import React, { useContext } from "react";
import NewLogo from "../assets/logo.png";
import { FaCircleUser } from "react-icons/fa6";
import toast from "react-hot-toast";
import httpClient from "../services/httpClient";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import { logOutUser } from "../common/session";
const Navbar = () => {
  const { userAuth, setUserAuth } = useContext(UserContext);
  const { user } = userAuth;
  const navigate = useNavigate();

  const Logout = async () => {
    try {
      await httpClient.get("log-out");
      logOutUser();
      setUserAuth({ user: null });
      toast.success("Logged out successfully");
      navigate("/sign-in");
    } catch (error) {
      toast.error("Error logging out");
    }
  };
  return (
    <div className="flex items-center justify-between gap-3 px-3 md:px-20 lg:px-28 py-1 shadow-dark-shadow border-gray sticky top-0 z-[1000] bg-white  h-12 md:h-16 lg:h-16 xl:h-20">
      <div className="h-12 sm:h-12 md:h-12 lg-h-16 xl:h-20">
        <img src={NewLogo} alt="logoimg" className="w-full h-full" />
      </div>
      <div className="flex items-center justify-center gap-4">
        {/* <button className="btn-dark">Log In</button> */}
        <div className="flex items-center justify-center gap-4">
          <FaCircleUser size={30} className="text-gray" />
          {user ? (
            <button className="btn-dark" onClick={Logout}>
              Log Out
            </button>
          ) : (
            <button className="btn-dark" onClick={() => navigate("/sign-in")}>
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

// import React from "react";
// import NewLogo from "../assets/JanpadLogo.png";
// import { FaCircleUser } from "react-icons/fa6";
// const Navbar = () => {
//   return (
//     <div className="flex items-center justify-between gap-3 px-3 md:px-20 lg:px-28 py-1 shadow-dark-shadow border-gray sticky top-0 z-[1000] bg-white">
//       <img
//         src={NewLogo}
//         alt="logoimg"
//         className="w-[50%]  sm:w-[35%] md:w-[30%] lg:w-[28%]"
//       />
//       <div className="flex items-center justify-center gap-4">
//         {/* <button className="btn-dark">Log In</button> */}
//         <div className="flex items-center justify-center gap-4">
//           <FaCircleUser size={30} className="text-gray" />
//           <button className="btn-dark">Log Out</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

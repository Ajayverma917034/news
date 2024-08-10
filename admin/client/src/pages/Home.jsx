import React from "react";
import { useContext } from "react";
import { UserContext } from "../App";
import { Navigate } from "react-router-dom";
import { lookInSession } from "../common/session";

const Home = () => {
  const sessionData = JSON.parse(lookInSession("user"));
  const user = sessionData?.user;

  return (
    <div>
      {user ? <Navigate to={"/dashboard"} /> : <Navigate to="/sign-in" />}
    </div>
  );
};

export default Home;

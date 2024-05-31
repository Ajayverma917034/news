import React from 'react'
import { useContext } from 'react';
import { UserContext } from '../App';
import {Navigate } from 'react-router-dom';

const Home = () => {
    const {
        userAuth: { refreshToken },
      } = useContext(UserContext);
      return (
        <div>
          {refreshToken ? (
            <Navigate to={"/dashboard"} />
          ) : (
            <Navigate to="/sign-in" />
          )}
        </div>
      );
}

export default Home
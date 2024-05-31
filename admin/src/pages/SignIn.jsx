import React from "react";
import { useState } from "react";
import httpClient from '../services/httpClient'
import toast from "react-hot-toast";
import { storeInSession } from "../common/session";
import { UserContext } from "../App";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
const SignIn = () => {
    let [data, setData] = useState({email: "", password: ""})

    let {
        userAuth: {refreshToken},
        setUserAuth,
      } = useContext(UserContext);
    const handlechange = (e) => {
        setData({...data, [e.target.id]: e.target.value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(!data.email || !data.password) return toast.error('Please fill in all fields')
        httpClient.post('/sign-in', {email: data.email, password: data.password})
        .then(({data}) => {
            // console.log(data)
            toast.success('Login successful')
            storeInSession("user", JSON.stringify({accessToken: data.accessToken, refreshToken: data.refreshToken, user: data.userData}));

        setUserAuth(data);
        })
        .catch(err => {
            toast.error(err.response.data.message)
            console.log(err)
        })
    }
    

  return (
    refreshToken ? (
        <Navigate to={"/"} />
    ): 
    <div className="max-w-sm h-[calc(100vh-200px)] items-center justify-center mx-auto bg-white p-4 sm:p-6 shadow-md rounded-lg my-8">
      <form onSubmit={handleSubmit}>
        <h2 className="text-5xl font-bold">Login</h2>
        <h3 className="text-4xl mb-4 font-medium"> To Get Started</h3>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Email"
            id="email"
            value={data.email}
            onChange={handlechange}
          />
        </div>
        <div className="">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Password"
            id="password"
            value={data.password}
            onChange={handlechange}
          />
        </div>
        <p className=" my-4 text-red font-medium">Forget Password ?</p>
        <button type="submit" className="w-full bg-blue text-white text-center py-2 rounded-lg">
          Login
        </button>
      </form>
    </div>
  );
};

export default SignIn;

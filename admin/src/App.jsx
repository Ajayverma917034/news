import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Das from "./dashboard/Das";
import NewsList from "./components/common/news/NewsList";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import { lookInSession } from "./common/session";
import { createContext } from "react";
import { useEffect } from "react";
import SignIn from "./pages/SignIn";
import { Toaster } from "react-hot-toast";
import Sidebar from "./pages/Sidebar";
import Editor from "./pages/Editor";
import YoutubeVideo from "./pages/YtEditor";

export const UserContext = createContext({});
const App = () => {
  const [userAuth, setUserAuth] = useState({});

  useEffect(() => {
    let userInSession = lookInSession("user");
    userInSession
      ? setUserAuth(JSON.parse(userInSession))
      : setUserAuth({ access_token: null });
  }, []);

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      <Router>
        <Toaster />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/dashboard" element={<Sidebar />}>
            <Route index element={<Das />} />
            <Route path="create-news" element={<Editor />} />
            <Route path="create-videos" element={<YoutubeVideo />} />
          </Route>
          <Route path="/profile" element={<NewsList />} />
          <Route path="/settings" element={<div>Settings Page</div>} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default App;

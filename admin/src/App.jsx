// src/App.jsx
import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Das from "./dashboard/Das";
import NewsList from "./components/common/news/NewsList";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Sidebar from "./pages/Sidebar";
import Editor from "./pages/Editor";
import YoutubeVideo from "./pages/YtEditor";
import { lookInSession } from "./common/session";
import ProtectedRoute from "./pages/ProtectedRoutes";
import { loadUser } from "./services/loadUser";
import NewsHandler from "./pages/NewsHandler";
import VideoHandler from "./pages/VideoHandler";
import Ads from "./pages/AdsPages/Ads";
import "./App.css";
import AdminNewsHandler from "./pages/admin/AdminNewsHandler";
import SignIn from "./pages/SignIn";
import User from "./pages/admin/Users";

export const UserContext = createContext({});

const App = () => {
  const [userAuth, setUserAuth] = useState({ user: null });

  useEffect(() => {
    const userInSession = lookInSession("user");
    if (userInSession) {
      setUserAuth(JSON.parse(userInSession));
    }
  }, []);

  useEffect(() => {
    loadUser();
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
            <Route index element={<ProtectedRoute component={Das} />} />
            <Route
              path="create-news"
              element={<ProtectedRoute component={Editor} />}
            />
            <Route
              path="create-news/:news_id"
              element={<ProtectedRoute component={Editor} />}
            />
            <Route
              path="create-videos"
              element={<ProtectedRoute component={YoutubeVideo} />}
            />
            <Route
              path="all-news"
              element={<ProtectedRoute component={NewsHandler} />}
            />
            <Route
              path="all-videos-data"
              element={<ProtectedRoute component={VideoHandler} />}
            />
            <Route
              path="all-admin-news-data"
              element={<ProtectedRoute component={AdminNewsHandler} />}
            />
            <Route
              path="all-ads"
              element={<ProtectedRoute isAdmin={true} component={Ads} />}
            />
            <Route
              path="all-users"
              element={<ProtectedRoute isAdmin={true} component={User} />}
            />
          </Route>
          <Route path="/settings" element={<div>Settings Page</div>} />
          <Route path="/unauthorized" element={<div>Unauthorized</div>} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default App;

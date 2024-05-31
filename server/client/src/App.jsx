import React from "react";
// import Home from "./components/home/home.component";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeadNav from "./components/header/HeadNav";
import HomePage from "./pages/home/HomePage";
import MoreNews from "./pages/moreNews/moreNews";
import SinglePage from "./components/common/singlepage/SinglePage";
import Slider from "./components/slider/Slider";
import StateNewsUnknown from "./pages/state-news/StateNewsUnknown";
import StateNews from "./pages/StateNews";
import DistrictNews from "./pages/DistrictNews";
import Navbar from "./components/header/Navbar";
import BreakingNews from "./components/common/BreakingNews";
import "./App.css";
import Footer from "./pages/Footer";
import VideoPage from "./components/common/singlepage/VideoPage";
const App = () => {
  return (
    <BrowserRouter>
      {/* <HeadNav /> */}
      <Navbar />
      <Slider />
      <BreakingNews />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sonbhadra" element={<MoreNews />} />
        <Route path="/state" element={<StateNewsUnknown />} />
        {/* Routes for all know route    */}
        <Route path="/country" element={<StateNewsUnknown />} />
        <Route path="/world" element={<StateNewsUnknown />} />
        <Route path="/crime" element={<StateNewsUnknown />} />
        {/* ... add here  */}

        <Route path="/:state" element={<StateNews />} />
        <Route path="/:state/:district" element={<DistrictNews />} />
        <Route path="/news/:news_id" element={<SinglePage />} />
        <Route path="/video/:news_id" element={<VideoPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;

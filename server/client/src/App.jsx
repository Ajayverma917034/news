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
import { Toaster } from "react-hot-toast";
import StateNewsWithoutCategory from "./pages/state-news/StateNewsWithoutCategory";
import MoreVideos from "./pages/MoreVideos";
const App = () => {
  return (
    <BrowserRouter>
      {/* <HeadNav /> */}
      <Navbar />
      <Slider />
      <Toaster />
      <BreakingNews />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sonbhadra" element={<MoreNews />} />
        <Route path="/state" element={<StateNewsUnknown />} />
        {/* Routes for all know route    */}
        <Route path="/country" element={<MoreNews />} />
        <Route path="/top-videos" element={<MoreVideos />} />

        <Route path="/world" element={<MoreNews />} />
        <Route path="/crime" element={<MoreNews />} />
        <Route path="/ipl" element={<MoreNews />} />
        <Route path="/cricket" element={<MoreNews />} />
        <Route path="/sports" element={<MoreNews />} />
        <Route path="/religion" element={<MoreNews />} />
        <Route path="/entertainment" element={<MoreNews />} />
        <Route path="/astrology" element={<MoreNews />} />
        <Route path="/carrier" element={<MoreNews />} />
        {/* ... add here  */}

        <Route path="state/uttar-pradesh" element={<StateNews />} />
        <Route path="state/:state" element={<StateNewsWithoutCategory />} />
        <Route path="state/:state/:district" element={<DistrictNews />} />
        <Route path="/news/:news_id" element={<SinglePage />} />
        <Route path="/video/:news_id" element={<VideoPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;

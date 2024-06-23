import React, { useEffect, useState } from "react";
import sidebarimg from "../../assets/news banner.png";
import AdsSlider from "./AdsSlider";
import AdsUploader from "./AdsUploader";
// import SideAds from './SideAds';
import httpClient from "../../services/httpClient";
const Ads = () => {
  const [showAdd, setShowAdd] = useState(0);
  const [sideAds, setSideAds] = useState(null);

  const fetchSideAds = async () => {
    try {
      const { data } = await httpClient.get("/get-advertisement?type=square");
      setSideAds(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSideAds();
  }, []);
  return (
    <>
      {showAdd === 0 && (
        <div className=" mx-auto p-6">
          <div className="flex justify-between items-center mb-4 px-4">
            <h1 className="text-3xl font-bold">Main Ads (1093 x 297)</h1>
            <button
              className="bg-blue-500 text-white bg-blue px-4 py-2 rounded"
              onClick={() => setShowAdd(1)}
            >
              Create
            </button>
          </div>
          <AdsSlider showAdd={showAdd} setShowAdd={setShowAdd} />
          {/* <div>
            <div className="flex justify-between items-center mb-4 px-4 mt-10">
              <h1 className="text-3xl font-bold">Side Bar Ads (350 x 350)</h1>
              <button
                className="bg-blue-500 text-white bg-blue px-4 py-2 rounded"
                onClick={() => setShowAdd(2)}
              >
                Create
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 px-[3rem] py-4">
              {sideAds &&
                sideAds.map((img, index) => (
                  <div className="h-[200px] w-full">
                    <img src={img.banner.url} alt="sideimg" className="" />
                  </div>
                ))}
            </div>
          </div> */}
        </div>
      )}
      {showAdd === 1 && (
        <AdsUploader showAdd={showAdd} setShowAdd={setShowAdd} />
      )}
      {showAdd === 2 && (
        <AdsUploader showAdd={showAdd} setShowAdd={setShowAdd} />
      )}
    </>
  );
};

export default Ads;

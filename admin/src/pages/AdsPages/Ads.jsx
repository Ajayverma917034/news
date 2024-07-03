import React, { useEffect, useState } from "react";
import AdsUploader from "./AdsUploader";
import httpClient from "../../services/httpClient";

import toast from "react-hot-toast";
import SliderAds from "./SliderAds";
import Ads2 from "./Ads2";
// import SideAds from "./SideAds";

const Ads = () => {
  const [showAdd, setShowAdd] = useState(0);
  const [ads1, setAds1] = useState([]);
  const [ads2, setAds2] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const fetchSideAds = async () => {
    try {
      const { data } = await httpClient.get("/get-admin-advertisement");
      setAds1(data.data);
      setAds2(data.data2);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSideAds();
  }, []);

  const handleEdit = (id) => {
    console.log("Edit image with id:", id);
    // Add your edit logic here
  };

  const handleDelete = async (id) => {
    const loadingToast = toast.loading("Deleting...");
    try {
      await httpClient.delete(`/delete-advertisement/${id}`);
      setAds1(ads1.filter((ad) => ad._id !== id));
      toast.dismiss(loadingToast);
      toast.success("Advertisement deleted successfully");
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error("Failed to delete advertisement");
      console.log(err);
    }
    setIsModalOpen(false);
  };

  const handleOnDragEnd = async (result) => {
    if (!result.destination) return;

    const items = Array.from(ads1);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setAds1(items);
    // Add your API call to update the order in the backend
    try {
      await httpClient.post("/admin/ads/update-order", { orderedAds: items });
      toast.success("Order Updated Successfully");
      console.log("Order updated successfully");
    } catch (error) {
      console.error("Failed to update order", error);
    }
  };

  return (
    <>
      {showAdd === 0 ? (
        <div className="flex items-center p-2 md:p-4 justify-evenly flex-wrap gap-x-2 gap-y-5 h-[calc(100vh-100px)] md:h-[calc(100vh-82px)] overflow-auto">
          <SliderAds setShowAdd={setShowAdd} ads={ads1} setAds={setAds1} />
          <Ads2 setShowAdd={setShowAdd} ads={ads2} setAds={setAds2} />
        </div>
      ) : (
        <AdsUploader showAdd={showAdd} setShowAdd={setShowAdd} />
      )}
    </>
  );
};

export default Ads;

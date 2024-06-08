import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import sliderimg from "../../assets/news banner.png";
import httpClient from "../../services/httpClient";
import { MdEdit } from "react-icons/md";
import { ImBin } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./AdsSlider.css";

// import required modules
import { Pagination, Navigation, HashNavigation } from "swiper/modules";
import ConfirmationModal from "../../components/ConfirmationModal";

export default function AdsSlider({ showAdd, setShowAdd }) {
  const [ads, setAds] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState(null);

  const navigate = useNavigate();

  const fetchAds = async () => {
    try {
      const { data } = await httpClient.get(
        "/get-advertisement?type=rectangle"
      );
      setAds(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (id) => {
    navigate(`?add_id=${id}`);
    setShowAdd(1);
  };

  const handleDelete = async () => {
    try {
      let loadingToast = toast.loading("Deleting...");
      const { data } = await httpClient.delete(`/delete-advertisement/${id}`);
      setAds(data.data);
      setIsModalOpen(false);
      toast.dismiss(loadingToast);
      toast.success("Advertisement deleted successfully");
      fetchAds();
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete advertisement");
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);
  return (
    <>
      <Swiper
        spaceBetween={30}
        slidesPerView={3}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        hashNavigation={{
          watchState: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation, HashNavigation]}
        className="mySwiper"
      >
        {ads &&
          ads.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="relative">
                <img src={img.banner.url} alt="sliderimg" />
                <div className="flex gap-3 absolute top-1 right-1">
                  <button
                    className="bg-white rounded-full p-1"
                    onClick={() => handleEdit(img._id)}
                  >
                    <MdEdit size={25} className="text-blue " />
                  </button>
                  <button
                    className="bg-white rounded-full p-1"
                    onClick={() => {
                      setIsModalOpen(true);
                      setId(img._id);
                    }}
                  >
                    <ImBin size={25} className="text-red" />
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
      <ConfirmationModal
        id={id}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}

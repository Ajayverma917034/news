import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { handleImageError } from "../../common/imageError";
import bannerImg from "../../assets/errorimg1.png";
import httpClient from "../../services/httpClient";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const AdsUploader = ({ setShowAdd, showAdd }) => {
  let [banner, setBanner] = useState(bannerImg);
  const [isLink, setIsLink] = useState(false);
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);
  const query = useQuery();
  const add_id = query.get("add_id");

  console.log(add_id);
  const handleImage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setBanner(URL.createObjectURL(e.target.files[0]));
    }
  };
  const handleSave = () => {
    if (add_id) {
      if (!image) {
        toast.error("Please choose an image");
        return;
      }
      if (isLink && !link) {
        toast.error("Please enter a link");
        return;
      }
      const formData = new FormData();
      formData.append("add_id", add_id);
      formData.append("banner", image);
      formData.append("link", link);
      formData.append("type", showAdd === 1 ? "rectangle" : "square");
      let loadingToast = toast.loading("Uploading...");
      httpClient
        .put(`/admin/ads/update/${add_id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(({ data }) => {
          toast.dismiss(loadingToast);
          toast.success("Advertisement updated successfully");
          setShowAdd(0);
        })
        .catch((err) => {
          toast.dismiss(loadingToast);
          toast.error("Failed to update advertisement");
          console.log(err);
        });
    } else {
      if (!image) {
        toast.error("Please upload an image");
        return;
      }
      if (isLink && !link) {
        toast.error("Please enter a link");
        return;
      }

      const formData = new FormData();
      console.log(image);

      formData.append("banner", image);
      formData.append("link", link); // Ensure 'link' is correctly appended
      formData.append("type", showAdd === 1 ? "rectangle" : "square");
      let loadingToast = toast.loading("Uploading...");
      httpClient
        .post("/admin/ads/add", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(({ data }) => {
          toast.dismiss(loadingToast);
          toast.success("Advertisement created successfully");
          setShowAdd(0);
        })
        .catch((err) => {
          toast.dismiss(loadingToast);
          toast.error("Failed to create advertisement");
          console.log(err);
        });
    }
  };

  const fetchAdd = async () => {
    try {
      const { data } = await httpClient.get(`/get-advertisement/${add_id}`);
      console.log(data);
      setBanner(data.data.banner.url);
      if (data.data.link) {
        setIsLink(true);
      }
      setLink(data.data.link);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (add_id) {
      fetchAdd();
    }
  }, [add_id]);
  return (
    <div className=" w-[70%] mx-auto p-4 mt-4  border-gray-300 rounded-lg ">
      <h2 className="text-xl font-semibold mb-4">
        {showAdd === 1
          ? "Create a Main Ad (1093 X 297)"
          : "Create a Side Ad (350 X 350)"}
      </h2>

      <div
        className={`relative ${showAdd === 1 ? "h-[297px]" : "h-[350px]"} ${
          showAdd === 1 ? "w-full" : "w-[350px]"
        } hover:opacity-80 bg-white border-2 border-blue rounded-md`}
      >
        <label htmlFor="uploadBanner">
          <img
            src={banner}
            alt="Default Banner"
            className="z-20 rounded-md"
            onError={handleImageError}
          />
          <input
            type="file"
            id="uploadBanner"
            accept=".png, .jpg, .jpeg, .webp"
            hidden
            onChange={handleImage}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 items-center mt-4">
        <div className="col-span-1 md:col-span-1 flex items-center text-center">
          <label className="mr-2">Upload Image Link</label>
          <input
            type="checkbox"
            checked={isLink}
            onChange={() => setIsLink(!isLink)}
            className="form-checkbox h-5 w-5 text-red-600"
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          {isLink && (
            <input
              type="text"
              placeholder="Enter Url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="ml-4 p-2 border border-gray-300 rounded w-[97%]"
            />
          )}
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-10">
        <button
          className="bg-blue-600 text-white bg-blue px-4 py-2 rounded mr-2 hover:scale-[1.1]"
          onClick={handleSave}
        >
          {add_id ? "Update" : "Save"}
        </button>
        <button
          className="bg-gray-300 text-black shadow-dark-shadow px-4 font-bold py-2 rounded hover:scale-[1.1]"
          onClick={() => setShowAdd(0)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AdsUploader;

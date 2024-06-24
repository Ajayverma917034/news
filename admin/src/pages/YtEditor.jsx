import React, { useEffect, useRef, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { findHindi, stateDistricts } from "../common/data";
import Tag from "../components/tag.component";
import { IoIosAddCircle } from "react-icons/io";

const ytVideoStructure = {
  id: "",
  title: "",
  videoLinkId: "",
  description: "",
  tags: [],
  state: "",
  district: "",
  location: "",
};
const YoutubeVideo = () => {
  let addYtData = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [tagdata, setTagData] = useState("");

  // Extract the user_id from the URL parameters
  const searchParams = new URLSearchParams(location.search);
  const video_id = searchParams.get("video_id");

  let [ytData, setYtData] = useState(ytVideoStructure);

  const handleSubmit = (e) => {
    e.preventDefault();

    let form = new FormData(addYtData.current);

    let formData = {};

    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }

    formData.id = video_id;
    formData["tags"] = ytData.tags;
    e.target.setAttribute("disabled", true);
    var loadingData = video_id ? "Updating..." : "Creating...";
    let loadingToast = toast.loading(loadingData);
    axios.defaults.withCredentials = true;
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/create-yt-news", formData)
      .then(() => {
        toast.dismiss(loadingToast);
        e.target.removeAttribute("disabled");
        var successData = video_id ? "Updated" : "Added";
        toast.success(`Youtube Video ${successData} Successfully`);
        navigate("/dashboard/all-videos-data");
      })
      .catch(({ response }) => {
        toast.dismiss(loadingToast);
        e.target.removeAttribute("disabled");
        return toast.error(response.data.message);
      });
  };

  let tagLimit = 10;
  const handleKeyDown = (e) => {
    if (e.keyCode === 13 || e.keyCode === 188) {
      e.preventDefault();
      let tag = e.target.value;
      if (ytData.tags.length < tagLimit) {
        if (!ytData.tags.includes(tag) && tag.length) {
          setYtData({ ...ytData, tags: [...ytData.tags, tag] });
        }
      } else {
        toast.error(`You can add max ${tagLimit} tags`);
      }
      e.target.value = "";
      setTagData("");
    }
  };

  const fetchNews = () => {
    setLoading(true);
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/get-youtube-news", {
        video_id,
        draft: false,
        mode: "edit",
      })
      .then(async ({ data: { news } }) => {
        setYtData(news);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const [choosenState, setChoosenState] = useState("");
  const [choosenDistrict, setChoosenDistrict] = useState("");
  const states = Object.keys(stateDistricts).map((state) => ({
    english: state,
  }));
  const handleStateChange = (e) => {
    setChoosenState(e.target.value);
    setChoosenDistrict(""); // reset district when state changes
  };
  const handleTag = () => {
    // e.preventDefault();
    let tag = tagdata;
    console.log(tag);
    // let tag = e.target.value;
    setTagData(tag);
    if (ytData.tags?.length < tagLimit) {
      if (!ytData.tags.includes(tag) && tag.length) {
        setYtData({ ...ytData, tags: [...ytData.tags, tag] });
      }
    } else {
      toast.error(`You can add max ${tagLimit} tags`);
    }
    setTagData("");
    // e.target.value = "";
  };
  useEffect(() => {
    if (video_id) {
      fetchNews();
    }
  }, [video_id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="p-5 md:p-10 w-full">
      <h1 className="max-md:hidden mb-5 text-3xl font-semibold text-red">
        {video_id ? "Update" : "Add"} Youtube Video
      </h1>
      <form ref={addYtData}>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5">
          <div className="flex flex-col gap-y-1">
            <label
              htmlFor="title"
              className="text-2xl font-semibold text-blue required-text"
            >
              Title of the video
            </label>
            <input
              name="title"
              type="text"
              // value={ytData.title}
              defaultValue={ytData.title}
              placeholder="Enter the title of the video"
              className="input-box mb-5 pl-4"
              // icon="fi-rr-user"
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <label
              htmlFor="videoLinkId"
              className="text-2xl font-semibold text-blue required-text"
            >
              Enter the video Id{" "}
            </label>
            <input
              name="videoLinkId"
              type="text"
              // value={ytData.videoLinkId}
              defaultValue={ytData.videoLinkId}
              placeholder="Enter the youtube video ID (e.g. 3hbld99ue3)"
              className="input-box mb-5 pl-4"
              // icon="fi-rr-envelope"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5">
          <div className="flex flex-col gap-y-1">
            <label
              htmlFor="description"
              className="text-2xl font-semibold text-blue required-text"
            >
              Enter the description of the video
            </label>
            <textarea
              name="description"
              className="input-box h-64 lg:h-40 resize-none leading-7 pl-5"
              placeholder="Video Description"
              defaultValue={ytData.description}
            ></textarea>
          </div>
          <div className="flex flex-col gap-y-1">
            <label
              htmlFor="tags"
              className="text-2xl font-semibold text-blue required-text"
            >
              Enter the tags related to the video
            </label>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Tags Related to the video (Press Enter to add)"
                value={tagdata}
                onChange={(e) => setTagData(e.target.value)}
                onKeyDown={handleKeyDown}
                className="sticky input-box pl-4 mb-3"
                name="tags"
              />
              <button className="ml-2" type="button" onClick={handleTag}>
                <IoIosAddCircle
                  size={25}
                  className="text-dark-grey pointer-events-none"
                />
              </button>
            </div>
            <div>
              {ytData?.tags &&
                ytData.tags.map((tag, i) => {
                  return (
                    <Tag
                      key={i}
                      tagIndex={i}
                      tag={tag}
                      ytData={ytData}
                      setYtData={setYtData}
                    />
                  );
                })}
            </div>

            <div className="flex flex-col gap-y-1">
              <label
                htmlFor="location"
                className="text-2xl font-semibold text-blue required-text"
              >
                Enter the location of the video
              </label>
              <input
                type="text"
                placeholder="Location (Incident location)"
                // onKeyDown={handleKeyDown}
                className="sticky input-box pl-4 mb-3"
                name="location"
                defaultValue={ytData.location}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5">
          <div className="flex flex-col gap-y-1">
            <label
              htmlFor="title"
              className="text-2xl font-semibold text-blue "
            >
              Choose the state of the video
            </label>
            <select
              name="state"
              type="text"
              placeholder="State"
              className="input-box mb-5 pl-4 capitalize"
              value={choosenState}
              onChange={handleStateChange}
              defaultValue={ytData.state}
            >
              <option value="" disabled>
                Select State
              </option>
              {states.map((state, i) => {
                return (
                  <option key={i} value={state.english} className=" capitalize">
                    {findHindi(state.english)}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col gap-y-1">
            <label
              htmlFor="district"
              className="text-2xl font-semibold text-blue"
            >
              Choose the district of news
            </label>
            <select
              name="district"
              placeholder="District"
              className="input-box mb-5 pl-4 capitalize"
              value={choosenDistrict}
              onChange={(e) => setChoosenDistrict(e.target.value)}
              disabled={!choosenState}
              defaultValue={ytData.district}
            >
              <option value="" disabled>
                Select District
              </option>
              {stateDistricts[choosenState] &&
                stateDistricts[choosenState].map((district, i) => {
                  return (
                    <option
                      key={i}
                      value={district.english}
                      className="capitalize"
                    >
                      {district.hindi}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="btn-dark px-10 mt-5"
          type="submit"
        >
          {video_id ? " Update Now" : "Add Now"}
        </button>
      </form>
    </div>
  );
};

export default YoutubeVideo;

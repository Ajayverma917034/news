import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
// import AnimationWrapper from "../common/page-animation";
import { UserContext } from "../App";
import { useLocation } from "react-router-dom";
import { stateDistricts } from "../common/data";
import Tag from "../components/tag.component";

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
  const {
    userAuth,
    userAuth: { refreshToken },
  } = useContext(UserContext);

  const location = useLocation();
  const [loading, setLoading] = useState(false);

  // Extract the user_id from the URL parameters
  const searchParams = new URLSearchParams(location.search);
  const video_id = searchParams.get("video_id");
  // console.log(video_id);

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
        return toast.success(`Youtube Video ${successData} Successfully`);
      })
      .catch(({ response }) => {
        toast.dismiss(loadingToast);
        e.target.removeAttribute("disabled");
        // console.log(response);
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
        // console.log(news);
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
          <div>
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
          <div>
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
          <div>
            <textarea
              name="description"
              className="input-box h-64 lg:h-40 resize-none leading-7 pl-5"
              placeholder="Video Description"
              defaultValue={ytData.description}
            ></textarea>
          </div>
          <div>
            <input
              type="text"
              placeholder="Tags Related to the video (Press Enter to add)"
              onKeyDown={handleKeyDown}
              className="sticky input-box pl-4 mb-3"
              name="tags"
            />
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

            <div>
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
          <div>
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
                    {state.english}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
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
              {choosenState &&
                stateDistricts[choosenState.toLowerCase()]?.map(
                  (district, i) => (
                    <option
                      key={i}
                      value={district.english}
                      className="capitalize"
                    >
                      {district.english}
                    </option>
                  )
                )}
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

import React, { useContext, useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Tag from "./Tags.jsx";
import { EditorContext } from "../pages/Editor.jsx";
// import Section from "./NewsSection.jsx";
import { IoMdClose } from "react-icons/io";
import { IoIosAddCircle } from "react-icons/io";
import { districts, findHindi, stateDistricts } from "../common/data.js";
// import { CategoryData } from "../assets/CategoryData.js";
import { handleImageError } from "../common/imageError.js";
import { categoryData } from "../common/categoryData.js";
import SchedulePopUp from "./common/SchedulePopUp.jsx";

const timeOptions = [];
for (let i = 0; i < 24; i++) {
  for (let j = 0; j < 60; j += 15) {
    const hour = i % 12 === 0 ? 12 : i % 12;
    const paddedHour = hour.toString().padStart(2, "0"); // Ensures two-digit hour format
    const minute = j === 0 ? "00" : j.toString().padStart(2, "0"); // Ensures two-digit minute format
    const period = i < 12 ? "AM" : "PM";
    timeOptions.push(`${paddedHour}:${minute} ${period}`);
  }
}

const PublishForm = () => {
  const charLength = 200;
  const tagLimit = 15;
  const navigate = useNavigate();
  const { news_id } = useParams();

  const query = new URLSearchParams(window.location.search);
  const mode = query.get("mode");
  const type = query.get("type");

  const [popupOpen, setPopUpOpen] = useState(false);
  // const [scheduleData, setScheduleData] = useState({
  //   date: "",
  //   time: "",
  // });
  let {
    blog: {
      banner,
      title,
      tags,
      description,
      content,
      state,
      district,
      location,
      news_section_type,
      breaking_news,
      post_time,
      sendNotification,
      imageRef,
    },
    setEditorState,
    setBlog,
    blog,
  } = useContext(EditorContext);

  // const [isOn, setIsOn] = useState(() => {
  //   // Retrieve the saved state from localStorage, default to false if not found
  //   const savedState = localStorage.getItem('toggleState');
  //   return savedState ? JSON.parse(savedState) : false;
  // });

  // // Toggle the switch state
  const toggleSwitch = () => {
    setBlog({ ...blog, sendNotification: !sendNotification });
  };

  // // Save the toggle state to localStorage whenever it changes
  // useEffect(() => {
  //   localStorage.setItem('toggleState', JSON.stringify(isOn));
  // }, [isOn]);

  const [tagdata, setTagData] = useState("");
  const [hasChanges, setHasChanges] = useState(false);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState(0);

  useEffect(() => {
    const autoSave = () => {
      localStorage.setItem("blog", JSON.stringify(blog));
      setHasChanges(false);
    };

    const intervalId = setInterval(autoSave, 5000);

    return () => clearInterval(intervalId);
  }, [
    description,
    state,
    district,
    location,
    news_section_type,
    hasChanges,
    post_time,
  ]);

  const handleClose = () => {
    setEditorState("editor");
  };

  const handleKeyDown = (e) => {
    setHasChanges(true);
    if (e.keyCode === 13 || e.keyCode === 188) {
      e.preventDefault();
      let tag = e.target.value;
      if (tags?.length < tagLimit) {
        if (!tags.includes(tag) && tag.length) {
          setBlog({ ...blog, tags: [...tags, tag] });
        }
      } else {
        toast.error(`You can add max ${tagLimit} tags`);
      }
      setTagData("");
    }
  };

  const handlePublish = (e) => {
    if (e.target.className.includes("disable")) {
      return;
    }
    if (!title.length) {
      return toast.error("Write News Title before publishing");
    }
    if (!description || description.length > charLength)
      return toast.error(
        `Write a description about your news within ${charLength} characters to publish`
      );
    if (!tags.length || tags.length > 10) {
      return toast.error(
        ` Write some tags about news within ${tagLimit} tag limit to publish`
      );
    }
    if (!state.length && !news_section_type.length && !district.length) {
      return toast.error(
        `Please choose the state or district or the news section of the news`
      );
    }

    let loadingToast = toast.loading("Publishing...");

    let blogObj = {
      title,
      banner,
      description,
      content,
      tags,
      state,
      district,
      location,
      news_section_type,
      breaking_news,
      sendNotification,
      draft: false,
      imageRef,
    };
    e.target.classList.add("disable");

    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/create-news", {
        ...blogObj,
        id: news_id,
      })
      .then(() => {
        e.target.classList.remove("disable");
        toast.dismiss(loadingToast);
        toast.success("Published successfully");
        localStorage.removeItem("blog");
        navigate("/dashboard/all-news");
      })
      .catch(({ response }) => {
        e.target.classList.remove("disable");
        toast.dismiss(loadingToast);
        return toast.error(response?.data?.error);
      });
  };

  const ScheduleNews = (e) => {
    // if (e.target.className.includes("disable")) {
    //   return;
    // }

    if (!title.length) {
      return toast.error("Write News Title before publishing");
    }
    if (!description || description.length > charLength)
      return toast.error(
        `Write a description about your news within ${charLength} characters to publish`
      );
    if (!tags.length || tags.length > 10) {
      return toast.error(
        ` Write some tags about news within ${tagLimit} tag limit to publish`
      );
    }
    if (!state.length && !news_section_type.length && !district.length) {
      return toast.error(
        `Please choose the state or district or the news section of the news`
      );
    }

    if (!post_time.date) {
      return toast.error("Please select the schedule date");
    }
    if (!post_time.time) {
      return toast.error("Please select the schedule time");
    }

    let loadingToast = toast.loading("Scheduling News ...");

    let blogObj = {
      title,
      banner,
      description,
      content,
      tags,
      state,
      district,
      location,
      news_section_type,
      breaking_news,
      draft: false,
      post_time,
      sendNotification,
      imageRef,
    };
    // e.target.classList.add("disable");

    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/create-schedule-news", {
        ...blogObj,
        id: news_id,
      })
      .then(() => {
        // e.target.classList.remove("disable");
        toast.dismiss(loadingToast);
        toast.success("Scheduled successfully");
        localStorage.removeItem("blog");
        navigate("/dashboard/schedule-news");
      })
      .catch(({ response }) => {
        // e.target.classList.remove("disable");
        toast.dismiss(loadingToast);
        return toast.error(response?.data?.error);
      });
  };

  const handleDateChange = (val) => {
    setBlog({
      ...blog,
      post_time: {
        ...blog.post_time,
        date: val,
      },
    });
    setHasChanges(true);
  };

  const handleTimeChange = (selectedIndex) => {
    setSelectedTimeIndex(selectedIndex);
    setBlog({
      ...blog,
      post_time: {
        ...blog.post_time,
        time: timeOptions[selectedIndex],
      },
    });
    setHasChanges(true);
  };

  const states = Object.keys(stateDistricts).map((state) => ({
    english: state,
  }));

  const handleOptionChange = (category, value) => {
    setBlog((prev) => {
      const isSelected = prev[category].includes(value);

      return {
        ...prev,
        [category]: isSelected
          ? prev[category].filter((item) => item !== value)
          : [...prev[category], value],
      };
    });
  };

  const handleTag = () => {
    let tag = tagdata;
    setTagData(tag);
    if (tags?.length < tagLimit) {
      if (!tags.includes(tag) && tag.length) {
        setBlog({ ...blog, tags: [...tags, tag] });
      }
    } else {
      toast.error(`You can add max ${tagLimit} tags`);
    }
    setTagData("");
  };

  const handleDescription = (e) => {
    const updatedBlog = { ...blog, description: e.target.value };
    setBlog(updatedBlog);

    // console.log(updatedBlog);

    localStorage.setItem("blog", JSON.stringify(updatedBlog));
  };

  return (
    <>
      <div className="flex justify-between items-center sticky top-[84px] md:top-[64px] lg:top-[64px] xl:top-[80px] bg-blue px-3 md:px-10 z-10">
        <p className="text-white font-semibold text-2xl md:text-3xl xl:text-4xl mb-1">
          Preview
        </p>
        <button className="w-12 h-12" onClick={handleClose}>
          <IoMdClose
            size={25}
            className="bg-white rounded-full text-sm text-red pointer-events-none"
          />
        </button>
      </div>
      <section className="w-full grid grid-cols-1 md:grid-cols-5 lg:gap-4 p-5">
        <div className="max-w-[500px] center col-span-1 mt-3 md:col-span-2">
          <div className="w-full aspect-video rounded-lg overflow-hidden bg-grey mt-4">
            <img src={banner} alt="Banner" onError={handleImageError} />
          </div>
          <h1 className="text-4xl font-medium mt-2 leading-tight line-clamp-2">
            {title}
          </h1>
          <p className="line-clamp-3 text-xl leading-7 mt-4">{description}</p>
        </div>

        <div className="border-grey lg:border-1 lg:pl-4 col-span-1 md:col-span-3 h-full md:max-h-[calc(100vh-200px)] lg:max-h-[calc(100vh-200px)] xl:max-h-[calc(100vh-200px)] md:overflow-y-auto md:px-3">
          <div className=" py-2 mt-5">
            <h2 className="!font-semibold required-text">
              Short description about your news
            </h2>
            <div className="flex flex-col w-[100%] rounded-md p-4 bg-[#fcfcfc] border border-gray">
              <textarea
                maxLength={charLength}
                defaultValue={description}
                className="h-40 resize-none leading-7 input-box pl-4"
                onChange={handleDescription}
                onKeyDown={(e) => {
                  if (e.keyCode === 13) e.preventDefault();
                }}
              ></textarea>
            </div>
            <p className="mt-1 text-dark-grey text-sm text-right">
              {charLength - description?.length} characters left
            </p>
          </div>

          <div className=" py-2 mt-5">
            <h2 className="!font-semibold required-text">
              Enter the location of news
            </h2>
            <div className="flex flex-col w-[100%] rounded-md p-4 bg-[#fcfcfc] border border-gray">
              <input
                type="text"
                placeholder="News Location"
                value={location}
                className="input-box pl-4"
                onChange={(e) => {
                  setBlog({ ...blog, location: e.target.value });
                  setHasChanges(true);
                }}
              />
            </div>
          </div>

          <div className=" py-2 mt-5">
            <h2 className="!font-semibold required-text">
              Tags - ( Helps in searching and ranking your news post )
            </h2>
            <div className="flex flex-col w-[100%] rounded-md p-4 bg-[#fcfcfc] border border-gray">
              <div className="flex items-center">
                <input
                  type="text"
                  value={tagdata}
                  placeholder="Tags"
                  onKeyDown={handleKeyDown}
                  onChange={(e) => {
                    setTagData(e.target.value);
                  }}
                  className="sticky input-box bg-white top-0 left-0 pl-4 focus:bg-white"
                />
                <button className="ml-2" onClick={handleTag}>
                  <IoIosAddCircle
                    size={25}
                    className="text-dark-grey pointer-events-none"
                  />
                </button>
              </div>
              <div>
                {tags &&
                  tags.map((tag, i) => {
                    return <Tag key={i} tagIndex={i} tag={tag} />;
                  })}
              </div>
            </div>
            <p className="mt-1 pt-1 mb-4 text-dark-grey text-right">
              {tagLimit - tags?.length} Tags left
            </p>
          </div>
          <div className="pb-4 ">
            <h2 className="!font-semibold">Choose State (s)</h2>
            <div className="flex flex-wrap w-[100%] rounded-md p-4 bg-[#fcfcfc] border border-gray">
              {states.map((item, index) => (
                <label
                  key={index}
                  className="flex items-center space-x-2 m-1 border rounded-full px-2 py-1 border-gray bg-white"
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 p-1 text-blue bg-blue border-gray rounded-full"
                    checked={blog.state.includes(item.english)}
                    onChange={() => handleOptionChange("state", item.english)}
                  />
                  <span className="">{findHindi(item.english)}</span>
                </label>
              ))}
            </div>
          </div>
          <div className=" py-2 pb-4 mt-5">
            <h2 className="!font-semibold">Choose Districts (s)</h2>
            <div className="flex flex-wrap w-[100%] rounded-md p-4 bg-[#fcfcfc] border border-gray">
              {districts.map((item, index) => (
                <label
                  key={index}
                  className="flex items-center space-x-2 m-1 border rounded-full px-2 py-1 border-gray bg-white"
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 p-1 text-blue bg-blue border-gray rounded-full"
                    checked={blog.district.includes(item.english)}
                    onChange={() =>
                      handleOptionChange("district", item.english)
                    }
                  />
                  <span className="">{findHindi(item.english)}</span>
                </label>
              ))}
            </div>
          </div>
          <div className=" py-2 pb-4 mt-5">
            <h2 className="!font-semibold">
              News Section - ( Choose the news sections )
            </h2>
            <div className="flex flex-wrap w-[100%] rounded-md p-4 bg-[#fcfcfc] border border-gray">
              {categoryData.map((item, index) => (
                <label
                  key={index}
                  className="flex items-center space-x-2 m-1 border rounded-full px-2 py-1 border-gray bg-white"
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 p-1 text-blue bg-blue border-gray rounded-full"
                    checked={blog.news_section_type.includes(item.english)}
                    onChange={() =>
                      handleOptionChange("news_section_type", item.english)
                    }
                  />
                  <span className="">{findHindi(item.hindi)}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex gap-x-5 items-center flex-wrap justify-center w-full">
            <p>Send Notification</p>
            <div
              className={`relative w-20 h-10 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out ${
                sendNotification ? "bg-green-500" : "bg-gray"
              }`}
              onClick={toggleSwitch}
            >
              <span
                className={`absolute left-10 right-1 text-white font-semibold text-sm transition-transform ${
                  sendNotification ? "translate-x-6 -left-2" : "left-0"
                }`}
              >
                {sendNotification ? "ON" : "OFF"}
              </span>
              <div
                className={`w-8 h-8 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
                  sendNotification ? "translate-x-10" : ""
                }`}
              />
            </div>
            <button onClick={handlePublish} className={`btn-dark px-8 my-4 `}>
              Publish
            </button>

            {mode !== "edit" ? (
              <button
                onClick={() => setPopUpOpen(true)}
                className="btn-dark px-8 my-4"
              >
                Schedule Post
              </button>
            ) : (
              <> </>
            )}
          </div>
        </div>
        {type !== "edit" ? (
          <SchedulePopUp
            popupOpen={popupOpen}
            setPopUpOpen={setPopUpOpen}
            post_time={post_time}
            handleSchedule={ScheduleNews}
            handleDateChange={handleDateChange}
            handleTimeChange={handleTimeChange}
            timeOptions={timeOptions}
            selectedTimeIndex={selectedTimeIndex}
          />
        ) : (
          <> </>
        )}
      </section>
    </>
  );
};

export default PublishForm;

// import React, { useContext, useEffect, useState } from "react";
// import { Toaster, toast } from "react-hot-toast";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import Tag from "./Tags.jsx";
// import { EditorContext } from "../pages/Editor.jsx";
// import Section from "./NewsSection.jsx";
// import { IoMdClose } from "react-icons/io";
// import { IoIosAddCircle } from "react-icons/io";
// import { districts, findHindi, stateDistricts } from "../common/data.js";
// import { CategoryData } from "../assets/CategoryData.js";
// import { handleImageError } from "../common/imageError.js";

// const PublishForm = () => {
//   const charLength = 200;
//   const tagLimit = 10;
//   const navigate = useNavigate();
//   const { news_id } = useParams();
//   let {
//     blog: {
//       banner,
//       title,
//       tags,
//       description,
//       content,
//       state,
//       district,
//       location,
//       news_section_type,
//       breaking_news,
//     },
//     setEditorState,
//     setBlog,
//     blog,
//   } = useContext(EditorContext);

//   const [tagdata, setTagData] = useState("");
//   const [hasChanges, setHasChanges] = useState(false);

//   // useEffect(() => {
//   //   const autoSave = () => {
//   //     if (
//   //       title.length &&
//   //       description.length <= charLength &&
//   //       tags.length <= tagLimit
//   //     ) {
//   //       let blogObj = {
//   //         title,
//   //         banner,
//   //         description,
//   //         content,
//   //         tags,
//   //         state,
//   //         district,
//   //         location,
//   //         news_section_type,
//   //         breaking_news,
//   //         draft: true,
//   //       };
//   //       axios
//   //         .post(import.meta.env.VITE_SERVER_DOMAIN + "/create-news", {
//   //           ...blogObj,
//   //           id: news_id,
//   //         })
//   //         .then(() => {})
//   //         .catch(({ response }) => {
//   //           return toast.error(response?.data?.error);
//   //         });
//   //     }
//   //   };

//   //   const intervalId = setInterval(autoSave, 5000);

//   //   return () => clearInterval(intervalId);
//   // }, [
//   //   description,
//   //   tags,
//   //   state,
//   //   district,
//   //   location,
//   //   news_section_type,
//   //   breaking_news,
//   //   news_id,
//   // ]);

//   useEffect(() => {
//     const autoSave = () => {
//       // if (textEditor.isReady && hasChanges) {
//       //   textEditor.save().then((data) => {
//       //     const updatedBlog = { ...blog, content: data };
//       //     setBlog(updatedBlog);

//       //     // Send auto-save request to server
//       //     // axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/create-news", {
//       //       //   ...updatedBlog,
//       //       //   id: news_id,
//       //       //   draft: true,
//       //       // });

//       //       // Reset hasChanges to false after saving
//       //     });
//       //   }
//       localStorage.setItem("blog", JSON.stringify(blog));
//       setHasChanges(false);
//     };

//     const intervalId = setInterval(autoSave, 5000);

//     return () => clearInterval(intervalId);
//   }, [description, state, district, location, news_section_type, hasChanges]);

//   const handleClose = () => {
//     setEditorState("editor");
//   };

//   const handleKeyDown = (e) => {
//     setHasChanges(true);
//     if (e.keyCode === 13 || e.keyCode === 188) {
//       e.preventDefault();
//       let tag = e.target.value;
//       if (tags?.length < tagLimit) {
//         if (!tags.includes(tag) && tag.length) {
//           setBlog({ ...blog, tags: [...tags, tag] });
//         }
//       } else {
//         toast.error(`You can add max ${tagLimit} tags`);
//       }
//       setTagData("");
//     }
//   };

//   const handleSectionChange = (e) => {
//     setHasChanges(true);
//     const newSection = e.target.value;
//     setBlog({ ...blog, news_section_type: [...news_section_type, newSection] });
//   };

//   const handlePublish = (e) => {
//     if (e.target.className.includes("disable")) {
//       return;
//     }
//     if (!title.length) {
//       return toast.error("Write News Title before publishing");
//     }
//     if (!description || description.length > charLength)
//       return toast.error(
//         `Write a description about your news within ${charLength} characters to publish`
//       );
//     if (!tags.length || tags.length > 10) {
//       return toast.error(
//         ` Write some tags about news within ${tagLimit} tag limit to publish`
//       );
//     }
//     if (!state && !news_section_type.length && !district) {
//       return toast.error(
//         `Please choose the state or district or the news section of the news`
//       );
//     }

//     let loadingToast = toast.loading("Publishing...");

//     let blogObj = {
//       title,
//       banner,
//       description,
//       content,
//       tags,
//       state,
//       district,
//       location,
//       news_section_type,
//       breaking_news,
//       draft: false,
//     };
//     e.target.classList.add("disable");

//     axios
//       .post(import.meta.env.VITE_SERVER_DOMAIN + "/create-news", {
//         ...blogObj,
//         id: news_id,
//       })
//       .then(() => {
//         e.target.classList.remove("disable");
//         toast.dismiss(loadingToast);
//         toast.success("Published successfully");
//         localStorage.removeItem("blog");
//         navigate("/dashboard/all-news");
//       })
//       .catch(({ response }) => {
//         e.target.classList.remove("disable");
//         toast.dismiss(loadingToast);
//         return toast.error(response?.data?.error);
//       });
//   };

//   const states = Object.keys(stateDistricts).map((state) => ({
//     english: state,
//   }));

//   const handleTag = () => {
//     let tag = tagdata;
//     setTagData(tag);
//     if (tags?.length < tagLimit) {
//       if (!tags.includes(tag) && tag.length) {
//         setBlog({ ...blog, tags: [...tags, tag] });
//       }
//     } else {
//       toast.error(`You can add max ${tagLimit} tags`);
//     }
//     setTagData("");
//   };

//   return (
//     <>
//       <div className="flex justify-between items-center sticky top-[84px] md:top-[64px] lg:top-[64px] xl:top-[80px] bg-blue px-3 md:px-10 z-10">
//         <p className="text-white font-semibold text-2xl md:text-3xl xl:text-4xl mb-1">
//           Preview
//         </p>
//         <button className="w-12 h-12" onClick={handleClose}>
//           <IoMdClose
//             size={25}
//             className="bg-white rounded-full text-sm text-red pointer-events-none"
//           />
//         </button>
//       </div>
//       <section className="w-full grid grid-cols-1 md:grid-cols-5 lg:gap-4 p-5">
//         <div className="max-w-[500px] center col-span-1 mt-3 md:col-span-2">
//           <div className="w-full aspect-video rounded-lg overflow-hidden bg-grey mt-4">
//             <img src={banner} alt="Banner" onError={handleImageError} />
//           </div>
//           <h1 className="text-4xl font-medium mt-2 leading-tight line-clamp-2">
//             {title}
//           </h1>
//           <p className="line-clamp-3 text-xl leading-7 mt-4">{description}</p>
//         </div>

//         <div className="border-grey lg:border-1 lg:pl-4 col-span-1 md:col-span-3 h-full md:max-h-[calc(100vh-200px)] lg:max-h-[calc(100vh-200px)] xl:max-h-[calc(100vh-200px)] md:overflow-y-auto md:px-3">
//           <p className="text-dark-grey mb-2 mt-4 required-text">
//             Short description about your news
//           </p>
//           <textarea
//             maxLength={charLength}
//             defaultValue={description}
//             className="h-40 resize-none leading-7 input-box pl-4"
//             onChange={(e) => {
//               setBlog({ ...blog, description: e.target.value });
//               setHasChanges(true);
//             }}
//             onKeyDown={(e) => {
//               if (e.keyCode === 13) e.preventDefault();
//             }}
//           ></textarea>
//           <p className="mt-1 text-dark-grey text-sm text-right">
//             {charLength - description?.length} characters left
//           </p>

//           <p className="text-dark-grey mb-2 mt-9 required-text">
//             Topics - ( Helps in searching and ranking your news post )
//           </p>
//           <div className="relative input-box pl-2 py-2 pb-4">
//             <div className="flex items-center">
//               <input
//                 type="text"
//                 value={tagdata}
//                 placeholder="Topics"
//                 onKeyDown={handleKeyDown}
//                 onChange={(e) => {
//                   setTagData(e.target.value);
//                 }}
//                 className="sticky input-box bg-white top-0 left-0 pl-4 focus:bg-white"
//               />
//               <button className="ml-2" onClick={handleTag}>
//                 <IoIosAddCircle
//                   size={25}
//                   className="text-dark-grey pointer-events-none"
//                 />
//               </button>
//             </div>
//             {tags &&
//               tags.map((tag, i) => {
//                 return <Tag key={i} tagIndex={i} tag={tag} />;
//               })}
//           </div>
//           <p className="mt-1 pt-1 mb-4 text-dark-grey text-right">
//             {tagLimit - tags?.length} Tags left
//           </p>

//           <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-3">
//             <div className="">
//               <p className="mb-2 mt-9">Choose the State</p>
//               <select
//                 name="state"
//                 id="state"
//                 value={state}
//                 className="input-box mb-5 pl-4 capitalize"
//                 onChange={(e) => {
//                   setBlog({ ...blog, state: e.target.value });
//                   setHasChanges(true);
//                 }}
//               >
//                 <option value="" defaultValue={state}>
//                   Select State
//                 </option>
//                 <option value="rajya">राज्य</option>
//                 {states.map((state, i) => {
//                   return (
//                     <option
//                       key={i}
//                       value={state.english}
//                       className="capitalize"
//                     >
//                       {findHindi(state.english)}
//                     </option>
//                   );
//                 })}
//               </select>
//             </div>
//             <div className="">
//               <p className="mb-2 mt-9">Choose District</p>
//               <select
//                 name="district"
//                 value={district}
//                 id="district"
//                 className="input-box mb-5 pl-4 capitalize"
//                 onChange={(e) => {
//                   setBlog({ ...blog, district: e.target.value });
//                   setHasChanges(true);
//                 }}
//               >
//                 <option value="" defaultValue={district}>
//                   Select District
//                 </option>
//                 <option value="apna zila">अपना जिला</option>
//                 {districts.map((district, i) => {
//                   return (
//                     <option
//                       key={i}
//                       value={district.english}
//                       className="capitalize"
//                     >
//                       {district.hindi}
//                     </option>
//                   );
//                 })}
//               </select>
//             </div>
//           </div>
//           <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-3">
//             <div className="">
//               <p className="mb-2 mt-9 required-text">
//                 Enter the location of news
//               </p>
//               <input
//                 type="text"
//                 placeholder="News Location"
//                 value={location}
//                 className="input-box pl-4"
//                 onChange={(e) => {
//                   setBlog({ ...blog, location: e.target.value });
//                   setHasChanges(true);
//                 }}
//               />
//             </div>
//           </div>
//           <p className="text-dark-grey mb-2 mt-9">
//             News Section - ( Choose the news sections )
//           </p>
//           <div className="relative input-box pl-2 py-2 pb-4">
//             <select
//               name="news-section"
//               id="news-section"
//               onChange={handleSectionChange}
//               className="input-box mb-5 pl-4 capitalize"
//             >
//               <option value="">Select News Section</option>
//               {CategoryData.map((category, i) => {
//                 return (
//                   <option
//                     key={i}
//                     value={category.english}
//                     className="capitalize"
//                   >
//                     {category.hindi}
//                   </option>
//                 );
//               })}
//             </select>

//             {news_section_type &&
//               news_section_type.map((tag, i) => {
//                 return <Section key={i} tagIndex={i} tag={tag} />;
//               })}
//           </div>
//           <button onClick={handlePublish} className="btn-dark px-8 my-4">
//             Publish
//           </button>
//         </div>
//       </section>
//     </>
//   );
// };

// export default PublishForm;

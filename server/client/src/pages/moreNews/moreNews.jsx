import React from "react";
import MorePageCard from "../../components/common/news-section/morepage.news.card";
import Heading from "../../components/common/Heading";
import Image from "../../assets/img1.png";
import SubNewsCard from "../../components/common/news-section/SubNewsCard";
import adsimgright1 from '../../assets/adsimgright1.png'
import adsimgright2 from  '../../assets/adsimgright2.png'
const MoreNews = () => {
  const data = [
    {
      id: 1,
      title: 'सलमान खान केस: CID करेगी आरोपी के सुसाइड की जांच, दरी से फंदा बनाकर लॉकअप के बाथरूम में लगाई थी फांसी',
      createdAt: 'Wed, 01 May 2024 04:35 PM',
      location: 'नई दिल्ली'
    },
    {
      id: 2,
      title: 'एक और बड़ा खबर: विश्व की सबसे ऊँची इमारत बुर्ज खलीफा का टॉप फ्लोर पर लगी आग, लोगों को इमरान खान ने कहा बंद कर दो सभी काम',
      createdAt: 'Wed, 01 May 2024 05:00 PM',
      location: 'बॉस्टन'
    },
    {
      id: 3,
      title: 'महामारी के कारण भारत में लॉकडाउन के बाद पहली बार हो रही दोबारा मौन भाजपा की सभा, सुनीता चोपड़ा ने आरोपियों को खुलेआम लाइन में धमकाया',
      createdAt: 'Wed, 01 May 2024 06:00 PM',
      location: 'सिडनी'
    },
    {
      id: 4,
      title: 'नया अब्दुल कलाम: कोरोना से लड़ने वाले योगी आदित्यनाथ का जीवन परिचय, जानिए कैसे बन गए थे CM से पहले राष्ट्रपति',
      createdAt: 'Wed, 01 May 2024 07:00 PM',
      location: 'लंदन'
    },
    {
      id: 5,
      title: 'यहां हम एक और टाइटल डाल सकते हैं क्योंकि यह समान लंबाई का है जैसा कि पहला है',
      createdAt: 'Wed, 01 May 2024 08:00 PM',
      location: 'पेरिस'
    },
    {
      id: 6,
      title: 'एक और टाइटल यहां डाल सकते हैं क्योंकि यह समान लंबाई का है जैसा कि पहला है',
      createdAt: 'Wed, 01 May 2024 09:00 PM',
      location: 'मुंबई'
    },
    {
      id: 7,
      title: 'एक और टाइटल यहां डाल सकते हैं क्योंकि यह समान लंबाई का है जैसा कि पहला है',
      createdAt: 'Wed, 01 May 2024 10:00 PM',
      location: 'न्यूयॉर्क'
    },
    {
      id: 8,
      title: 'एक और टाइटल यहां डाल सकते हैं क्योंकि यह समान लंबाई का है जैसा कि पहला है',
      createdAt: 'Wed, 01 May 2024 11:00 PM',
      location: 'दुबई'
    },
    {
      id: 9,
      title: 'एक और टाइटल यहां डाल सकते हैं क्योंकि यह समान लंबाई का है जैसा कि पहला है',
      createdAt: 'Thu, 02 May 2024 12:00 AM',
      location: 'बर्लिन'
    },
    {
      id: 10,
      title: 'एक और टाइटल यहां डाल सकते हैं क्योंकि यह समान लंबाई का है जैसा कि पहला है',
      createdAt: 'Thu, 02 May 2024 01:00 AM',
      location: 'रोम'
    },
    {
      id: 11,
      title: 'एक और टाइटल यहां डाल सकते हैं क्योंकि यह समान लंबाई का है जैसा कि पहला है',
      createdAt: 'Thu, 02 May 2024 02:00 AM',
      location: 'टोक्यो'
    },
    {
      id: 12,
      title: 'एक और टाइटल यहां डाल सकते हैं क्योंकि यह समान लंबाई का है जैसा कि पहला है',
      createdAt: 'Thu, 02 May 2024 03:00 AM',
      location: 'सिंगापुर'
    },
    {
      id: 13,
      title: 'एक और टाइटल यहां डाल सकते हैं क्योंकि यह समान लंबाई का है जैसा कि पहला है',
      createdAt: 'Thu, 02 May 2024 04:00 AM',
      location: 'होंगकॉंग'
    },
    // {
    //   id: 14,
    //   title: 'एक और टाइटल यहां डाल सकते हैं क्योंकि यह समान लंबाई का है जैसा कि पहला है',
    //   createdAt: 'Thu, 02 May 2024 05:00 AM',
    //   location: 'केपटाउन'
    // },
    // {
    //   id: 15,
    //   title: 'एक और टाइटल यहां डाल सकते हैं क्योंकि यह समान लंबाई का है जैसा कि पहला है',
    //   createdAt: 'Thu, 02 May 2024 06:00 AM',
    //   location: 'रियाध'
    // },
    // {
    //   id: 16,
    //   title: 'एक और टाइटल यहां डाल सकते हैं क्योंकि यह समान लंबाई का है जैसा कि पहला है',
    //   createdAt: 'Thu, 02 May 2024 07:00 AM',
    //   location: 'कैरियो'
    // },
    // {
    //   id: 17,
    //   title: 'एक और टाइटल यहां डाल सकते हैं क्योंकि यह समान लंबाई का है जैसा कि पहला है',
    //   createdAt: 'Thu, 02 May 2024 08:00 AM',
    //   location: 'आगरा'
    // },
    // {
    //   id: 18,
    //   title: 'एक और टाइटल यहां डाल सकते हैं क्योंकि यह समान लंबाई का है जैसा कि पहला है',
    //   createdAt: 'Thu, 02 May 2024 09:00 AM',
    //   location: 'कोलकाता'
    // },
    // {
    //   id: 19,
    //   title: 'एक और टाइटल यहां डाल सकते हैं क्योंकि यह समान लंबाई का है जैसा कि पहला है',
    //   createdAt: 'Thu, 02 May 2024 10:00 AM',
    //   location: 'दिल्ली'
    // },
    // {
    //   id: 20,
    //   title: 'एक और टाइटल यहां डाल सकते हैं क्योंकि यह समान लंबाई का है जैसा कि पहला है',
    //   createdAt: 'Thu, 02 May 2024 11:00 AM',
    //   location: 'मुंबई'
    // }
  ];

  const MoreGroup1 = ({data}) => {
    return (
      <div className="flex spacing mt-8 mb-0">
        <div className="grid grid-cols-1 lg:grid-cols-6 mx-auto justify-between gap-10 ">
          <div className="flex flex-col flex-wrap md:col-span-4">
              {/* Main Section  */}
            <div className="flex w-full flex-col flex-wrap ">
              <Heading title={"IPL 2024"} />
              <div className="h-[200px] md:h-[400px] w-full mt-2 relative">
                <img
                  src={Image}
                  alt="AirMax Pro"
                  className="z-0 h-full w-full  object-cover"
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-5"></div>
                <div className="absolute bottom-4 left-4 text-centre">
                  <h1 className="news-title-lg text-white lg:text-[27px]">
                    {data[0].title}
                  </h1>
                </div>
              </div>
              <div className="flex w-full flex-col flex-wrap gap-y-6 py-6">
                <MorePageCard data={data[1]}/>
                <MorePageCard data={data[1]}/>
                <MorePageCard data={data[1]}/>
                <MorePageCard data={data[1]}/>
                <MorePageCard data={data[1]}/>
              </div>
              {/* <div >
              {
                data && data.map((item, index) => (
                  <MorePageCard key={index} data={item} />

                ))
              }
            </div> */}
                
            </div>
          </div>

          {/* right side add container  */}
          {/* -------------------------- section 1 add ----------------------  */}
          <div className="flex flex-col md:gap-y-10 gap-y-2  md:col-span-2 md:mt-10">
            <div className="flex flex-wrap  gap-y-1 gap-x-4 md:flex md:w-full items-center justify-center lg:flex-col">
              <div className="w-[330px] h-[260px] overflow-hidden">
                <img
                  className="w-full h-auto object-contain"
                  src={adsimgright1}
                />
              </div>
              <div className="w-[330px] h-[260px] overflow-hidden">
                <img
                  className="w-full h-auto object-contain"
                  src={adsimgright2}
                />
              </div>
            </div>
            <div className="flex flex-col gap-y-3 py-3 md:*:px-5 shadow-light-shadow rounded-md ">
            <Heading title={"यह भी पढ़े"} />
            <div className="flex flex-col gap-y-4 gap-5">
              <SubNewsCard />
              <SubNewsCard />
              <SubNewsCard />
              <SubNewsCard />
              <SubNewsCard />
              <SubNewsCard />
              <SubNewsCard />
            </div>
          </div>
          </div>
        </div>
      </div>
    )
  }

  const MoreGroup2 = ({data}) => {
    return (
      <div className="flex spacing mt-0">
      <div className="grid grid-cols-1 lg:grid-cols-6 mx-auto justify-between md:gap-10 ">
        <div className="flex flex-col flex-wrap md:col-span-4">
          <div className="flex w-full flex-col flex-wrap ">

            {/* Sub News Section  */}
            <div className="flex w-full flex-col flex-wrap gap-y-6 max-md:pt-10">
              {
                data && data.map((item, index) => (
                  <MorePageCard key={index} data={item} />

                ))
              }
            </div>
          </div>
        </div>

        {/* right side add container  */}
        {/* ------------------------- section 2 add ------------------------  */}
        <div className="flex flex-col md:gap-y-10 gap-y-2  md:col-span-2 mt-10">
            <div className="flex flex-wrap  gap-y-1 gap-x-4 md:flex md:w-full items-center justify-center lg:flex-col">
              <div className="w-[330px] h-[260px] overflow-hidden">
                <img
                  className="w-full h-auto object-contain"
                  src={adsimgright1}
                />
              </div>
              <div className="w-[330px] h-[260px] overflow-hidden">
                <img
                  className="w-full h-auto object-contain"
                  src={adsimgright2}
                />
              </div>
            </div>
        </div>
      </div>
    </div>
      
    )
  }

  const MoreGroup3 = ({data}) => {
    return (
    <div className="flex spacing mt-0">
        <div className="grid grid-cols-1 lg:grid-cols-6 mx-auto justify-between md:gap-10 ">
          <div className="flex flex-col flex-wrap md:col-span-4">
            <div className="flex w-full flex-col flex-wrap ">

              {/* Sub News Section  */}
              <div className="flex w-full flex-col flex-wrap gap-y-6 max-md:pt-10">
              {
                data && data.map((item, index) => (
                  <MorePageCard key={index} data={item} />

                ))
              }
              </div>
            </div>
          </div>

          {/* right side add container  */}
          {/* ------------------------- section 2 add ------------------------  */}
          <div className="flex flex-col md:gap-y-10 gap-y-2  md:col-span-2 md:mt-10">
            <div className="flex flex-wrap  gap-y-1 gap-x-4 md:flex md:w-full items-center justify-center lg:flex-col">
              <div className="w-[330px] h-[260px] overflow-hidden">
                <img
                  className="w-full h-auto object-contain"
                  src={adsimgright1}
                />
              </div>
              <div className="w-[330px] h-[260px] overflow-hidden">
                <img
                  className="w-full h-auto object-contain"
                  src={adsimgright2}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
  
const iterations = Math.ceil(data.length / 4);
const groupedData = [];

for (let i = 0; i < iterations; i++) {
  groupedData.push(data.slice(i * 4, (i + 1) * 4));
}
console.log(groupedData)
return (
  <>
    <MoreGroup1 data={groupedData[0]} />
    <MoreGroup2 data={groupedData[1]} />
  </>
)
// groupedData.map((group, index) => {
//   if (index === 0) {
//     return <MoreGroup1 key={index} data={group} />;
//   } else if (index % 2 === 1) {
//     return <MoreGroup2 key={index} data={group} />;
//   } else {
//     return <MoreGroup3 key={index} data={group} />;
//   }
// });
};

export default MoreNews;

      // {/* ----------------------- section 1 -----------------------  */}
      // <div className="flex spacing mt-8 mb-0">
      //   <div className="grid grid-cols-1 lg:grid-cols-6 mx-auto justify-between gap-10 ">
      //     <div className="flex flex-col flex-wrap md:col-span-4">
      //         {/* Main Section  */}
      //       <div className="flex w-full flex-col flex-wrap ">
      //         <Heading title={"IPL 2024"} />
      //         <div className="h-[200px] md:h-[400px] w-full mt-2 relative">
      //           <img
      //             src={Image}
      //             alt="AirMax Pro"
      //             className="z-0 h-full w-full  object-cover"
      //           />
      //           <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-5"></div>
      //           <div className="absolute bottom-4 left-4 text-centre">
      //             <h1 className="news-title-lg text-white lg:text-[27px]">
      //               सलमान खान केस: CID करेगी आरोपी के सुसाइड की जांच, दरी से
      //               फंदा बनाकर लॉकअप के बाथरूम में लगाई थी फांसी
      //             </h1>
      //           </div>
      //         </div>
      //         <div className="flex w-full flex-col flex-wrap py-6">
      //           <MorePageCard />
      //         </div>
                
      //       </div>
      //     </div>

      //     {/* right side add container  */}
      //     {/* -------------------------- section 1 add ----------------------  */}
          // <div className="flex flex-col md:gap-y-10 gap-y-2  md:col-span-2 md:mt-10">
          //   <div className="flex flex-wrap  gap-y-1 gap-x-4 md:flex md:w-full items-center justify-center lg:flex-col">
          //     <div className="w-[330px] h-[260px] overflow-hidden">
          //       <img
          //         className="w-full h-auto object-contain"
          //         src={adsimgright1}
          //       />
          //     </div>
          //     <div className="w-[330px] h-[260px] overflow-hidden">
          //       <img
          //         className="w-full h-auto object-contain"
          //         src={adsimgright2}
          //       />
          //     </div>
          //   </div>
      //     </div>
      //   </div>
      // </div>

      // {/* ----------------------------- section 2 -----------------------  */}
      // <div className="flex spacing mt-0">
      //   <div className="grid grid-cols-1 lg:grid-cols-6 mx-auto justify-between md:gap-10 ">
      //     <div className="flex flex-col flex-wrap md:col-span-4">
      //       <div className="flex w-full flex-col flex-wrap ">

      //         {/* Sub News Section  */}
      //         <div className="flex w-full flex-col flex-wrap gap-y-6 max-md:pt-10">
      //           <MorePageCard />
      //           <MorePageCard />
      //           <MorePageCard />
      //           <MorePageCard />
      //         </div>
      //       </div>
      //     </div>

      //     {/* right side add container  */}
      //     {/* ------------------------- section 2 add ------------------------  */}
      //      <div className="flex flex-col md:gap-y-10 gap-y-2 md:col-span-2">
      //       <div className="flex flex-col gap-y-3 py-3 md:*:px-5 shadow-light-shadow rounded-md ">
      //         <Heading title={"यह भी पढ़े"} />
      //         <div className="flex flex-col gap-y-4 gap-5">
      //           <SubNewsCard />
      //           <SubNewsCard />
      //           <SubNewsCard />
      //           <SubNewsCard />
      //           <SubNewsCard />
      //           <SubNewsCard />
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>

      // {/* ----------------------------- section 3 -----------------------  */}
      // <div className="flex spacing mt-0">
      //   <div className="grid grid-cols-1 lg:grid-cols-6 mx-auto justify-between md:gap-10 ">
      //     <div className="flex flex-col flex-wrap md:col-span-4">
      //       <div className="flex w-full flex-col flex-wrap ">

      //         {/* Sub News Section  */}
      //         <div className="flex w-full flex-col flex-wrap gap-y-6 max-md:pt-10">
      //           <MorePageCard />
      //           <MorePageCard />
      //           <MorePageCard />
      //           <MorePageCard />
      //         </div>
      //       </div>
      //     </div>

      //     {/* right side add container  */}
      //     {/* ------------------------- section 2 add ------------------------  */}
      //      <div className="flex flex-col md:gap-y-10 gap-y-2 md:col-span-2">
      //       <div className="flex flex-col gap-y-3 py-3 md:*:px-5 shadow-light-shadow rounded-md ">
      //         <Heading title={"यह भी पढ़े"} />
      //         <div className="flex flex-col gap-y-4 gap-5">
      //           <SubNewsCard />
      //           <SubNewsCard />
      //           <SubNewsCard />
      //           <SubNewsCard />
      //           <SubNewsCard />
      //           <SubNewsCard />
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
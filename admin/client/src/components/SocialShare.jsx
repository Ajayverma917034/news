import React, { useEffect } from "react";
import PopUp from "./PopUp";
import NewsShare from "./NewsShare";

const SocialShare = ({ item }) => {
  const [isPopUpOpen, setIsPopUpOpen] = React.useState(false);

  return (
    <>
      <button
        className="bg-green-500 text-white px-3 py-1 rounded-lg text-base"
        onClick={() => setIsPopUpOpen(true)}
      >
        Share
      </button>
      {isPopUpOpen && (
        <PopUp
          isOpen={isPopUpOpen}
          heading="Share Link"
          classes="max-w-[450px] !max-h-[300px] !p-2"
          onClose={() => setIsPopUpOpen(false)}
        >
          <NewsShare item={item} setIsPopUpOpen={setIsPopUpOpen} />
        </PopUp>
      )}
    </>
  );
};

export default SocialShare;

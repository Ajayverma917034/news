import React from "react";
import logo from "../assets/janpad logo.png";
import google from "../assets/googleplay.png";
import YouTube from "../assets/YouTube.png";
import { ImFacebook2 } from "react-icons/im";
import { FaSquareXTwitter, FaSquareInstagram } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
// import FooterAds from "../../components/FooterAds";

const Footer = () => {
  return (
    <>
      {/* <FooterAds /> */}
      <div className="bg-black text-white opacity-90 pt-10">
        <div className="px-4 sm:px-12 xl:px-16">
          <div className="grid justify-center grid-rows-2 md:grid-rows-1 grid-cols-1  md:grid-cols-12 lg:grid-cols-11 gap-8 border-b-2 sm:pb-8 w-full">
            <div className="flex col-span-1 md:col-span-6 lg:col-span-5 justify-center gap-14 sm:gap-28 md:gap-14 lg:gap-20 xl:gap-28 w-full ">
              <div className="flex flex-col ">
                <Link
                  href={"/"}
                  className="text-xl lg:text-2xl xl:text-3xl font-semibold border-b-2 mb-4"
                >
                  होम
                </Link>
                <Link
                  href={"/"}
                  className="text-lg lg:text-xl xl:text-2xl font-normal pb-1"
                >
                  बड़ी ख़बरें
                </Link>
                <Link
                  href={"/videos"}
                  className="text-lg lg:text-xl xl:text-2xl font-normal pb-1"
                >
                  टॉप वीडियो
                </Link>
                <Link
                  href={"/country"}
                  className="text-lg lg:text-xl xl:text-2xl font-normal pb-1"
                >
                  देश-विदेश
                </Link>
                <Link
                  href={"/crime"}
                  className="text-lg lg:text-xl xl:text-2xl font-normal pb-1"
                >
                  क्राइम
                </Link>
                <Link
                  href={"/sprots"}
                  className="text-lg lg:text-xl xl:text-2xl font-normal pb-1"
                >
                  खेल कूद
                </Link>
                <Link
                  href={"/education"}
                  className="text-lg lg:text-xl xl:text-2xl font-normal pb-1"
                >
                  शिक्षा
                </Link>
                <Link
                  href={"/religion"}
                  className="text-lg lg:text-xl xl:text-2xl font-normal pb-1"
                >
                  धर्म
                </Link>
              </div>
              <div className="flex flex-col ">
                <h2 className="text-xl lg:text-2xl xl:text-3xl font-semibold border-b-2 mb-4">
                  राज्य
                </h2>
                <Link
                  href={"/state/uttar-pradesh"}
                  className="text-lg lg:text-xl xl:text-2xl font-normal pb-1"
                >
                  उत्तर प्रदेश
                </Link>
                <Link
                  href={"/state/uttarakhand"}
                  className="text-lg lg:text-xl xl:text-2xl font-normal pb-1"
                >
                  उत्तराखंड
                </Link>
                <Link
                  href={"/state/madhyapradesh"}
                  className="text-lg lg:text-xl xl:text-2xl font-normal pb-1"
                >
                  मध्यप्रदेश
                </Link>
                <Link
                  href={"/state/chhattisgarh"}
                  className="text-lg lg:text-xl xl:text-2xl font-normal pb-1"
                >
                  छत्तीसगढ़
                </Link>
                <Link
                  href={"/state/bihar"}
                  className="text-lg lg:text-xl xl:text-2xl font-normal pb-1"
                >
                  बिहार
                </Link>
                <Link
                  href={"/state/jharkhand"}
                  className="text-lg lg:text-xl xl:text-2xl font-normal pb-1"
                >
                  झारखंड
                </Link>
              </div>
              <div className="flex flex-col ">
                <h2 className="text-xl lg:text-2xl xl:text-3xl font-semibold border-b-2 mb-4">
                  अपना जिला
                </h2>
                <Link
                  href={"/state/uttar-pradesh/sonbhadra"}
                  className="text-lg lg:text-xl xl:text-2xl font-normal pb-1"
                >
                  सोनभद्र
                </Link>
                <Link
                  href={"/state/uttar-pradesh/chandauli"}
                  className="text-lg lg:text-xl xl:text-2xl font-normal pb-1"
                >
                  चंदौली
                </Link>
                <Link
                  href={"/state/uttar-pradesh/mirzapur"}
                  className="text-lg lg:text-xl xl:text-2xl font-normal pb-1"
                >
                  मिर्जापुर
                </Link>
                <Link
                  href={"/state/uttar-pradesh/varanasi"}
                  className="text-lg lg:text-xl xl:text-2xl font-normal pb-1"
                >
                  वाराणसी
                </Link>
                <Link
                  href={"/state/uttar-pradesh/gajipur"}
                  className="text-lg lg:text-xl xl:text-2xl font-normal pb-1"
                >
                  गाजीपुर
                </Link>
                <Link
                  href={"/state/uttar-pradesh/shahjhapur"}
                  className="text-lg lg:text-xl xl:text-2xl font-normal pb-1"
                >
                  शाहजहांपुर
                </Link>
              </div>
            </div>
            <div className="md:col-span-6 flex flex-col w-full lg:flex-row gap-8 lg:gap-16 ">
              <div className="flex justify-center gap-14 sm:gap-28 md:gap-10 lg:gap-16">
                <div className="flex flex-col">
                  <h2 className="text-xl lg:text-2xl xl:text-3xl font-semibold border-b-2 mb-4 ">
                    Useful Links
                  </h2>

                  <Link
                    href={"/about"}
                    className="text-lg lg:text-xl xl:text-2xl font-normal pb-1"
                  >
                    About Us
                  </Link>

                  <Link
                    href={"/contact"}
                    className="text-lg lg:text-xl xl:text-2xl font-normal pb-1"
                  >
                    Contact Us
                  </Link>

                  <Link
                    href={"/advertisement-us"}
                    className="text-lg lg:text-xl xl:text-2xl font-normal pb-1"
                  >
                    Advertisement with Us
                  </Link>
                </div>
                <div className="flex flex-col">
                  <h2 className="text-xl lg:text-2xl xl:text-3xl font-semibold border-b-2 mb-4">
                    Policies
                  </h2>
                  <Link
                    href={"/privacy-policy"}
                    className="text-lg lg:text-xl xl:text-2xl font-normal pb-1"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href={"/terms-and-conditions"}
                    className="text-lg lg:text-xl xl:text-2xl font-normal pb-1"
                  >
                    Terms & Conditions
                  </Link>
                  <Link
                    href={"/disclaimer-policy"}
                    className="text-lg lg:text-xl xl:text-2xl font-normal pb-1"
                  >
                    Disclaimer Policy
                  </Link>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center">
                <div className="text-3xl font-semibold lg:w-52 text-center">
                  Advertisement के लिए संपर्क करे:
                </div>
                <div className="text-4xl font-bold">+91 9415873885 </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center md:justify-between mb-8 sm:px-4 lg:px-8">
            <div className="pt-4 pb-2 sm:py-8 max-sm:mt-5">
              <div className="w-68 pb-8 mx-8">
                <Image width={500} height={200} src={logo} alt="Logo" />
              </div>
              <p>
                <span className="text-2xl sm:text-4xl sm:p-3 font-medium">
                  Office Address :
                </span>
                <span className="text-[15px] sm:text-2xl sm:p-3 font-normal ml-1">
                  सोनभद्र, उत्तरप्रदेश (231216)
                </span>
              </p>
              <p>
                <span className="text-2xl sm:text-4xl sm:p-3 font-medium">
                  Contact Us :
                </span>
                <a
                  href="tel:+919415873885"
                  className="text-[15px] sm:text-2xl sm:p-3 font-normal text-white ml-1"
                >
                  +91 9415873885
                </a>
              </p>
              <p>
                <span className="text-2xl sm:text-4xl sm:p-3 font-medium text-white">
                  Email:
                </span>
                <a
                  href="mailto:info.janpadnewslive@gmail.com"
                  className="text-[15px] sm:text-2xl sm:p-3 font-normal ml-1 text-white"
                >
                  info.janpadnewslive@gmail.com
                </a>
              </p>
            </div>
            <div className=" flex flex-col gap-4 md:gap-8">
              <div className="flex max-sm:flex-col max-sm:items-center max-sm:justify-center gap-6 md:gap-8 pt-8 pb-4 md:gap-y-10">
                <div className="flex items-center flex-col justify-center">
                  <h2 className="text-[25px] sm:text-5xl font-semibold">
                    Download App
                  </h2>
                  <a
                    target="_blank"
                    href="https://play.google.com/store/apps/details?id=com.janpadnews.live&hl=en"
                  >
                    <div className="w-36 mt-1 md:mt-3">
                      <Image
                        width={150}
                        height={50}
                        src={google}
                        alt="Google play store"
                      />
                    </div>
                  </a>
                </div>
                <div className="flex items-center flex-col justify-center">
                  <h2 className="text-[25px] sm:text-5xl font-semibold max-sm:mt-2">
                    Subscribe Now
                  </h2>
                  <a
                    target="_blank"
                    href="https://www.youtube.com/@JanpadMirrorNewsChannel"
                  >
                    <div className="flex justify-center items-center gap-2">
                      <div className="w-16">
                        <Image
                          width={80}
                          height={80}
                          src={YouTube}
                          alt="Youtube"
                        />
                      </div>
                      <p className="text-3xl mt-2 font-semibold">
                        Janpad Mirror
                      </p>
                    </div>
                  </a>
                </div>
              </div>
              <div className="flex  gap-8 items-center">
                <p className="text-3xl font-medium mt-3">Follow Us</p>
                <div className="flex gap-4">
                  <a
                    target="_blank"
                    href="https://www.facebook.com/profile.php?id=100064487422657"
                  >
                    <ImFacebook2 className="size-8" />
                  </a>
                  <a
                    target="_blank"
                    href="https://x.com/janpadnewslive?t=xf1_SFr0zxbjsS7XEb8VqQ&s=08"
                  >
                    <FaSquareXTwitter className="size-9" />
                  </a>
                  <a href="">
                    <FaSquareInstagram className="size-9" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a
          href="https://spriteera.com/"
          target="_blank"
          className="flex items-center justify-center bg-gray p-2 text-2xl text-center w-full max-sm:flex-col"
        >
          Developed By
          <span className="font-semibold">
            &nbsp; SpriteEra IT Solutions Pvt. Ltd.
          </span>
        </a>
        <div className="p-1 text-xl text-center">
          © Copyright Janpad News Live 2024. All rights reserved.
        </div>
      </div>
    </>
  );
};

export default Footer;

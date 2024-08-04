import React from "react";
import logo from "../../assets/janpad logo.png";
import google from "../../assets/googleplay.png";
import YouTube from "../../assets/YouTube.png";
import { ImFacebook2 } from "react-icons/im";
import { FaSquareXTwitter, FaSquareInstagram } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="bg-black text-white opacity-90 pt-10">
      <div className="px-6 sm:px-12 xl:px-16">
        <div className="grid justify-center grid-rows-2 md:grid-rows-1 grid-cols-1  md:grid-cols-12 lg:grid-cols-11 gap-8 border-b-2 pb-8 w-full">
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
                href={"/sports"}
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
          <div className="md:col-span-6 flex flex-col w-full  lg:flex-row gap-8 lg:gap-16 ">
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
                  href={"/terms-and-condition"}
                  className="text-lg lg:text-xl xl:text-2xl font-normal pb-1"
                >
                  Terms & Condition
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
          <div className="py-8">
            <div className="w-68 pb-8 mx-8">
              <Image
                src={logo}
                alt="Logo"
                width={1200}
                height={800}
                sizes={{
                  maxWidth: "100%",
                  height: "auto",
                }}
                priority={false}
              />
            </div>
            <p>
              <span className="text-3xl sm:p-3 font-medium">
                Office Address :
              </span>
              <span className="text-xl sm:p-3 font-normal">
                सोनभद्र, उत्तरप्रदेश (231216)
              </span>
            </p>
            <p>
              <span className="text-3xl sm:p-3 font-medium">Contact Us :</span>
              <span className="text-xl sm:p-3 font-normal">+91 9415873885</span>
            </p>
            <p>
              <span className="text-3xl sm:p-3 font-medium">Email:</span>
              <span className="text-xl p-3 font-normal">
                info.janpadnewslive@gmail.com
              </span>
            </p>
          </div>
          <div className=" flex flex-col gap-8">
            <div className="flex  gap-8 pt-8 pb-4">
              <div>
                <h2 className="text-3xl font-semibold">Download App</h2>
                <div className="w-36 mt-3">
                  <Image
                    src={google}
                    alt="Google play"
                    width={1200}
                    height={800}
                    sizes={{
                      maxWidth: "100%",
                      height: "auto",
                    }}
                    priority={false}
                  />
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-semibold">Subscribe Now</h2>
                <a
                  target="_blank"
                  href="https://youtube.com/@themirror1122?si=uNLCLA9R9YBp_aWl"
                >
                  <div className="flex justify-center items-center gap-2">
                    <div className="w-16">
                      <Image
                        src={YouTube}
                        alt="Youtube Logo"
                        width={1200}
                        height={800}
                        sizes={{
                          maxWidth: "100%",
                          height: "auto",
                        }}
                        priority={false}
                      />
                    </div>
                    <p className="text-xl font-medium">The Mirror</p>
                  </div>
                </a>
              </div>
            </div>
            <div className="flex gap-8 items-center">
              <p className="text-2xl font-medium ">Follow Us</p>
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
        className="flex items-center justify-center bg-gray p-2 text-xl text-center w-full"
      >
        Developed By{" "}
        <span className="font-semibold">SpriteEra IT Solutions Pvt. Ltd.</span>
      </a>
      <div className="p-1 text-xl text-center">
        © Copyright Janpad News Live 2024. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;

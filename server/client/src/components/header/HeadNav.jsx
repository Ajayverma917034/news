import React from "react";
import "./HeadNav.css";
// import logoimg from '../assets/logoimg.png'
import logoimg from "../../assets/logoimg.png";
import { Link } from "react-router-dom";
import { CiLocationOn, CiSearch } from "react-icons/ci";

const HeadNav = () => {
  return (
    <div className="relative w-full z-[100001] bg-white hidden sm:block">
      <div className="flex items-center justify-between px-[1rem] sm:px-[2rem] md:px-[3rem] lg:px-[5rem]">
        <img
          src={logoimg}
          alt="logoimg"
          className="w-[50%]  sm:w-[35%] md:w-[30%] lg:w-[28%]"
        />
        <div className=" flex justify-between items-center gap-8 ">
          <div className="flex items-center justify-center gap-1 cursor-pointer">
            <CiLocationOn className="mb-1 text-red text-2xl" />
            <h3>अपना शहर</h3>
          </div>
          <div className=" justify-between items-center border border-gray rounded-[8px] px-4 hidden sm:flex ">
            <input
              type="text"
              placeholder="यहाँ लिखे"
              className=" border-none text-md py-0.5 outline-none placeholder:text-sm"
            />
            <CiSearch className=" cursor-pointer" />
          </div>
        </div>
      </div>
      <header className="header-main sticky top-[100px]">
        {}
        <nav className="navbar">
          <ul>
            <li>
              <Link href="/#">होम</Link>
            </li>
            <li>
              <Link href="/#">राज्य +</Link>
              <ul className="dropdown-items">
                <li>
                  <Link href="#" className="">
                    blogs
                  </Link>
                </li>
                <li>
                  <Link href="#">services+</Link>
                  <ul>
                    <li>
                      <Link href="#">html </Link>
                    </li>
                    <li>
                      <Link href="#">css</Link>
                    </li>
                    <li>
                      <Link href="#">javascript </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link href="#">kalua +</Link>
                  <ul>
                    <li>
                      <Link href="#">sonbhadra</Link>
                    </li>
                    <li>
                      <Link href="#">varanasi</Link>
                    </li>
                    <li>
                      <Link href="#">jaunpur</Link>
                    </li>
                    <li>
                      <Link href="#">prayagraj</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link href="#">jackeline</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/#">देश</Link>
            </li>
            <li>
              <Link href="/#">विदेश</Link>
            </li>
            <li>
              <Link href="/#">क्राइम</Link>
            </li>
            <li>
              <Link href="/#">IPL 2024 </Link>
            </li>
            <li>
              <Link href="/#">खेल कूद</Link>
            </li>
            <li>
              <Link href="/#">धर्म</Link>
            </li>
            <li>
              <Link href="/#">करियर</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default HeadNav;
